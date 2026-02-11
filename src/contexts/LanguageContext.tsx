import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "pt";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Record<string, Record<Language, string>> = {
  // Navbar
  "nav.about": { en: "About", pt: "Sobre" },
  "nav.projects": { en: "Projects", pt: "Projetos" },
  "nav.articles": { en: "Articles", pt: "Artigos" },
  "nav.contacts": { en: "Contacts", pt: "Contatos" },

  // Hero
  "hero.phrase1": { en: "RPA Developer", pt: "Desenvolvedor RPA" },
  "hero.phrase2": { en: "Automation Analyst", pt: "Analista de Automação" },
  "hero.phrase3": { en: "Process Engineer", pt: "Engenheiro de Processos" },
  "hero.description": {
    en: "My goal is to ",
    pt: "Meu objetivo é ",
  },
  "hero.desc.highlight1": {
    en: "automate processes",
    pt: "automatizar processos",
  },
  "hero.desc.middle": {
    en: ", write ",
    pt: ", escrever ",
  },
  "hero.desc.highlight2": {
    en: "clean and efficient code",
    pt: "código limpo e eficiente",
  },
  "hero.desc.end": {
    en: " to make business operations seamless.",
    pt: " para tornar operações de negócio mais fluidas.",
  },
  "hero.projects": { en: "Projects", pt: "Projetos" },

  // About
  "about.breadcrumb": { en: "... /About me ...", pt: "... /Sobre mim ..." },
  "about.title1": { en: "Hello! I'm an ", pt: "Olá! Eu sou um " },
  "about.title.role": { en: "RPA Developer", pt: "Desenvolvedor RPA" },
  "about.title2": {
    en: "More than 9 years experience.",
    pt: "Mais de 9 anos de experiência.",
  },
  "about.skills.intro1": {
    en: "Some of my ",
    pt: "Algumas das minhas ",
  },
  "about.skills.highlight1": {
    en: "favorite technologies,",
    pt: "tecnologias favoritas,",
  },
  "about.skills.highlight2": {
    en: "topics, or tools",
    pt: "tópicos ou ferramentas",
  },
  "about.skills.intro2": {
    en: " that I worked with",
    pt: " com as quais trabalhei",
  },
  "about.photo": { en: "Your Photo Here", pt: "Sua Foto Aqui" },

  // Work
  "work.title": { en: "Work", pt: "Experiência" },
  "work.total.label": { en: "Work experience", pt: "Experiência profissional" },
  "work.total.value": { en: "9 years 11 months", pt: "9 anos e 11 meses" },
  "work.modal.period": { en: "Period", pt: "Período" },
  "work.modal.description": { en: "Description", pt: "Descrição" },
  "work.modal.results": { en: "Key Results", pt: "Resultados Principais" },
  "work.modal.stack": { en: "Stack", pt: "Tecnologias" },

  // Projects
  "projects.breadcrumb": { en: "... /Projects ...", pt: "... /Projetos ..." },

  // Articles
  "articles.title": { en: "Articles", pt: "Artigos" },
  "articles.readmore": { en: "Read more", pt: "Leia mais" },

  // Footer
  "footer.title1": { en: "Let's", pt: "Vamos" },
  "footer.title2": { en: "Automate", pt: "Automatizar" },
  "footer.subtitle": { en: "Full-stack\nRPA developer", pt: "Desenvolvedor RPA\nFull-stack" },
  "footer.breadcrumb": { en: "... /Contacts ...", pt: "... /Contatos ..." },
  "footer.nav.main": { en: "Main", pt: "Início" },
  "footer.site.by": { en: "Handcrafted by ", pt: "Feito à mão por " },
  "footer.site.design": { en: "Designed with ", pt: "Projetado com " },
  "footer.site.passion": { en: "passion", pt: "paixão" },
  "footer.site.powered": { en: "Powered by ", pt: "Desenvolvido com " },
  "footer.copyright": {
    en: "© 2025 Diego Gonçalves. All rights reserved.",
    pt: "© 2025 Diego Gonçalves. Todos os direitos reservados.",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const saved = localStorage.getItem("language");
    return (saved as Language) || "en";
  });

  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used within LanguageProvider");
  return context;
};
