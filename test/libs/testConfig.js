/** @module testConfig */
module.exports = {
    apiKey: '',
    cacheTime: 10000,
    loggerEnabled: true,
    queryOverrideLimit: 5000,
    defaultPaginationStates: {
        limit: 1000,
        offset: 0,
        page: 1,
        pages: 1,
    },
    externalEndpoints: {
        books: {
            getBooks: '/book',
            getBook: '/book/:id',
            getBookChapters: '/book/:id/chapter',
        },
        chapters: {
            getAllBooksChapters: '/chapter',
            getChapter: '/chapter/:id',
        },
        characters: {
            getAllCharacters: '/character',
            getCharacter: '/character/:id',
            getCharacterQuotes: '/character/:id/quote',
        },
        movies: {
            getAllMovies: '/movie',
            getMovie: '/movie/:id',
            getMovieQuotes: '/movie/:id/quote',
        },
        quotes: {
            getAllQuotes: '/quote',
            getQuote: '/quote/:id',
        },
    },
};
