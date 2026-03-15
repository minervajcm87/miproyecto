import { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const { language } = useLanguage();
  const t = translations[language];

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!email.trim()) return;

    alert(`¡Gracias por suscribirte, ${email}!`);
    setEmail("");
  };

  return (
    <section className="contact-section">
      <form id="contact-form" onSubmit={handleSubmit}>
        <h3>{t.contactTitle}</h3>
        <input
          type="email"
          id="email-input"
          placeholder={t.contactPlaceholder}
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button type="submit">{t.contactButton}</button>
      </form>
    </section>
  );
}