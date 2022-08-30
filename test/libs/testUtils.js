const { LordOfTheRingsSdk } = require('../../index.js');
const { apiKey, cacheTime, loggerEnabled, externalEndpoints } = require('./testConfig.js');

/**
 * Initialization of SDK function
 * @returns instance of main SDK function
 */
function initializeSDK() {
    const sdk = LordOfTheRingsSdk(apiKey, { cacheTime, loggerEnabled });
    return sdk;
}

/**
 * Initialize mock context object for unit tests
 * @returns {Object} context
 */
function mockContext() {
    const fetch = (path) => path;
    const config = { externalEndpoints };
    const log = () => null;
    const utils = {
        queryBuilder: (path, params) => {
            if (params && params.throwError) { // it's a fake param to trigger error action
                throw new Error('ERROR_TEST');
            }

            return `${path}${params ? `_${Object.entries(params).length}` : ''}`;
        },
        serializeApiResponse: (testResult, dataKey) => {
            const result = testResult.split('_');
            return dataKey ? { [dataKey]: result } : result;
        },
        validateRequest: (id) => {
            if (!id) {
                throw new Error('ERROR_TEST');
            }
        },
    };

    return { fetch, utils, config, log };
}

/** @module tests/utils */
module.exports = { initializeSDK, mockContext };
