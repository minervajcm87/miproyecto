import Semaforo from "../components/semaforo"
import Usuarios from "../components/usuarios"
import Repositorios from "../components/repositorios"
import { useLanguage } from "../context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Proyectos() {
  const { language } = useLanguage()
  const t = translations[language] 
  return (
    <section className="projects-page">
      <h2>{t.projectsTitle}</h2>
      <p>{t.projectsDescription}</p>

      <Semaforo />
      <Usuarios />
      <Repositorios />
    </section>
  )
}