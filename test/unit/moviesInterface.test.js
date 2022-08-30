const { getMovies, getMovieById, getMovieQuotes } = require('../../src/interfaces/movies/movies.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { movies: moviesEndpoints } } = require('../libs/testConfig.js');

describe('Test movies interfaces', () => {
    const testParams = { limit: 1000, offset: 1 };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    it('[getMovies] suite', async () => {
        const result = await getMovies(context, testParams);

        expect(result.startsWith(moviesEndpoints.getAllMovies)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });

    it('[getMovieById] suite', async () => {
        const id = '12345';
        const result = await getMovieById(context, id, testParams);
        const matchPath = moviesEndpoints.getMovie.replace(':id', id);

        expect(result).toEqual(matchPath);
    });

    it('[getMovieQuotes] suite', async () => {
        const id = '12345';
        const result = await getMovieQuotes(context, id, testParams);
        const matchPath = moviesEndpoints.getMovieQuotes.replace(':id', id);

        expect(result.startsWith(matchPath)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });
});
