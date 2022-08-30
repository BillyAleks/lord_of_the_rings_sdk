const { initializeSDK } = require('../libs/testUtils.js');
const { defaultPaginationStates } = require('../libs/testConfig.js');

describe('Test movies endpoints availability and response changes', () => {
    let sdk;
    let movieId;

    beforeAll(() => {
        sdk = initializeSDK();
    });

    // eslint-disable-next-line arrow-body-style
    afterAll(() => {
        // to disable further https request hanging jest execution;
        // eslint-disable-next-line no-useless-return
        return;
    });

    describe('[getAllMovies]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.movies.getAllMovies();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { movies, paginationInfo } = result;
            expect(movies).toBeDefined();
            expect(Array.isArray(movies)).toBeTruthy();
            expect(movies.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const movieSample = movies[0];
            expect(movieSample._id).toBeDefined();
            expect(typeof movieSample._id).toEqual('string');
            expect(movieSample.name).toBeDefined();
            expect(typeof movieSample.name).toEqual('string');
            expect(movieSample.runtimeInMinutes).toBeDefined();
            expect(typeof movieSample.runtimeInMinutes).toEqual('number');
            expect(movieSample.budgetInMillions).toBeDefined();
            expect(typeof movieSample.budgetInMillions).toEqual('number');
            expect(movieSample.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof movieSample.boxOfficeRevenueInMillions).toEqual('number');
            expect(movieSample.academyAwardNominations).toBeDefined();
            expect(typeof movieSample.academyAwardNominations).toEqual('number');
            expect(movieSample.academyAwardWins).toBeDefined();
            expect(typeof movieSample.academyAwardWins).toEqual('number');
            expect(movieSample.rottenTomatoesScore).toBeDefined();
            expect(typeof movieSample.rottenTomatoesScore).toEqual('number');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            movieId = movieSample._id;
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };

            const result = await sdk.movies.getAllMovies(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { movies, paginationInfo } = result;
            expect(movies).toBeDefined();
            expect(Array.isArray(movies)).toBeTruthy();
            expect(movies.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const movieSample = movies[0];
            expect(movieSample._id).toBeDefined();
            expect(typeof movieSample._id).toEqual('string');
            expect(movieSample.name).toBeDefined();
            expect(typeof movieSample.name).toEqual('string');
            expect(movieSample.runtimeInMinutes).toBeDefined();
            expect(typeof movieSample.runtimeInMinutes).toEqual('number');
            expect(movieSample.budgetInMillions).toBeDefined();
            expect(typeof movieSample.budgetInMillions).toEqual('number');
            expect(movieSample.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof movieSample.boxOfficeRevenueInMillions).toEqual('number');
            expect(movieSample.academyAwardNominations).toBeDefined();
            expect(typeof movieSample.academyAwardNominations).toEqual('number');
            expect(movieSample.academyAwardWins).toBeDefined();
            expect(typeof movieSample.academyAwardWins).toEqual('number');
            expect(movieSample.rottenTomatoesScore).toBeDefined();
            expect(typeof movieSample.rottenTomatoesScore).toEqual('number');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };

            const result = await sdk.movies.getAllMovies(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { movies, paginationInfo } = result;
            expect(movies).toBeDefined();
            expect(Array.isArray(movies)).toBeTruthy();
            expect(movies.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const movieSample = movies[0];
            expect(movieSample._id).toBeDefined();
            expect(typeof movieSample._id).toEqual('string');
            expect(movieSample.name).toBeDefined();
            expect(typeof movieSample.name).toEqual('string');
            expect(movieSample.runtimeInMinutes).toBeDefined();
            expect(typeof movieSample.runtimeInMinutes).toEqual('number');
            expect(movieSample.budgetInMillions).toBeDefined();
            expect(typeof movieSample.budgetInMillions).toEqual('number');
            expect(movieSample.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof movieSample.boxOfficeRevenueInMillions).toEqual('number');
            expect(movieSample.academyAwardNominations).toBeDefined();
            expect(typeof movieSample.academyAwardNominations).toEqual('number');
            expect(movieSample.academyAwardWins).toBeDefined();
            expect(typeof movieSample.academyAwardWins).toEqual('number');
            expect(movieSample.rottenTomatoesScore).toBeDefined();
            expect(typeof movieSample.rottenTomatoesScore).toEqual('number');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);
        });
    });

    describe('[searchMovieByName]: test suits', () => {
        const searchInput = 'the';

        it('[Success scenario] no params', async () => {
            const result = await sdk.movies.searchMovieByName(searchInput);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { movies, paginationInfo } = result;
            expect(movies).toBeDefined();
            expect(Array.isArray(movies)).toBeTruthy();
            expect(movies.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const movieSample = movies[0];
            expect(movieSample._id).toBeDefined();
            expect(typeof movieSample._id).toEqual('string');
            expect(movieSample.name).toBeDefined();
            expect(typeof movieSample.name).toEqual('string');
            expect(movieSample.runtimeInMinutes).toBeDefined();
            expect(typeof movieSample.runtimeInMinutes).toEqual('number');
            expect(movieSample.budgetInMillions).toBeDefined();
            expect(typeof movieSample.budgetInMillions).toEqual('number');
            expect(movieSample.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof movieSample.boxOfficeRevenueInMillions).toEqual('number');
            expect(movieSample.academyAwardNominations).toBeDefined();
            expect(typeof movieSample.academyAwardNominations).toEqual('number');
            expect(movieSample.academyAwardWins).toBeDefined();
            expect(typeof movieSample.academyAwardWins).toEqual('number');
            expect(movieSample.rottenTomatoesScore).toBeDefined();
            expect(typeof movieSample.rottenTomatoesScore).toEqual('number');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            movies.forEach((movie) => {
                const movieNameLowerCased = movie.name.toLowerCase();
                const matchIndex = movieNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Negative scenario] not found', async () => {
            const result = await sdk.movies.searchMovieByName('qwerty');
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { movies, paginationInfo } = result;
            expect(movies).toBeDefined();
            expect(Array.isArray(movies)).toBeTruthy();
            expect(movies.length).toEqual(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            expect(paginationInfo.total).toEqual(0);
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };
            const result = await sdk.movies.searchMovieByName(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { movies, paginationInfo } = result;
            expect(movies).toBeDefined();
            expect(Array.isArray(movies)).toBeTruthy();
            expect(movies.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const movieSample = movies[0];
            expect(movieSample._id).toBeDefined();
            expect(typeof movieSample._id).toEqual('string');
            expect(movieSample.name).toBeDefined();
            expect(typeof movieSample.name).toEqual('string');
            expect(movieSample.runtimeInMinutes).toBeDefined();
            expect(typeof movieSample.runtimeInMinutes).toEqual('number');
            expect(movieSample.budgetInMillions).toBeDefined();
            expect(typeof movieSample.budgetInMillions).toEqual('number');
            expect(movieSample.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof movieSample.boxOfficeRevenueInMillions).toEqual('number');
            expect(movieSample.academyAwardNominations).toBeDefined();
            expect(typeof movieSample.academyAwardNominations).toEqual('number');
            expect(movieSample.academyAwardWins).toBeDefined();
            expect(typeof movieSample.academyAwardWins).toEqual('number');
            expect(movieSample.rottenTomatoesScore).toBeDefined();
            expect(typeof movieSample.rottenTomatoesScore).toEqual('number');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();

            movies.forEach((movie) => {
                const movieNameLowerCased = movie.name.toLowerCase();
                const matchIndex = movieNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };
            const result = await sdk.movies.searchMovieByName(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { movies, paginationInfo } = result;
            expect(movies).toBeDefined();
            expect(Array.isArray(movies)).toBeTruthy();
            expect(movies.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const movieSample = movies[0];
            expect(movieSample._id).toBeDefined();
            expect(typeof movieSample._id).toEqual('string');
            expect(movieSample.name).toBeDefined();
            expect(typeof movieSample.name).toEqual('string');
            expect(movieSample.runtimeInMinutes).toBeDefined();
            expect(typeof movieSample.runtimeInMinutes).toEqual('number');
            expect(movieSample.budgetInMillions).toBeDefined();
            expect(typeof movieSample.budgetInMillions).toEqual('number');
            expect(movieSample.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof movieSample.boxOfficeRevenueInMillions).toEqual('number');
            expect(movieSample.academyAwardNominations).toBeDefined();
            expect(typeof movieSample.academyAwardNominations).toEqual('number');
            expect(movieSample.academyAwardWins).toBeDefined();
            expect(typeof movieSample.academyAwardWins).toEqual('number');
            expect(movieSample.rottenTomatoesScore).toBeDefined();
            expect(typeof movieSample.rottenTomatoesScore).toEqual('number');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);

            movies.forEach((movie) => {
                const movieNameLowerCased = movie.name.toLowerCase();
                const matchIndex = movieNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });
    });

    describe('[getMovie]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.movies.getMovie(movieId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result._id).toBeDefined();
            expect(typeof result._id).toEqual('string');
            expect(result.name).toBeDefined();
            expect(typeof result.name).toEqual('string');
            expect(result.runtimeInMinutes).toBeDefined();
            expect(typeof result.runtimeInMinutes).toEqual('number');
            expect(result.budgetInMillions).toBeDefined();
            expect(typeof result.budgetInMillions).toEqual('number');
            expect(result.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof result.boxOfficeRevenueInMillions).toEqual('number');
            expect(result.academyAwardNominations).toBeDefined();
            expect(typeof result.academyAwardNominations).toEqual('number');
            expect(result.academyAwardWins).toBeDefined();
            expect(typeof result.academyAwardWins).toEqual('number');
            expect(result.rottenTomatoesScore).toBeDefined();
            expect(typeof result.rottenTomatoesScore).toEqual('number');
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.movies.getMovie();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.movies.getMovie('0392a');
            expect(result).toBeNull();
        });
    });

    describe('[getQuotesOfMovie]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.movies.getQuotesOfMovie(movieId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, name, paginationInfo } = result;
            expect(name).toBeDefined();
            expect(typeof name).toEqual('string');

            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();

            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');
            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };
            const result = await sdk.movies.getQuotesOfMovie(movieId, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, name, paginationInfo } = result;
            expect(name).toBeDefined();
            expect(typeof name).toEqual('string');

            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();

            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');
            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };
            const result = await sdk.movies.getQuotesOfMovie(movieId, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, name, paginationInfo } = result;
            expect(name).toBeDefined();
            expect(typeof name).toEqual('string');

            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();

            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');
            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.page).toEqual(params.page);
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.offset).not.toBeDefined();
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.movies.getQuotesOfMovie();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.movies.getQuotesOfMovie('abcd');
            expect(result).toBeNull();
        });
    });
});
