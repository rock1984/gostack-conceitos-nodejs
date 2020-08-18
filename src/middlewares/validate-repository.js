function validateRepository(repositories) {
    return (request, response, next) => {
        const { id } = request.params;
        const repositoryIndex = repositories.findIndex(repository => repository.id === id);
        if (repositoryIndex < 0) {
            return response.status(400).json({ error: 'Repository not found.' });
        }
        request.repositoryIndex = repositoryIndex;
        return next();
    }
}

module.exports = validateRepository;
