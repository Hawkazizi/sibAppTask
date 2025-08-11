"use client";
import { useContext, useState } from "react";
import { TranslationContext } from "../../context/TranslationContext";
import "./public-view.css";
import Link from "next/link";
export default function PublicViewPage() {
  const { data } = useContext(TranslationContext);
  const [lang, setLang] = useState(data.languages[0]);

  return (
    <div className="public-view-container">
      {" "}
      <div className="dashboard-top-bar">
        <Link href="/" className="back-home-btn">
          ⬅ Home
        </Link>
      </div>
      <div className="header">
        <h1>Word Translations</h1>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="language-dropdown"
        >
          {data.languages.map((l) => (
            <option key={l} value={l}>
              {l}
            </option>
          ))}
        </select>
      </div>
      <div className="cards-container">
        {data.keywords.map((k) => (
          <div key={k.id} className="translation-card">
            <div className="keyword">{k.key}</div>
            <div className="translation">
              {k.translations[lang] || (
                <span className="no-translation">No translation yet</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
