"use client";
import { useState, useEffect } from "react";

export default function useLocalStorageState(key, defaultValue) {
  const [state, setState] = useState(defaultValue);
  useEffect(() => {
    try {
      const raw = localStorage.getItem(key);
      if (raw) {
        setState(JSON.parse(raw));
      }
    } catch {
      // :)))
    }
  }, [key]);

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(state));
    } catch {
      // :)))
    }
  }, [key, state]);

  useEffect(() => {
    function onStorage(e) {
      if (e.key !== key) return;
      try {
        setState(e.newValue ? JSON.parse(e.newValue) : defaultValue);
      } catch {}
    }
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, [key, defaultValue]);

  return [state, setState];
}
