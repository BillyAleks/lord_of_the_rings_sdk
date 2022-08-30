const { initializeFetch } = require('./utils/fetch.js');
const { initializeCache } = require('./utils/cache.js');
const { initializeLogger } = require('./utils/logger.js');
const { queryBuilder } = require('./utils/queryBuilder.js');
const { serializeApiResponse, validateRequest } = require('./utils/common.js');
const config = require('./config.js');

const {
    getBookList,
    searchBooksByName,
    getBookTitles,
    getBook,
    getBookWithChapters,
    getBookWithChaptersTitles,
} = require('./apiUseCases/books/books.js');

const {
    getAllChapters,
    searchChaptersByName,
    getAllBooksWithChapters,
    getChapter,
} = require('./apiUseCases/chapters/chapters.js');

const {
    getAllCharacters,
    searchCharactersByName,
    getRacesList,
    getFemaleCharacters,
    getMaleCharacters,
    searchCharactersByRace,
    getCharacter,
    getQuotesOfCharacter,
} = require('./apiUseCases/characters/characters.js');

const {
    getAllMovies,
    searchMovieByName,
    getMovie,
    getQuotesOfMovie,
} = require('./apiUseCases/movies/movies.js');

const {
    getAllQuotes,
    getQuote,
    getRandomQuote,
} = require('./apiUseCases/quotes/quotes.js');

/**
 * Lord Of The Rings SDK controller function
 * @param {string|null} apiKey key for API authorization. Check Readme to get your key if you don't have one.
 * @param {Object|null} options object with options to enable features like cache or logging
 * @return {function} complete SDK function for retrieving serialized data from the API
 */
function LordOfTheRingsSDK(apiKey, options = {}) {
    const { cacheTime, loggerEnabled } = options;
    const headers = apiKey ? { Authorization: `Bearer ${apiKey}` } : {};
    const log = initializeLogger(loggerEnabled);
    const cache = initializeCache(cacheTime);
    const fetchUtils = initializeFetch(headers, log, cache, config);
    const utils = { serializeApiResponse, validateRequest, queryBuilder };

    const context = { fetch: fetchUtils.apiGet, log, utils, config };

    const books = {
        getBookList: (params) => getBookList(context, params),
        searchBooksByName: (name, params) => searchBooksByName(context, name, params),
        getBookTitles: () => getBookTitles(context),
        getBook: (id) => getBook(context, id),
        getBookWithChapters: (id, params) => getBookWithChapters(context, id, params),
        getBookWithChaptersTitles: (id) => getBookWithChaptersTitles(context, id),
    };

    const chapters = {
        getAllChapters: (params) => getAllChapters(context, params),
        searchChaptersByName: (name, params) => searchChaptersByName(context, name, params),
        getAllBooksWithChapters: () => getAllBooksWithChapters(context),
        getChapter: (id) => getChapter(context, id),
    };

    const characters = {
        getAllCharacters: (params) => getAllCharacters(context, params),
        searchCharactersByName: (name, params) => searchCharactersByName(context, name, params),
        getRacesList: () => getRacesList(context),
        getFemaleCharacters: (params) => getFemaleCharacters(context, params),
        getMaleCharacters: (params) => getMaleCharacters(context, params),
        searchCharactersByRace: (race, params) => searchCharactersByRace(context, race, params),
        getCharacter: (id) => getCharacter(context, id),
        getQuotesOfCharacter: (id, params) => getQuotesOfCharacter(context, id, params),
    };

    const movies = {
        getAllMovies: (params) => getAllMovies(context, params),
        searchMovieByName: (name, params) => searchMovieByName(context, name, params),
        getMovie: (id) => getMovie(context, id),
        getQuotesOfMovie: (id, params) => getQuotesOfMovie(context, id, params),
    };

    const quotes = {
        getAllQuotes: (params) => getAllQuotes(context, params),
        getQuote: (id) => getQuote(context, id),
        getRandomQuote: () => getRandomQuote(context),
    };

    return {
        books,
        chapters,
        characters,
        movies,
        quotes,
    };
}

/** @module gateway */
module.exports.SDK = LordOfTheRingsSDK;
