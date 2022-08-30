const {
    getAllChapters,
    searchChaptersByName,
    getAllBooksWithChapters,
    getChapter,
} = require('../../src/apiUseCases/chapters/chapters.js');
const { mockContext } = require('../libs/testUtils.js');

describe('Test chapters useCases', () => {
    const testParams = { limit: 1000, offset: 1 };
    const negativeScenarioTestParams = { ...testParams, throwError: true };
    let context;

    beforeAll(() => {
        context = mockContext();
    });

    describe('[getAllChapters] useCases', () => {
        it('Success scenario: no params', async () => {
            const result = await getAllChapters(context);
            expect(result.chapters).toBeDefined();
            expect(Array.isArray(result.chapters)).toBeTruthy();
            expect(result.chapters.length).toBeGreaterThan(0);
            // eslint-disable-next-line no-prototype-builtins
            expect(result.chapters[0].hasOwnProperty('book')).toBeTruthy();
        });

        it('Success scenario: with params', async () => {
            const result = await getAllChapters(context, testParams);
            expect(result.chapters).toBeDefined();
            expect(Array.isArray(result.chapters)).toBeTruthy();
            expect(result.chapters.length).toBeGreaterThan(0);
            // eslint-disable-next-line no-prototype-builtins
            expect(result.chapters[0].hasOwnProperty('book')).toBeTruthy();
        });

        it('Negative scenario', async () => {
            const result = await getAllChapters(context, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[searchChaptersByName] useCase', () => {
        const name = 'test';
        it('Success scenario: no params', async () => {
            const result = await searchChaptersByName(context, name);
            expect(result.chapters).toBeDefined();
            expect(Array.isArray(result.chapters)).toBeTruthy();
            expect(result.chapters.length).toBeGreaterThan(0);
            // eslint-disable-next-line no-prototype-builtins
            expect(result.chapters[0].hasOwnProperty('book')).toBeTruthy();
        });

        it('Success scenario: with params', async () => {
            const result = await searchChaptersByName(context, name, testParams);
            expect(result.chapters).toBeDefined();
            expect(Array.isArray(result.chapters)).toBeTruthy();
            expect(result.chapters.length).toBeGreaterThan(0);
            // eslint-disable-next-line no-prototype-builtins
            expect(result.chapters[0].hasOwnProperty('book')).toBeTruthy();
        });

        it('Negative scenario', async () => {
            const result = await searchChaptersByName(context, name, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getAllBooksWithChapters] useCase', () => {
        it('Success scenario', async () => {
            const result = await getAllBooksWithChapters(context);
            expect(result).toBeDefined();
            // eslint-disable-next-line no-prototype-builtins
            expect(result[0].hasOwnProperty('bookName')).toBeTruthy();
            expect(result[0].chapters).toBeDefined();
            expect(Array.isArray(result[0].chapters)).toBeTruthy();
            expect(result[0].chapters.length).toEqual(1);
        });
    });

    describe('[getChapter] useCase', () => {
        it('Negative scenario no id', async () => {
            const result = await getChapter(context);
            expect(result).toBeNull();
        });
    });
});
