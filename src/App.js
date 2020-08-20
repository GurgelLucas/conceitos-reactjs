import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [techs, setTechs] = useState([]);

  useEffect(() => {
    async function getRepositories() {
      api
        .get("repositories")
        .then((res) => setRepositories(res.data))
        .catch((erro) => console.log(erro));
    }
    getRepositories();
  }, []);

  async function handleAddRepository(e) {
    // TODO
    e.preventDefault();
    const response = await api.post("repositories", { title, url, techs });

    setRepositories([...repositories, response.data]);

    setTitle("");
    setUrl("");
    setTechs("");

    console.log(repositories);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`repositories/${id}`);

    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <h2>Repositories</h2>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={handleAddRepository}>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label htmlFor="url">Url:</label>
        <input
          type="text"
          id="url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <label htmlFor="techs">Techs:</label>

        <input
          type="text"
          id="techs"
          value={techs}
          onChange={(e) => setTechs(e.target.value)}
        />

        <button type="submit">Adicionar</button>
      </form>
    </div>
  );
}

export default App;
