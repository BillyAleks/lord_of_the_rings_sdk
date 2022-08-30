const { initializeSDK } = require('../libs/testUtils.js');
const { defaultPaginationStates } = require('../libs/testConfig.js');

describe('Test books endpoints availability and response changes', () => {
    let sdk;
    let bookId;

    beforeAll(() => {
        sdk = initializeSDK();
    });

    // eslint-disable-next-line arrow-body-style
    afterAll(() => {
        // to disable further https request hanging jest execution;
        // eslint-disable-next-line no-useless-return
        return;
    });

    describe('[getBookList]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.books.getBookList();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { books, paginationInfo } = result;
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBeTruthy();
            expect(books.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const bookSample = books[0];
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');
            expect(bookSample.name).toBeDefined();
            expect(typeof bookSample.name).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            bookId = bookSample._id;
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };

            const result = await sdk.books.getBookList(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { books, paginationInfo } = result;
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBeTruthy();
            expect(books.length).toEqual(params.limit);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const bookSample = books[0];
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };

            const result = await sdk.books.getBookList(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { books, paginationInfo } = result;
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBeTruthy();
            expect(books.length).toEqual(params.limit);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const bookSample = books[0];
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);
        });
    });

    describe('[searchBooksByName]: test suits', () => {
        const searchInput = 'the';

        it('[Success scenario] no params', async () => {
            const result = await sdk.books.searchBooksByName(searchInput);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { books, paginationInfo } = result;
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBeTruthy();
            expect(books.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const bookSample = books[0];
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            books.forEach((book) => {
                const bookNameLowerCased = book.name.toLowerCase();
                const matchIndex = bookNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Negative scenario] not found', async () => {
            const result = await sdk.books.searchBooksByName('qwerty');
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { books, paginationInfo } = result;
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBeTruthy();
            expect(books.length).toEqual(0);
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
            const result = await sdk.books.searchBooksByName(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { books, paginationInfo } = result;
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBeTruthy();
            expect(books.length).toEqual(params.limit);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const bookSample = books[0];
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();

            books.forEach((book) => {
                const bookNameLowerCased = book.name.toLowerCase();
                const matchIndex = bookNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };
            const result = await sdk.books.searchBooksByName(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { books, paginationInfo } = result;
            expect(books).toBeDefined();
            expect(Array.isArray(books)).toBeTruthy();
            expect(books.length).toEqual(params.limit);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const bookSample = books[0];
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');
            expect(bookSample._id).toBeDefined();
            expect(typeof bookSample._id).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);

            books.forEach((book) => {
                const bookNameLowerCased = book.name.toLowerCase();
                const matchIndex = bookNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });
    });

    describe('[getBookTitles]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.books.getBookTitles();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toBeGreaterThan(0);

            result.forEach((bookTitle) => {
                expect(typeof bookTitle).toEqual('string');
            });
        });
    });

    describe('[getBook]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.books.getBook(bookId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result._id).toEqual(bookId);
            expect(result.name).toBeDefined();
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.books.getBook();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.books.getBook('0392a');
            expect(result).toBeNull();
        });
    });

    describe('[getBookWithChapters]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.books.getBookWithChapters(bookId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { book, bookChapters, paginationInfo } = result;
            expect(book).toBeDefined();
            expect(book._id).toEqual(bookId);
            expect(book.name).toBeDefined();

            expect(bookChapters).toBeDefined();
            expect(Array.isArray(bookChapters)).toBeTruthy();
            expect(bookChapters.length).toBeGreaterThan(0);

            const chapterSample = bookChapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');

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
            const result = await sdk.books.getBookWithChapters(bookId, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { book, bookChapters, paginationInfo } = result;
            expect(book).toBeDefined();
            expect(book._id).toEqual(bookId);
            expect(book.name).toBeDefined();

            expect(bookChapters).toBeDefined();
            expect(Array.isArray(bookChapters)).toBeTruthy();
            expect(bookChapters.length).toBeGreaterThan(0);

            const chapterSample = bookChapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');

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
            const result = await sdk.books.getBookWithChapters(bookId, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { book, bookChapters, paginationInfo } = result;
            expect(book).toBeDefined();
            expect(book._id).toEqual(bookId);
            expect(book.name).toBeDefined();

            expect(bookChapters).toBeDefined();
            expect(Array.isArray(bookChapters)).toBeTruthy();
            expect(bookChapters.length).toBeGreaterThan(0);

            const chapterSample = bookChapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');

            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');
            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.page).toEqual(params.page);
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.offset).not.toBeDefined();
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.books.getBookWithChapters();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.books.getBookWithChapters('abcd');
            expect(result).toBeNull();
        });
    });

    describe('[getBookWithChaptersTitles]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.books.getBookWithChaptersTitles(bookId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { bookName, chapters } = result;
            expect(bookName).toBeDefined();
            expect(typeof bookName).toEqual('string');

            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toBeGreaterThan(0);

            chapters.forEach((chapter) => {
                expect(typeof chapter).toEqual('string');
            });
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.books.getBookWithChaptersTitles();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.books.getBookWithChaptersTitles('abcd');
            expect(result).toBeNull();
        });
    });
});
