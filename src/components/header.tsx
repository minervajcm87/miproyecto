import { NavLink } from "react-router-dom"
import { useEffect, useState } from "react"
import Reloj from "./reloj"
import LanguageDialog from "./LanguageDialog"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Header() {
  const [darkMode, setDarkMode] = useState(false)
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false)

  const { language } = useLanguage()
  const t = translations[language] ?? translations.es

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme === "dark") {
      document.body.classList.add("dark-mode")
      setDarkMode(true)
    }
  }, [])

  const toggleTheme = () => {
    const newMode = !darkMode
    setDarkMode(newMode)

    if (newMode) {
      document.body.classList.add("dark-mode")
      localStorage.setItem("theme", "dark")
    } else {
      document.body.classList.remove("dark-mode")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <header className="main-header">
      <div className="header-left">
        <h1 className="main-header__title">MINERVA CEBALLOS</h1>
        <Reloj />
      </div>

      <div className="header-right">
        <nav className="main-nav">
          <NavLink to="/">{t.navInicio}</NavLink>
          <NavLink to="/proyectos">{t.navProyectos}</NavLink>
          <NavLink to="/contacto">{t.navContacto}</NavLink>
        </nav>

        <div className="header-actions">
          <button
            id="theme-switcher"
            className="theme-switcher"
            onClick={toggleTheme}
          >
            {darkMode ? "🌙" : "☀️"}
          </button>

          <button
            type="button"
            className="language-switcher"
            onClick={() => setLanguageDialogOpen(true)}
          >
            {t.btnIdiomas}
          </button>

          <LanguageDialog
            open={languageDialogOpen}
            onClose={() => setLanguageDialogOpen(false)}
          />
        </div>
      </div>
    </header>
  )
}