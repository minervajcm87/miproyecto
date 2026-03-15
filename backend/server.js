const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API activa");
});

app.get("/api/repos", async (req, res) => {
  try {
    const username = process.env.GITHUB_USERNAME;

    if (!username) {
      return res.status(500).json({
        error: "Falta definir GITHUB_USERNAME en el archivo .env",
      });
    }

    const response = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`
    );

    if (!response.ok) {
      throw new Error(`GitHub respondió con estado ${response.status}`);
    }

    const data = await response.json();

    const repos = data
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description,
        html_url: repo.html_url,
        homepage: repo.homepage,
        language: repo.language,
        updated_at: repo.updated_at,
        stargazers_count: repo.stargazers_count,
      }));

    res.status(200).json(repos);
  } catch (error) {
    res.status(500).json({
      error: "No se pudieron obtener los repositorios",
      details: error.message,
    });
  }
});

const PORT = process.env.PORT || 4321;

app.listen(PORT, () => {
  console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});