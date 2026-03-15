import { useLanguage } from "@/context/LanguageContext";
import { translations } from "@/lib/translations";
import { useEffect, useState } from "react";

type Repo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  updated_at: string;
};

export default function Repositorios() {
  const { language } = useLanguage();
  const t = translations[language];

  const [repos, setRepos] = useState<Repo[]>([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargarRepos = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch("https://api.github.com/users/minervajcm87/repos");

        if (!response.ok) {
          throw new Error(t.reposError);
        }

        const data: Repo[] = await response.json();

        data.sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );

        setRepos(data);
      } catch (e) {
        setError(e instanceof Error ? e.message : t.reposUnknownError);
      } finally {
        setLoading(false);
      }
    };

    cargarRepos();
  }, [t.reposError, t.reposUnknownError]);

  return (
    <section className="repositorios">
      <h2>{t.reposTitle}</h2>

      {loading && <p>{t.reposLoading}</p>}
      {error && <p>{error}</p>}

      {!loading && !error && (
        <ul id="repositorios_list">
          {repos.map((repo) => (
            <li key={repo.id} className="links">
              <h4>{repo.name}</h4>
              <p>{repo.description || t.repoNoDescription}</p>
              <a href={repo.html_url} target="_blank" rel="noreferrer">
                {t.repoViewGithub}
              </a>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}