import { useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/context/LanguageContext"
import { translations } from "@/lib/translations"

export default function Semaforo() {
  const [color, setColor] = useState<"red" | "yellow" | "green">("red")
  const { language } = useLanguage()
  const t = translations[language] ?? translations.es

  const cambiar = () => {
    if (color === "red") setColor("yellow")
    else if (color === "yellow") setColor("green")
    else setColor("red")
  }

  return (
    <section className="traffic-section">
      <h2>{t.trafficTitle}</h2>

      <div className="traffic-wrapper">
        <div className="traffic-light">
          <div className={`light ${color === "red" ? "active-red" : ""}`} />
          <div className={`light ${color === "yellow" ? "active-yellow" : ""}`} />
          <div className={`light ${color === "green" ? "active-green" : ""}`} />
        </div>

        <div className="traffic-controls">
          <p>{t.trafficText}</p>
          <Button onClick={cambiar}>{t.trafficButton}</Button>
        </div>
      </div>
    </section>
  )
}