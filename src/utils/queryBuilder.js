/**
 * Update query string by provided parameters
 * @param {string} initialString
 * @param {Object} params
 * @returns {string}
 */
function queryBuilder(initialString, params = {}) {
    if (!Object.entries(params).length) {
        return initialString;
    }

    const {
        limit,
        offset,
        page,
        sort,
        filter,
    } = params;

    let resultString = `${initialString}?`;

    if (limit) {
        resultString = `${resultString}limit=${limit}`;
    }

    if (offset) {
        resultString = `${resultString}${resultString.endsWith('?') ? '' : '&'}offset=${offset}`;
    }

    if (page) {
        resultString = `${resultString}${resultString.endsWith('?') ? '' : '&'}page=${page}`;
    }

    if (sort && Object.entries(sort).length) {
        Object.entries(sort).forEach(([key, value]) => {
            if (+value === -1 || (typeof value === 'string' && value.toLowerCase().startsWith('desc'))) {
                resultString = `${resultString}${resultString.endsWith('?') ? '' : '&'}sort=${key}:desc`;
            } else {
                resultString = `${resultString}${resultString.endsWith('?') ? '' : '&'}sort=${key}:asc`;
            }
        });
    }

    if (filter && Object.entries(filter).length) {
        Object.entries(filter).forEach(([key, value]) => {
            resultString = `${resultString}${resultString.endsWith('?') ? '' : '&'}${key}${value}`;
        });
    }

    return resultString;
}

/** @module utils/queryBuilder */
module.exports = { queryBuilder };
