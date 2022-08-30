/**
 * GET all movies from LoR API
 * @param {Object} context
 * @param {Object} queryParams
 * @returns {Promise<Object>}
 */
async function getMovies(context, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.movies.getAllMovies;
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/**
 * GET movie by id
 * @param {Object} context
 * @param {string} id movie ID
 * @returns {Promise<Object>}
 */
async function getMovieById(context, id) {
    const { fetch, config } = context;
    const path = config.externalEndpoints.movies.getMovie.replace(':id', id);

    return fetch(path);
}

/**
 * GET quotes related to movie
 * @param {Object} context
 * @param {string} id movie ID
 * @returns {Promise<Object>}
 */

async function getMovieQuotes(context, id, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.movies.getMovieQuotes.replace(':id', id);
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/** @module interfaces/movie API interfaces for movie entities retrieval */
module.exports = {
    getMovies,
    getMovieById,
    getMovieQuotes,
};
