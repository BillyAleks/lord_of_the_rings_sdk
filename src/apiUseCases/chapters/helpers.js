/**
 * Combine two arrays of chapters and books, forwarding chapters to be extended
 * @param {Object[]} chapters
 * @param {Object[]} books
 * @returns {Object[]} Array of chapters objects, extended by a book property
 */
function extendChapters(chapters, books) {
    return chapters.map((chapter) => {
        const relatedBook = books.find((book) => book._id === chapter.book);

        return {
            ...chapter,
            book: {
                _id: chapter.book,
                name: relatedBook.name,
            },
        };
    });
}

/**
 * Combine two arrays of chapters and books, forwarding books to be extended
 * @param {Object[]} chapters
 * @param {Object[]} books
 * @returns {Object[]} Array of objects, extended by a book property
 */
function extendBooks(chapters, books) {
    return books.map((book) => {
        const chaptersList = chapters
            .filter((chapter) => book._id === chapter.book)
            .map((chapter) => chapter.chapterName);

        return {
            bookName: book.name,
            chapters: chaptersList,
        };
    });
}

module.exports = {
    extendChapters,
    extendBooks,
};
