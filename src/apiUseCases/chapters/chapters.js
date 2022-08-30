const { getChapters, getChapterById } = require('../../interfaces/chapters/chapters.js');
const { getBookList, getBook } = require('../books/books.js');
const { extendChapters, extendBooks } = require('./helpers.js');

/**
 * Retrieve all existing chapters of LoR books
 * @param {Object} context
 * @param {Object} params
 * @returns {<Promise<Object>} Object containing chapters array and pagination details
 */
async function getAllChapters(context, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getAllChapters',
    };
    log(logInfo);

    try {
        const booksChapters = await getChapters(context, params);
        const serializedResponse = serializeApiResponse(booksChapters, 'chapters');
        const booksList = await getBookList(context);

        if (!booksList) {
            throw new Error('Could not retrieve a books list');
        }

        const extendedChapters = extendChapters(serializedResponse.chapters, booksList.books);

        return { ...serializedResponse, chapters: extendedChapters };
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
 * Search for chapters by name
 * @param {Object} context
 * @param {string} name searching happens by matching to this prop
 * @param {Object} params
 * @returns {Promise<Object>} Object containing chapters array and pagination details
 */
async function searchChaptersByName(context, name, params) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const queryParams = { ...params, filter: { chapterName: `=/.*${name}.*/i` } };

    const logInfo = {
        placement: 'useCase',
        method: 'searchChaptersByName',
    };
    log(logInfo);

    try {
        const booksChapters = await getChapters(context, queryParams);
        const serializedResponse = serializeApiResponse(booksChapters, 'chapters');
        const booksList = await getBookList(context);

        if (!booksList) {
            throw new Error('Could not retrieve a books list');
        }

        const extendedChapters = extendChapters(serializedResponse.chapters, booksList.books);

        return { ...serializedResponse, chapters: extendedChapters };
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
 * Retrieve all the books with chapters extended
 * @param {Object} context
 * @returns {Promise<Object>}
 */
async function getAllBooksWithChapters(context) {
    const { log, utils } = context;
    const { serializeApiResponse } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getAllBooksWithChapters',
    };
    log(logInfo);

    try {
        const booksChapters = await getChapters(context);
        const serializedResponse = serializeApiResponse(booksChapters);
        const booksList = await getBookList(context);

        if (!booksList) {
            throw new Error('Could not retrieve a books list');
        }

        return extendBooks(serializedResponse, booksList.books);
    } catch (error) {
        log({
            ...logInfo,
            error,
        });
        return null;
    }
}

/**
 * Retrieve specific chapter of a book by its identifier
 * @param {Object} context
 * @param {string} id chapter ID
 * @returns {Promise<Object>} Object included a chapter and related book
 */
async function getChapter(context, id) {
    const { log, utils } = context;
    const { serializeApiResponse, validateRequest } = utils;

    const logInfo = {
        placement: 'useCase',
        method: 'getChapter',
    };
    log(logInfo);

    try {
        validateRequest(id);

        const chapter = await getChapterById(context, id);
        const serializedResponse = serializeApiResponse(chapter)[0];

        const book = await getBook(context, serializedResponse.book);

        if (!book) {
            throw new Error('Could not retrieve book data');
        }

        return { ...serializedResponse, book };
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

/** @module useCases/chapters */
module.exports = {
    getAllChapters,
    searchChaptersByName,
    getAllBooksWithChapters,
    getChapter,
};
