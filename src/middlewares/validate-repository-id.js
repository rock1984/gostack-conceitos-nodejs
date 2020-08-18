const { isUuid } = require("uuidv4");

function validateRepositoryId(request, response, next) {
    const { id } = request.params;
    if (!isUuid(id)) {
        return response.status(400).json({ error: 'Invalid Repository ID.' });
    }
    return next();
}

module.exports = validateRepositoryId;
