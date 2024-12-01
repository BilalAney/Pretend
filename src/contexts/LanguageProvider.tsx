/** @format */

import { createContext, useContext, useState, type ReactNode } from "react";

type languages = "en" | "ar";

interface LanguageContext<Lang> {
  language: Lang;
  changeLanguage: (lang: Lang) => void;
}

const LanguageContext = createContext<LanguageContext<languages> | null>(null);

export default function LanguageProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [language, setLanguage] = useState<"en" | "ar">("en");

  function changeLanguage(lang: languages) {
    setLanguage(lang);
  }

  const value: LanguageContext<languages> = {
    language,
    changeLanguage,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const data = useContext(LanguageContext);
  if (!data)
    throw new Error(
      "The language context is being consumed outside the context provider"
    );
  return data;
}
