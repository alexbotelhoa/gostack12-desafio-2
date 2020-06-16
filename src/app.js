const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");

const app = express();

app.use(cors());
app.use(express.json());

const repositories = [];

app.get("/repositories", (request, response) => {
    return response.json(repositories)
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;

  const repositorie = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  };

  repositories.push(repositorie);
  
  return response.status(201).json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repositorie = repositories.find(repositorie => repositorie.id === id);
  if (!repositorie) return response.status(400).json({ error: 'Repositorie not found' });

  repositorie.title = title;
  repositorie.url = url;
  repositorie.techs = techs;
  
  return response.status(200).json(repositorie)
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);
  if (repositorieIndex < 0) return response.status(400).json({ error: 'Repositorie not found'});

  repositories.splice(repositorieIndex, 1)

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorie = repositories.find(repositorie => repositorie.id === id);
  if (!repositorie) return response.status(400).json({ error: 'Repositorie not found'});

  repositorie.likes++;

  return response.status(200).json(repositorie) 
});

module.exports = app;
