/**
 * GET all quotes from LoR API
 * @param {Object} context
 * @param {Object} queryParams
 * @returns {Promise<Object>}
 */
async function getQuotes(context, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.quotes.getAllQuotes;
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/**
 * GET quote by id
 * @param {Object} context
 * @param {string} id quote ID
 * @returns {Promise<Object>}
 */
async function getQuoteById(context, id) {
    const { fetch, config } = context;
    const path = config.externalEndpoints.quotes.getQuote.replace(':id', id);

    return fetch(path);
}

/** @module interfaces/quotes API interfaces for quote entities retrieval */
module.exports = {
    getQuotes,
    getQuoteById,
};
