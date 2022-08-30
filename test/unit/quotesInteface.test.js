const { getQuotes, getQuoteById } = require('../../src/interfaces/quotes/quotes.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { quotes: quotesEndpoints } } = require('../libs/testConfig.js');

describe('Test quotes interfaces', () => {
    const testParams = { limit: 1000, offset: 1 };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    it('[getQuotes] suite', async () => {
        const result = await getQuotes(context, testParams);

        expect(result.startsWith(quotesEndpoints.getAllQuotes)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });

    it('[getQuoteById] suite', async () => {
        const id = '12345';
        const result = await getQuoteById(context, id, testParams);
        const matchPath = quotesEndpoints.getQuote.replace(':id', id);

        expect(result).toEqual(matchPath);
    });
});
