import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Hobbies() {
  const { language } = useLanguage()
  const t = translations[language]

  const hobbies = [
    t.hobbieDance,
    t.hobbieHiking,
    t.hobbieFunctional,
    t.hobbieDrawPaint,
    t.hobbieSport,
    t.hobbieRead,
  ]

  return (
    <section className="hobbies">
      <h2>{t.hobbiesTitle}</h2>
      <div className="hobbies__gallery">
        {hobbies.map((hobbie, index) => (
          <div key={index} className="card">
            {hobbie}
          </div>
        ))}
      </div>
    </section>
  )
}