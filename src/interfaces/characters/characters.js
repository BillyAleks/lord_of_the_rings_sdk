/**
 * GET all characters from LoR API
 * @param {Object} context
 * @param {Object} queryParams
 * @returns {Promise<Object>}
 */
async function getCharacters(context, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.characters.getAllCharacters;
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/**
 * GET character by id
 * @param {Object} context
 * @param {string} id character ID
 * @returns {Promise<Object>}
 */
async function getCharacterById(context, id) {
    const { fetch, config } = context;
    const path = config.externalEndpoints.characters.getCharacter.replace(':id', id);
    return fetch(path);
}

/**
 * GET quotes related to character
 * @param {Object} context
 * @param {string} id character ID
 * @returns {Promise<Object>}
 */
async function getCharactersQuotes(context, id, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.characters.getCharacterQuotes.replace(':id', id);
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/** @module interfaces/characters API interfaces for character entities retrieval */
module.exports = {
    getCharacters,
    getCharacterById,
    getCharactersQuotes,
};
