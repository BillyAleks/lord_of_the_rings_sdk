const { getQuotes, getQuoteById } = require('../../interfaces/quotes/quotes.js');
const { getCharacter } = require('../characters/characters.js');
const { getMovie } = require('../movies/movies.js');

/**
 * Retrieve all existing quotes
 * @param {Object} context
 * @param {Object} params
 * @returns {Promise<Object>} Object containing quotes array and pagination details
 */
async function getAllQuotes(context, params) {
    const { log, utils, config } = context;
    const { serializeApiResponse } = utils;
    const queryParams = { ...params };

    if (!queryParams.limit) {
        queryParams.limit = config.queryOverrideLimit; // to override default API limitation
    }

    const logInfo = {
        placement: 'useCase',
        method: 'getAllQuotes',
    };
    log(logInfo);

    try {
        const quotesList = await getQuotes(context, queryParams);
        const serializedResponse = serializeApiResponse(quotesList, 'quotes');
        const serializedQuotes = serializedResponse.quotes.map((quote) => {
            const quoteCopy = { ...quote };
            delete quoteCopy.id;
            return quoteCopy;
        });

        return { ...serializedResponse, quotes: serializedQuotes };
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
 * Retrieve certain quote specified by id
 * @param {Object} context
 * @param {string} id quote ID
 * @returns {Promise<Object>} quote object with extended movie and character entities
 */
async function getQuote(context, id) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getQuote',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const quote = await getQuoteById(context, id);
        const serializedQuote = serializeApiResponse(quote)[0];

        const movie = await getMovie(context, serializedQuote.movie);
        const character = await getCharacter(context, serializedQuote.character);

        if (!movie || !character) {
            throw new Error('Could not retrieve an intermediate data');
        }

        return { ...serializedQuote, movie, character };
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
 * Retrieve a random quote
 * @param {Object} context
 * @param {Object} params
 * @returns {Promise<Object>} Object containing random quote with movie and character related to it
 */
async function getRandomQuote(context) {
    const { log } = context;
    const quotesList = await getAllQuotes(context);

    if (!quotesList) {
        return [];
    }

    const randomIndex = Math.floor(Math.random() * quotesList.quotes.length);
    const randomQuote = quotesList.quotes[randomIndex];

    const movie = await getMovie(context, randomQuote.movie);
    const character = await getCharacter(context, randomQuote.character);

    if (!movie || !character) {
        log({
            placement: 'useCase',
            method: 'getRandomQuote',
            error: new Error('Could not retrieve an intermediate data'),
            payload: {},
        });
        return null;
    }

    return { ...randomQuote, movie, character };
}

/** @module useCases/quotes */
module.exports = {
    getAllQuotes,
    getQuote,
    getRandomQuote,
};
