const { initializeSDK } = require('../libs/testUtils.js');
const { defaultPaginationStates, queryOverrideLimit } = require('../libs/testConfig.js');

describe('Test quotes endpoints availability and response changes', () => {
    let sdk;
    let quoteId;

    beforeAll(() => {
        sdk = initializeSDK();
    });

    // eslint-disable-next-line arrow-body-style
    afterAll(() => {
        // to disable further https request hanging jest execution;
        // eslint-disable-next-line no-useless-return
        return;
    });

    describe('[getAllQuotes]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.quotes.getAllQuotes();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, paginationInfo } = result;
            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();
            expect(quotes.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const quoteSample = quotes[0];
            expect(quoteSample._id).toBeDefined();
            expect(typeof quoteSample._id).toEqual('string');
            expect(quoteSample.dialog).toBeDefined();
            expect(typeof quoteSample.dialog).toEqual('string');
            expect(quoteSample.movie).toBeDefined();
            expect(typeof quoteSample.movie).toEqual('string');
            expect(quoteSample.character).toBeDefined();
            expect(typeof quoteSample.character).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(queryOverrideLimit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            quoteId = quoteSample._id;
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };

            const result = await sdk.quotes.getAllQuotes(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, paginationInfo } = result;
            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();
            expect(quotes.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const quoteSample = quotes[0];
            expect(quoteSample._id).toBeDefined();
            expect(typeof quoteSample._id).toEqual('string');
            expect(quoteSample.dialog).toBeDefined();
            expect(typeof quoteSample.dialog).toEqual('string');
            expect(quoteSample.movie).toBeDefined();
            expect(typeof quoteSample.movie).toEqual('string');
            expect(quoteSample.character).toBeDefined();
            expect(typeof quoteSample.character).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };

            const result = await sdk.quotes.getAllQuotes(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, paginationInfo } = result;
            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();
            expect(quotes.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const quoteSample = quotes[0];
            expect(quoteSample._id).toBeDefined();
            expect(typeof quoteSample._id).toEqual('string');
            expect(quoteSample.dialog).toBeDefined();
            expect(typeof quoteSample.dialog).toEqual('string');
            expect(quoteSample.movie).toBeDefined();
            expect(typeof quoteSample.movie).toEqual('string');
            expect(quoteSample.character).toBeDefined();
            expect(typeof quoteSample.character).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);
        });
    });

    describe('[getQuote]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.quotes.getQuote(quoteId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result._id).toEqual(quoteId);
            expect(typeof result._id).toEqual('string');
            expect(result.dialog).toBeDefined();
            expect(typeof result.dialog).toEqual('string');

            expect(result.movie).toBeDefined();
            expect(typeof result.movie).toEqual('object');
            expect(result.movie._id).toBeDefined();
            expect(typeof result.movie._id).toEqual('string');
            expect(result.movie.name).toBeDefined();
            expect(typeof result.movie.name).toEqual('string');
            expect(result.movie.runtimeInMinutes).toBeDefined();
            expect(typeof result.movie.runtimeInMinutes).toEqual('number');
            expect(result.movie.budgetInMillions).toBeDefined();
            expect(typeof result.movie.budgetInMillions).toEqual('number');
            expect(result.movie.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof result.movie.boxOfficeRevenueInMillions).toEqual('number');
            expect(result.movie.academyAwardNominations).toBeDefined();
            expect(typeof result.movie.academyAwardNominations).toEqual('number');
            expect(result.movie.academyAwardWins).toBeDefined();
            expect(typeof result.movie.academyAwardWins).toEqual('number');
            expect(result.movie.rottenTomatoesScore).toBeDefined();
            expect(typeof result.movie.rottenTomatoesScore).toEqual('number');

            expect(result.character).toBeDefined();
            expect(typeof result.character).toEqual('object');
            expect(result.character._id).toBeDefined();
            expect(typeof result.character._id).toEqual('string');
            expect(result.character.height).toBeDefined();
            expect(typeof result.character.height).toEqual('string');
            expect(result.character.race).toBeDefined();
            expect(typeof result.character.race).toEqual('string');
            expect(result.character.gender).toBeDefined();
            expect(typeof result.character.gender).toEqual('string');
            expect(result.character.birth).toBeDefined();
            expect(typeof result.character.birth).toEqual('string');
            expect(result.character.spouse).toBeDefined();
            expect(typeof result.character.spouse).toEqual('string');
            expect(result.character.death).toBeDefined();
            expect(typeof result.character.death).toEqual('string');
            expect(result.character.realm).toBeDefined();
            expect(typeof result.character.realm).toEqual('string');
            expect(result.character.hair).toBeDefined();
            expect(typeof result.character.hair).toEqual('string');
            expect(result.character.name).toBeDefined();
            expect(typeof result.character.name).toEqual('string');
            expect(result.character.wikiUrl).toBeDefined();
            expect(typeof result.character.wikiUrl).toEqual('string');
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.quotes.getQuote();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.quotes.getQuote('abcde');
            expect(result).toBeNull();
        });
    });

    describe('[getRandomQuote]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.quotes.getRandomQuote();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result._id).toBeDefined();
            expect(typeof result._id).toEqual('string');
            expect(result.dialog).toBeDefined();
            expect(typeof result.dialog).toEqual('string');

            expect(result.movie).toBeDefined();
            expect(typeof result.movie).toEqual('object');
            expect(result.movie._id).toBeDefined();
            expect(typeof result.movie._id).toEqual('string');
            expect(result.movie.name).toBeDefined();
            expect(typeof result.movie.name).toEqual('string');
            expect(result.movie.runtimeInMinutes).toBeDefined();
            expect(typeof result.movie.runtimeInMinutes).toEqual('number');
            expect(result.movie.budgetInMillions).toBeDefined();
            expect(typeof result.movie.budgetInMillions).toEqual('number');
            expect(result.movie.boxOfficeRevenueInMillions).toBeDefined();
            expect(typeof result.movie.boxOfficeRevenueInMillions).toEqual('number');
            expect(result.movie.academyAwardNominations).toBeDefined();
            expect(typeof result.movie.academyAwardNominations).toEqual('number');
            expect(result.movie.academyAwardWins).toBeDefined();
            expect(typeof result.movie.academyAwardWins).toEqual('number');
            expect(result.movie.rottenTomatoesScore).toBeDefined();
            expect(typeof result.movie.rottenTomatoesScore).toEqual('number');

            expect(result.character).toBeDefined();
            expect(typeof result.character).toEqual('object');
            expect(result.character._id).toBeDefined();
            expect(typeof result.character._id).toEqual('string');
            expect(result.character.height).toBeDefined();
            expect(typeof result.character.height).toEqual('string');
            expect(result.character.race).toBeDefined();
            expect(typeof result.character.race).toEqual('string');
            expect(result.character.gender).toBeDefined();
            expect(typeof result.character.gender).toEqual('string');
            expect(result.character.birth).toBeDefined();
            expect(typeof result.character.birth).toEqual('string');
            expect(result.character.spouse).toBeDefined();
            expect(typeof result.character.spouse).toEqual('string');
            expect(result.character.death).toBeDefined();
            expect(typeof result.character.death).toEqual('string');
            expect(result.character.realm).toBeDefined();
            expect(typeof result.character.realm).toEqual('string');
            expect(result.character.hair).toBeDefined();
            expect(typeof result.character.hair).toEqual('string');
            expect(result.character.name).toBeDefined();
            expect(typeof result.character.name).toEqual('string');
            expect(result.character.wikiUrl).toBeDefined();
            expect(typeof result.character.wikiUrl).toEqual('string');
        });
    });
});
