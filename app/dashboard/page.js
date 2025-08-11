"use client";
import { useContext, useState } from "react";
import { TranslationContext } from "../../context/TranslationContext";
import "./dashboard.css";
import Link from "next/link";

// Swap helper
function swap(list, indexA, indexB) {
  const result = Array.from(list);
  const temp = result[indexA];
  result[indexA] = result[indexB];
  result[indexB] = temp;
  return result;
}

export default function DashboardPage() {
  const { data, addKeyword, editTranslation, reorderKeywords } =
    useContext(TranslationContext);

  const [newLang, setNewLang] = useState(data.languages[0]);
  const [isAdding, setIsAdding] = useState(false);
  const [tempKey, setTempKey] = useState("");
  const [tempTranslation, setTempTranslation] = useState("");
  const [draggedIndex, setDraggedIndex] = useState(null);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleSave = () => {
    if (!tempKey.trim()) return;
    addKeyword({
      keyName: tempKey.trim(),
      lang: newLang,
      translation: tempTranslation.trim(),
    });
    setTempKey("");
    setTempTranslation("");
    setIsAdding(false);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard-top-bar">
        <Link href="/" className="back-home-btn">
          ⬅ Home
        </Link>
      </div>
      {/* Header */}
      <div className="dashboard-header">
        <h1>Translation Management</h1>
        <select
          value={newLang}
          onChange={(e) => setNewLang(e.target.value)}
          className="language-selector"
        >
          {data.languages.map((lang) => (
            <option key={lang} value={lang}>
              {lang}
            </option>
          ))}
        </select>
      </div>

      {/* Keyword List */}
      <div className="keyword-list scrollable">
        {data.keywords.map((k, index) => (
          <div
            key={k.id}
            className={`keyword-row 
              ${draggedIndex === index ? "dragging" : ""} 
              ${
                hoveredIndex === index && draggedIndex !== index
                  ? "drag-hover"
                  : ""
              }`}
            draggable
            onDragStart={(e) => {
              e.dataTransfer.setData("text/plain", index);
              setDraggedIndex(index);
            }}
            onDragOver={(e) => {
              e.preventDefault();
              if (hoveredIndex !== index && draggedIndex !== null) {
                reorderKeywords(swap(data.keywords, draggedIndex, index));
                setDraggedIndex(index);
              }
              setHoveredIndex(index);
            }}
            onDrop={() => {
              setDraggedIndex(null);
              setHoveredIndex(null);
            }}
            onDragLeave={() => setHoveredIndex(null)}
            onDragEnd={() => {
              setDraggedIndex(null);
              setHoveredIndex(null);
            }}
          >
            <div className="keyword-text">{k.key}</div>
            <input
              value={k.translations[newLang] || ""}
              onChange={(e) =>
                editTranslation({
                  id: k.id,
                  lang: newLang,
                  text: e.target.value,
                })
              }
              className={`translation-input-saved ${
                !k.translations[newLang] ? "missing" : ""
              }`}
            />
          </div>
        ))}
      </div>

      {/* New Keyword Row */}
      {isAdding && (
        <div className="keyword-row new-keyword">
          <input
            placeholder="Keyword"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
            className="keyword-text-input"
            required
          />
          <input
            placeholder={`Translation (${newLang})`}
            value={tempTranslation}
            onChange={(e) => setTempTranslation(e.target.value)}
            className="translation-input"
          />
          <button className="save-btn" onClick={handleSave}>
            Save
          </button>
          <button className="cancel-btn" onClick={() => setIsAdding(false)}>
            Cancel
          </button>
        </div>
      )}

      {/* Add Button */}
      {!isAdding && (
        <button className="add-keyword-btn" onClick={() => setIsAdding(true)}>
          + Add Keyword
        </button>
      )}
    </div>
  );
}
