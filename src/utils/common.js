/**
 * Decompose API response to processable views
 * @param {Object} data API response object
 * @param {string?} dataKey optional parameter for wrapping result under specific key
 * @returns {Object[] | Object} API data array, can be returned as Object with paginationInfo if dataKey provided
 */
function serializeApiResponse(data, dataKey = null) {
    if (!data || !data.docs) {
        return [];
    }

    const { docs, ...paginationInfo } = data;

    if (!dataKey) {
        return docs;
    }

    return { [dataKey]: docs, paginationInfo };
}

/**
 * Validate id parameter exists
 * @param {string} id entity ID
 */
function validateRequest(id) {
    if (!id) {
        throw new Error('Id was not specified. Try to use another query to get a complete entity response first.');
    }
}

/** @module utils/common */
module.exports = { serializeApiResponse, validateRequest };
