/**
 * GET all books from LoR API
 * @param {Object} context
 * @param {Object} queryParams
 * @returns {Promise<Object>}
 */
async function getBooks(context, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.books.getBooks;
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/**
 * GET book by id
 * @param {Object} context
 * @param {string} id book ID
 * @returns {Promise<Object>}
 */
async function getBookById(context, id) {
    const { fetch, config } = context;
    const path = config.externalEndpoints.books.getBook.replace(':id', id);

    return fetch(path);
}

/**
 * GET chapters related to book
 * @param {Object} context
 * @param {string} id book ID
 * @returns {Promise<Object>}
 */
async function getBooksChapters(context, id, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.books.getBookChapters.replace(':id', id);
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/** @module interfaces/books API interfaces for book entities retrieval */
module.exports = {
    getBooks,
    getBookById,
    getBooksChapters,
};
