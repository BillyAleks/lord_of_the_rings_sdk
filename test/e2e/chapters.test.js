const { initializeSDK } = require('../libs/testUtils.js');
const { defaultPaginationStates } = require('../libs/testConfig.js');

describe('Test books endpoints availability and response changes', () => {
    let sdk;
    let chapterId;

    beforeAll(() => {
        sdk = initializeSDK();
    });

    // eslint-disable-next-line arrow-body-style
    afterAll(() => {
        // to disable further https request hanging jest execution;
        // eslint-disable-next-line no-useless-return
        return;
    });

    describe('[getAllChapters]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.chapters.getAllChapters();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { chapters, paginationInfo } = result;
            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const chapterSample = chapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');
            expect(chapterSample.book).toBeDefined();
            expect(typeof chapterSample.book).toEqual('object');
            expect(chapterSample.book._id).toBeDefined();
            expect(chapterSample.book.name).toBeDefined();

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            chapterId = chapterSample._id;
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };

            const result = await sdk.chapters.getAllChapters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { chapters, paginationInfo } = result;
            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toEqual(params.limit);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const chapterSample = chapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');
            expect(chapterSample.book).toBeDefined();
            expect(typeof chapterSample.book).toEqual('object');
            expect(chapterSample.book._id).toBeDefined();
            expect(chapterSample.book.name).toBeDefined();

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };

            const result = await sdk.chapters.getAllChapters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { chapters, paginationInfo } = result;
            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toEqual(params.limit);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const chapterSample = chapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');
            expect(chapterSample.book).toBeDefined();
            expect(typeof chapterSample.book).toEqual('object');
            expect(chapterSample.book._id).toBeDefined();
            expect(chapterSample.book.name).toBeDefined();

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);
        });
    });

    describe('[searchChaptersByName]: test suits', () => {
        const searchInput = 'on';

        it('[Success scenario] no params', async () => {
            const result = await sdk.chapters.searchChaptersByName(searchInput);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { chapters, paginationInfo } = result;
            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const chapterSample = chapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');
            expect(chapterSample.book).toBeDefined();
            expect(typeof chapterSample.book).toEqual('object');
            expect(chapterSample.book._id).toBeDefined();
            expect(chapterSample.book.name).toBeDefined();

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            chapters.forEach((chapter) => {
                const chapterNameLowerCased = chapter.chapterName.toLowerCase();
                const matchIndex = chapterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Negative scenario] not found', async () => {
            const result = await sdk.chapters.searchChaptersByName('qwerty');

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { chapters, paginationInfo } = result;
            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toEqual(0);
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
            const result = await sdk.chapters.searchChaptersByName(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { chapters, paginationInfo } = result;
            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const chapterSample = chapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');
            expect(chapterSample.book).toBeDefined();
            expect(typeof chapterSample.book).toEqual('object');
            expect(chapterSample.book._id).toBeDefined();
            expect(chapterSample.book.name).toBeDefined();

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();

            chapters.forEach((chapter) => {
                const chapterNameLowerCased = chapter.chapterName.toLowerCase();
                const matchIndex = chapterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };
            const result = await sdk.chapters.searchChaptersByName(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { chapters, paginationInfo } = result;
            expect(chapters).toBeDefined();
            expect(Array.isArray(chapters)).toBeTruthy();
            expect(chapters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const chapterSample = chapters[0];
            expect(chapterSample._id).toBeDefined();
            expect(typeof chapterSample._id).toEqual('string');
            expect(chapterSample.chapterName).toBeDefined();
            expect(typeof chapterSample.chapterName).toEqual('string');
            expect(chapterSample.book).toBeDefined();
            expect(typeof chapterSample.book).toEqual('object');
            expect(chapterSample.book._id).toBeDefined();
            expect(chapterSample.book.name).toBeDefined();

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);

            chapters.forEach((chapter) => {
                const chapterNameLowerCased = chapter.chapterName.toLowerCase();
                const matchIndex = chapterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });
    });

    describe('[getAllBooksWithChapters]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.chapters.getAllBooksWithChapters();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toBeGreaterThan(0);

            const bookSample = result[0];
            expect(bookSample.bookName).toBeDefined();
            expect(typeof bookSample.bookName).toEqual('string');
            expect(bookSample.chapters).toBeDefined();
            expect(Array.isArray(bookSample.chapters)).toBeTruthy();
            expect(bookSample.chapters.length).toBeGreaterThan(0);

            bookSample.chapters.forEach((chapter) => {
                expect(typeof chapter).toEqual('string');
            });
        });
    });

    describe('[getChapter]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.chapters.getChapter(chapterId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result._id).toBeDefined();
            expect(typeof result._id).toEqual('string');
            expect(result.chapterName).toBeDefined();
            expect(typeof result.chapterName).toEqual('string');
            expect(result.book).toBeDefined();
            expect(typeof result.book).toEqual('object');
            expect(result.book._id).toBeDefined();
            expect(result.book.name).toBeDefined();
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.chapters.getChapter();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.chapters.getChapter('987b');
            expect(result).toBeNull();
        });
    });
});
