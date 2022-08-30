const { getCharacters, getCharacterById, getCharactersQuotes } = require('../../interfaces/characters/characters.js');

/**
 * Retrieve all characters
 * @param {Object} context
 * @param {Object} params
 * @returns {Promise<Object>} Object containing characters array and pagination details
 */
async function getAllCharacters(context, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;
    const queryParams = { ...params };

    const logInfo = {
        placement: 'useCase',
        method: 'getAllCharacters',
    };
    log(logInfo);

    try {
        const charactersList = await getCharacters(context, queryParams);
        return serializeApiResponse(charactersList, 'characters');
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                params,
            },
        });
        return null;
    }
}

/**
 * Search for characters by character name
 * @param {Object} context
 * @param {string} name searching happens by matching to this prop
 * @param {Object} params
 * @returns {Promise<Object>} Object containing characters array and pagination details
 */
async function searchCharactersByName(context, name, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const queryParams = { ...params, filter: { name: `=/.*${name}.*/i` } };

    const logInfo = {
        placement: 'useCase',
        method: 'searchCharactersByName',
    };
    log(logInfo);

    try {
        const charactersMatch = await getCharacters(context, queryParams);
        return serializeApiResponse(charactersMatch, 'characters');
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                name,
                params,
            },
        });
        return null;
    }
}

/**
 * Retrieve all existing race list
 * @param {Object} context
 * @returns {Promise<string[]>}
 */
async function getRacesList(context) {
    const charactersList = await getAllCharacters(context);

    if (!charactersList) {
        return null;
    }

    const races = Array.from(
        new Set(
            charactersList.characters.map((character) => character.race)
        )
    );

    return races.filter((character) => character && character !== 'NaN');
}

/**
 * Retrieve all female characters
 * @param {Object} context
 * @param {Object} params
 * @returns {Promise<Object>} Object containing femaleCharacters array and pagination details
 */
async function getFemaleCharacters(context, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getFemaleCharacters',
    };
    log(logInfo);

    const queryParams = { ...params, filter: { gender: '=/.*female.*/i' } };

    try {
        const charactersMatch = await getCharacters(context, queryParams);
        return serializeApiResponse(charactersMatch, 'femaleCharacters');
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                params,
            },
        });
        return null;
    }
}

/**
 * Retrieve all the male characters
 * @param {Object} context
 * @param {Object} params
 * @returns {Promise<Object>} Object containing maleCharacters array and pagination details
 */
async function getMaleCharacters(context, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getMaleCharacters',
    };
    log(logInfo);

    // eslint-disable-next-line no-useless-escape
    const queryParams = { ...params, filter: { gender: '=/^male.*|.*\smale.*/i' } };

    try {
        const charactersMatch = await getCharacters(context, queryParams);
        return serializeApiResponse(charactersMatch, 'maleCharacters');
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                params,
            },
        });
        return null;
    }
}

/**
 * Retrieve all characters filtered by race
 * @param {Object} context
 * @param {string} race searching happens by matching to this prop
 * @param {Object} params
 * @returns {Promise<Object>} Object containing maleCharacters array and pagination details
 */
async function searchCharactersByRace(context, race, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'searchCharactersByRace',
    };
    log(logInfo);

    const queryParams = { ...params, filter: { race: `=/${race}/i` } };

    try {
        const charactersMatch = await getCharacters(context, queryParams);
        return serializeApiResponse(charactersMatch, 'characters');
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                race,
                params,
            },
        });
        return null;
    }
}

/**
 * Retrieve certain character specified by identifier
 * @param {Object} context
 * @param {string} id
 * @returns {Promise<Object>} Character object
 */
async function getCharacter(context, id) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getCharacter',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const character = await getCharacterById(context, id);
        return serializeApiResponse(character)[0];
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                id,
            },
        });
        return null;
    }
}

/**
 * Retrieve all quotes related to certain character specified by identifier
 * @param {Object} context
 * @param {string} id
 * @param {Object} params
 * @returns {Promise<Object>} Character object with extended array of related quotes
 */
async function getQuotesOfCharacter(context, id, params) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getQuotesOfCharacter',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const character = await getCharacter(context, id);

        if (!character) {
            throw new Error('Could not retrieve character');
        }

        const characterQuotes = await getCharactersQuotes(context, id, params);
        const serializedResponse = serializeApiResponse(characterQuotes, 'quotes');
        const quotes = serializedResponse.quotes.map((quote) => {
            const quoteCopy = { ...quote };
            delete quoteCopy.id;
            return quoteCopy;
        });

        return { ...serializedResponse, quotes, name: character.name };
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                id,
            },
        });
        return null;
    }
}

/** @module useCases/characters */
module.exports = {
    getAllCharacters,
    searchCharactersByName,
    getRacesList,
    getFemaleCharacters,
    getMaleCharacters,
    searchCharactersByRace,
    getCharacter,
    getQuotesOfCharacter,
};
