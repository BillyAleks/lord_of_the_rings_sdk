const {
    getAllMovies,
    searchMovieByName,
    getMovie,
    getQuotesOfMovie,
} = require('../../src/apiUseCases/movies/movies.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { movies: moviesEndpoints } } = require('../libs/testConfig.js');

describe('Test movies useCases', () => {
    const id = '12345';
    const testParams = { limit: 1000, offset: 1 };
    const negativeScenarioTestParams = { ...testParams, throwError: true };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    describe('[getAllMovies] useCases', () => {
        it('Success scenario: no params', async () => {
            const result = await getAllMovies(context);
            expect(result.movies[0]).toEqual(moviesEndpoints.getAllMovies);
        });

        it('Success scenario: with params', async () => {
            const result = await getAllMovies(context, testParams);

            expect(result.movies[0]).toEqual(moviesEndpoints.getAllMovies);
            expect(+result.movies[1]).toEqual(paramsEntriesLength);
        });

        it('Negative scenario', async () => {
            const result = await getAllMovies(context, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[searchMovieByName] useCase', () => {
        const name = 'test';
        it('Success scenario: no params', async () => {
            const result = await searchMovieByName(context, name);
            expect(result.movies[0]).toEqual(moviesEndpoints.getAllMovies);
        });

        it('Success scenario: with params', async () => {
            const result = await searchMovieByName(context, name, testParams);
            expect(result.movies[0]).toEqual(moviesEndpoints.getAllMovies);
            expect(+result.movies[1]).toEqual(paramsEntriesLength + 1); // filter property added
        });

        it('Negative scenario', async () => {
            const result = await searchMovieByName(context, name, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getMovie] useCase', () => {
        it('Success scenario', async () => {
            const result = await getMovie(context, id);
            const matchPath = moviesEndpoints.getMovie.replace(':id', id);
            expect(result).toEqual(matchPath);
        });

        it('Negative scenario no id', async () => {
            const result = await getMovie(context);
            expect(result).toBeNull();
        });
    });

    describe('[getQuotesOfCharacter] useCase', () => {
        it('Success scenario: no params', async () => {
            const result = await getQuotesOfMovie(context, id);
            expect(result).toBeDefined();
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('quotes'));
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('name'));
        });

        it('Success scenario: with params', async () => {
            const result = await getQuotesOfMovie(context, id, testParams);
            expect(result).toBeDefined();
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('quotes'));
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('name'));
        });

        it('Negative scenario: no id', async () => {
            const result = await getQuotesOfMovie(context);
            expect(result).toBeNull();
        });

        it('Negative scenario: query error imitation', async () => {
            const result = await getQuotesOfMovie(context, id, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });
});
