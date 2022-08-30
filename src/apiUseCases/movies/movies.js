const { getMovies, getMovieById, getMovieQuotes } = require('../../interfaces/movies/movies.js');

/**
 * Retrieve all movies data from LoR API
 * @param {Object} context
 * @param {Object} params
 * @returns {Promise<Object>} Object containing movies array and pagination details
 */
async function getAllMovies(context, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getAllMovies',
    };
    log(logInfo);

    try {
        const moviesList = await getMovies(context, params);
        return serializeApiResponse(moviesList, 'movies');
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
 * Retrieve movies matching to provided name
 * @param {Object} context
 * @param {string} name searching happens by matching to this prop
 * @param {Object} params
 * @returns {Promise<Object>} Object containing movies array and pagination details
 */
async function searchMovieByName(context, name, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'searchMovieByName',
    };
    log(logInfo);

    const queryParams = { ...params, filter: { name: `=/.*${name}.*/i` } };

    try {
        const moviesMatched = await getMovies(context, queryParams);
        return serializeApiResponse(moviesMatched, 'movies');
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
 * Retrieve certain movie specified by identifier
 * @param {Object} context
 * @param {string} id movie ID
* @returns {Promise<Object>} IMovie instance
 */
async function getMovie(context, id) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getMovie',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const movie = await getMovieById(context, id);
        return serializeApiResponse(movie)[0];
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
 * Retrieve movie with related to it quotes
 * @param {Object} context
 * @param {string} id movie ID
 * @param {Object} params
 * @returns {Promise<Object>} objects representing movie with an array of quotes related to it
 */
async function getQuotesOfMovie(context, id, params) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getQuotesOfMovie',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const movie = await getMovie(context, id);
        const movieQuotes = await getMovieQuotes(context, id, params);
        const serializedResponse = serializeApiResponse(movieQuotes, 'quotes');
        const quotes = serializedResponse.quotes.map((quote) => {
            const quoteCopy = { ...quote };
            delete quoteCopy.id;
            return quoteCopy;
        });

        return { ...serializedResponse, name: movie.name, quotes };
    } catch (error) {
        log({
            ...logInfo,
            error,
            payload: {
                id,
                params,
            },
        });
        return null;
    }
}

module.exports = {
    getAllMovies,
    searchMovieByName,
    getMovie,
    getQuotesOfMovie,
};
