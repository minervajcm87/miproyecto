import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function AboutMe() {
  const { language } = useLanguage()
  const t = translations[language]

  return (
    <section className="about-me">
      <div className="about-me__text">
        <h2>{t.aboutTitle}</h2>
<p>{t.aboutText1}</p>
<p>{t.aboutText2}</p>
<p>{t.aboutText3}</p>
      </div>

      <div className="about-me__image">
        <img
          src="https://picsum.photos/100/100"
          alt="Foto de perfil"
        />
      </div>
    </section>
  );
}