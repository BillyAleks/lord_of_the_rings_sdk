/** @module config */
module.exports = {
    host: 'the-one-api.dev',
    queryOverrideLimit: 5000,
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
