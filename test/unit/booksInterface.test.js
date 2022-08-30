const { getBooks, getBookById, getBooksChapters } = require('../../src/interfaces/books/books.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { books: booksEndpoints } } = require('../libs/testConfig.js');

describe('Test books interfaces', () => {
    const testParams = { limit: 1000, offset: 1 };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    it('[getBooks] suite', async () => {
        const result = await getBooks(context, testParams);

        expect(result.startsWith(booksEndpoints.getBooks)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });

    it('[getBookById] suite', async () => {
        const id = '12345';
        const result = await getBookById(context, id, testParams);
        const matchPath = booksEndpoints.getBook.replace(':id', id);

        expect(result).toEqual(matchPath);
    });

    it('[getBooksChapters] suite', async () => {
        const id = '12345';
        const result = await getBooksChapters(context, id, testParams);
        const matchPath = booksEndpoints.getBookChapters.replace(':id', id);

        expect(result.startsWith(matchPath)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });
});
