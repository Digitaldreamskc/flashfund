import { useState, useEffect } from 'react'

type Language = 'en' | 'es' | 'fr'

const languages = {
  en: 'English',
  es: 'Español',
  fr: 'Français'
}

export default function LanguageSelector() {
  const [language, setLanguage] = useState<Language>('en')
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') as Language
    if (savedLanguage && languages[savedLanguage]) {
      setLanguage(savedLanguage)
    }
  }, [])

  const handleLanguageChange = (newLanguage: Language) => {
    setLanguage(newLanguage)
    localStorage.setItem('language', newLanguage)
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-solana-card-bg border border-solana-accent/20 text-solana-text-light hover:border-solana-accent/40 transition-colors"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-sm">{languages[language]}</span>
      </button>
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-solana-card-bg border border-solana-accent/20 shadow-lg z-10">
          {Object.entries(languages).map(([code, name]) => (
            <button
              key={code}
              onClick={() => handleLanguageChange(code as Language)}
              className={`w-full text-left px-4 py-2 text-sm ${
                code === language
                  ? 'bg-solana-primary/10 text-solana-primary'
                  : 'text-solana-text-light hover:bg-solana-accent/10'
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      )}
    </div>
  )
} 