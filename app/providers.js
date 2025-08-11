"use client";
import { TranslationProvider } from "../context/TranslationContext";

export default function Providers({ children }) {
  return <TranslationProvider>{children}</TranslationProvider>;
}
