const express = require("express");
const cors = require("cors");
const { uuid } = require("uuidv4");
const validateRepositoryId = require("./middlewares/validate-repository-id");
const validateRepository = require("./middlewares/validate-repository");

const app = express();
const repositories = [];

app.use(express.json());
app.use(cors());
app.use("/repositories/:id", validateRepositoryId);
app.use("/repositories/:id", validateRepository(repositories));

app.get("/repositories", (request, response) => {
    return response.json(repositories);
});

app.post("/repositories", (request, response) => {
    const { title, url, techs } = request.body;

    const repository = {
        id: uuid(),
        title,
        url,
        techs,
        likes: 0
    }
    repositories.push(repository);

    return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
    const { id } = request.params;
    const { repositoryIndex } = request;
    const { title, url, techs } = request.body;

    const repository = {
        id,
        title,
        url,
        techs,
        likes: repositories[repositoryIndex].likes
    }
    repositories[repositoryIndex] = repository;

    return response.json(repository);
});

app.delete("/repositories/:id", (request, response) => {
    const { repositoryIndex } = request;
    repositories.splice(repositoryIndex, 1);

    return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
    const { repositoryIndex } = request;
    const repository = repositories[repositoryIndex];
    repository.likes++;

    return response.json(repository);
});

module.exports = app;
