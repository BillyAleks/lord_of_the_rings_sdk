const {
    getAllQuotes,
    getQuote,
} = require('../../src/apiUseCases/quotes/quotes.js');
const { mockContext } = require('../libs/testUtils.js');

describe('Test quotes useCases', () => {
    const testParams = { limit: 1000, offset: 1 };
    const negativeScenarioTestParams = { ...testParams, throwError: true };
    let context;

    beforeAll(() => {
        context = mockContext();
    });

    describe('[getAllQuotes] useCase', () => {
        it('Success scenario: no params', async () => {
            const result = await getAllQuotes(context);
            expect(result.quotes).toBeDefined();
        });

        it('Success scenario: with params', async () => {
            const result = await getAllQuotes(context, testParams);
            expect(result.quotes).toBeDefined();
        });

        it('Negative scenario', async () => {
            const result = await getAllQuotes(context, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getQuote] useCase', () => {
        it('Negative scenario no id', async () => {
            const result = await getQuote(context);
            expect(result).toBeNull();
        });
    });
});
