/**
 * GET all existing chapters from LoR API
 * @param {Object} context
 * @param {Object} queryParams
 * @returns {Promise<Object>}
 */
async function getChapters(context, queryParams) {
    const { fetch, utils, config } = context;
    const { queryBuilder } = utils;

    const path = config.externalEndpoints.chapters.getAllBooksChapters;
    const queryString = queryBuilder(path, queryParams);

    return fetch(queryString);
}

/**
 * GET specific chapter by id
 * @param {Object} context
 * @param {string} id chapter ID
 * @returns {Promise<Object>}
 */
async function getChapterById(context, id) {
    const { fetch, config } = context;
    const path = config.externalEndpoints.chapters.getChapter.replace(':id', id);

    return fetch(path);
}

/** @module interfaces/chapters API interfaces for chapters entities retrieval */
module.exports = {
    getChapters,
    getChapterById,
};
