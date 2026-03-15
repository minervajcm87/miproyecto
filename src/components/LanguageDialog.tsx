import { useEffect, useState } from "react"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

const spokenLanguages = [
  { label: "Español", value: "es" },
  { label: "English", value: "en" },
] as const

type LanguageDialogProps = {
  open: boolean
  onClose: () => void
}

export default function LanguageDialog({ open, onClose }: LanguageDialogProps) {
  const { language, setLanguage } = useLanguage()
  const t = translations[language]
  const [selectedLanguage, setSelectedLanguage] = useState(language)

  useEffect(() => {
    if (open) {
      setSelectedLanguage(language)
    }
  }, [open, language])

  if (!open) return null

  const handleSave = () => {
    setLanguage(selectedLanguage)

    onClose()
  }

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  return (
    <div className="language-modal-overlay" onClick={handleOverlayClick}>
      <div className="language-modal">
        <div className="language-modal-header">
          <h3>{t.languageDialogTitle}</h3>
          <button
            className="language-close-btn"
            onClick={onClose}
            aria-label="Cerrar"
            title="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="language-modal-body">
          <label htmlFor="language-select" className="language-label">
            {t.languageLabel}
          </label>

          <select
            id="language-select"
            className="language-select"
            value={selectedLanguage}
            onChange={(e) =>
              setSelectedLanguage(e.target.value as keyof typeof translations)
            }
          >
            {spokenLanguages.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </div>

        <div className="language-modal-footer">
          <button
            type="button"
            className="language-btn secondary"
            onClick={() => setSelectedLanguage(language)}
          >
            {t.reset}
          </button>

          <button
            type="button"
            className="language-btn primary"
            onClick={handleSave}
          >
            {t.save}
          </button>
        </div>
      </div>
    </div>
  )
}