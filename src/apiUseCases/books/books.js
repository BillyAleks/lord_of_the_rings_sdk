const { getBooks, getBookById, getBooksChapters } = require('../../interfaces/books/books.js');

/**
 * Retrieve all the LoR books
 * @param {Object} context
 * @param {Object} params
 * @returns {Promise<Object>} Object containing books array and pagination details
 */
async function getBookList(context, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getBookList',
    };
    log(logInfo);

    try {
        const booksList = await getBooks(context, params);
        return serializeApiResponse(booksList, 'books');
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
 * Search for books by name
 * @param {Object} context
 * @param {string} name searching happens by matching to this prop
 * @param {Object} params
 * @returns {Promise<Object>} Object containing books array and pagination details
 */
async function searchBooksByName(context, name, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const queryParams = { ...params, filter: { name: `=/.*${name}.*/i` } };

    const logInfo = {
        placement: 'useCase',
        method: 'searchBooksByName',
    };
    log(logInfo);

    try {
        const booksList = await getBooks(context, queryParams);
        return serializeApiResponse(booksList, 'books');
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
 * Retrieve titles as an array of strings
 * @param {Object} context
 * @returns {Promise<string[]>} array of book titles
 */
async function getBookTitles(context) {
    const booksList = await getBookList(context);
    return booksList ? booksList.books.map((book) => book.name) : null;
}

/**
 * Retrieve a book by identifier
 * @param {Object} context
 * @param {string} id book ID
 * @returns {Promise<Object>} IBook instance
 */
async function getBook(context, id) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getBook',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const book = await getBookById(context, id);
        return serializeApiResponse(book)[0];
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
 * Retrieve a book with chapters
 * @param {Object} context
 * @param {string} id book ID
 * @param {Object} params
 * @returns {Promise<Object>} Object containing book and it's chapters
 */
async function getBookWithChapters(context, id, params) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getBookWithChapters',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const book = await getBook(context, id);

        if (!book) {
            throw new Error('Could not retrieve a books list');
        }

        const bookChapters = await getBooksChapters(context, id, params);
        const bookChaptersSerialized = serializeApiResponse(bookChapters, 'bookChapters');
        return { book, ...bookChaptersSerialized };
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

/**
 * Retrieve book and related chapters titles in a serialized view
 * @param {Object} context
 * @param {string} id book ID
 * @returns {Promise<Object>} Object containing book and it's chapters
 */
async function getBookWithChaptersTitles(context, id) {
    const bookObject = await getBookWithChapters(context, id);

    if (!bookObject) {
        return null;
    }

    const chapterTitles = bookObject.bookChapters.map((chapter) => chapter.chapterName);
    return { bookName: bookObject.book.name, chapters: chapterTitles };
}

/** @module useCases/books */
module.exports = {
    getBookList,
    searchBooksByName,
    getBookTitles,
    getBook,
    getBookWithChapters,
    getBookWithChaptersTitles,
};
