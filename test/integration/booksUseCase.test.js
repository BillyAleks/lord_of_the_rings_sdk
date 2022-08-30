const {
    getBookList,
    searchBooksByName,
    getBookTitles,
    getBook,
    getBookWithChapters,
    getBookWithChaptersTitles,
} = require('../../src/apiUseCases/books/books.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { books: booksEndpoints } } = require('../libs/testConfig.js');

describe('Test books useCases', () => {
    const id = '12345';
    const testParams = { limit: 1000, offset: 1 };
    const negativeScenarioTestParams = { ...testParams, throwError: true };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    describe('[getBookList] useCase', () => {
        it('Success scenario: no params', async () => {
            const result = await getBookList(context);

            expect(result.books[0]).toEqual(booksEndpoints.getBooks);
        });

        it('Success scenario: with params', async () => {
            const result = await getBookList(context, testParams);

            expect(result.books[0]).toEqual(booksEndpoints.getBooks);
            expect(+result.books[1]).toEqual(paramsEntriesLength);
        });

        it('Negative scenario', async () => {
            const result = await getBookList(context, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[searchBooksByName] useCase', () => {
        const name = 'test';
        it('Success scenario: no params', async () => {
            const result = await searchBooksByName(context, name);

            expect(result.books[0]).toEqual(booksEndpoints.getBooks);
        });

        it('Success scenario: with params', async () => {
            const result = await searchBooksByName(context, name, testParams);

            expect(result.books[0]).toEqual(booksEndpoints.getBooks);
            expect(+result.books[1]).toEqual(paramsEntriesLength + 1); // filter property added
        });

        it('Negative scenario', async () => {
            const result = await searchBooksByName(context, name, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getBookTitles] useCase', () => {
        it('Success scenario', async () => {
            const result = await getBookTitles(context);
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toEqual(1);
        });
    });

    describe('[getBook] useCase', () => {
        it('Success scenario', async () => {
            const result = await getBook(context, id);
            const matchPath = booksEndpoints.getBook.replace(':id', id);
            expect(result).toEqual(matchPath);
        });

        it('Negative scenario no id', async () => {
            const result = await getBook(context);
            expect(result).toBeNull();
        });
    });

    describe('[getBookWithChapters] useCase', () => {
        it('Success scenario: no params', async () => {
            const result = await getBookWithChapters(context, id);
            const matchPathBookQuery = booksEndpoints.getBook.replace(':id', id);
            const matchPathBookChaptersQuery = booksEndpoints.getBookChapters.replace(':id', id);

            expect(result.book).toEqual(matchPathBookQuery);
            expect(result.bookChapters[0]).toEqual(matchPathBookChaptersQuery);
        });

        it('Success scenario: with params', async () => {
            const result = await getBookWithChapters(context, id, testParams);
            const matchPathBookQuery = booksEndpoints.getBook.replace(':id', id);
            const matchPathBookChaptersQuery = booksEndpoints.getBookChapters.replace(':id', id);

            expect(result.book).toEqual(matchPathBookQuery);
            expect(result.bookChapters[0]).toEqual(matchPathBookChaptersQuery);
            expect(+result.bookChapters[1]).toEqual(paramsEntriesLength);
        });

        it('Negative scenario: no id', async () => {
            const result = await getBookWithChapters(context);
            expect(result).toBeNull();
        });

        it('Negative scenario: query error imitation', async () => {
            const result = await getBookWithChapters(context, id, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getBookWithChaptersTitles] useCase', () => {
        it('Success scenario: no params', async () => {
            const result = await getBookWithChaptersTitles(context, id);

            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('bookName')).toBeTruthy();
            expect(result.chapters).toBeDefined();
            expect(Array.isArray(result.chapters)).toBeTruthy();
            expect(result.chapters.length).toEqual(1);
        });

        it('Negative scenario: no id', async () => {
            const result = await getBookWithChaptersTitles(context);
            expect(result).toBeNull();
        });
    });
});
