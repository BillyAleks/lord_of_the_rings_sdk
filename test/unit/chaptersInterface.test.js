const { getChapters, getChapterById } = require('../../src/interfaces/chapters/chapters.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { chapters: chaptersEndpoints } } = require('../libs/testConfig.js');

describe('Test chapter interfaces', () => {
    const testParams = { limit: 1000, offset: 1 };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    it('[getChapters] suite', async () => {
        const result = await getChapters(context, testParams);

        expect(result.startsWith(chaptersEndpoints.getAllBooksChapters)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });

    it('[getChapterById] suite', async () => {
        const id = '12345';
        const result = await getChapterById(context, id, testParams);
        const matchPath = chaptersEndpoints.getChapter.replace(':id', id);

        expect(result).toEqual(matchPath);
    });
});
