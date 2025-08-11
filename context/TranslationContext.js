"use client";
import React, { createContext, useMemo, useEffect, useState } from "react";
import useLocalStorageState from "../hooks/useLocalStorageState";

const STORAGE_KEY = "word-translations:v1";
export const TranslationContext = createContext(null);

const defaultData = {
  version: 1,
  languages: ["en", "es", "fr"],
  keywords: [
    {
      id: "k_1",
      key: "greeting",
      translations: { en: "Hello", es: "Hola", fr: "سلام" },
    },
    {
      id: "k_2",
      key: "ممنون",
      translations: { en: "Thanks", es: "Gracias", fr: "ممنون" },
    },
  ],
};

export function TranslationProvider({ children }) {
  const [data, setData] = useLocalStorageState(STORAGE_KEY, defaultData);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    setIsReady(true);
  }, []);

  const addKeyword = ({ keyName, lang, translation }) => {
    const id =
      typeof crypto !== "undefined" && crypto.randomUUID
        ? crypto.randomUUID()
        : `k_${Date.now()}`;

    const translations = Object.fromEntries(data.languages.map((l) => [l, ""]));
    translations[lang] = translation || "";

    setData((prev) => ({
      ...prev,
      keywords: [...prev.keywords, { id, key: keyName, translations }],
    }));
  };

  const editTranslation = ({ id, lang, text }) => {
    setData((prev) => ({
      ...prev,
      keywords: prev.keywords.map((k) =>
        k.id === id
          ? { ...k, translations: { ...k.translations, [lang]: text } }
          : k
      ),
    }));
  };

  const reorderKeywords = (newKeywords) => {
    setData((prev) => ({ ...prev, keywords: newKeywords }));
  };

  const value = useMemo(
    () => ({
      data,
      addKeyword,
      editTranslation,
      reorderKeywords,
      setData,
    }),
    [data]
  );

  // Prevent rendering until localStorage value is ready
  if (!isReady) return null;

  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}
