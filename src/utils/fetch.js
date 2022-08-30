const https = require('https');

/**
 * Define fetch initializer to manage direct usage to Lord Of The Rings API
 * Note: this function is based on closure. Some functions may not be available by a direct call
 *
 * @param {Object }headers object related query headers that should be sent with a request.
 * @param {function} log function for logging a system
 * @param {Object} config
 * @returns { function } fetch init function. It's carrying a function for direct GET-requests to API
 */
function initializeFetch(headers, log, cache, { host }) {
    /**
    * @param {string} path API endpoint
    * @returns {Object} https options object
    */
    function prepareOptions(path) {
        return {
            hostname: host,
            path: `/v2/${path}`,
            method: 'GET',
            headers,
            timeout: 3000,
        };
    }

    return {
        /**
        * GET request function used with builtin https module
        * @param {string} path external service routing parameter
        * @returns {Promise<Object>} resolves with success response or rejects with an error object
        */
        apiGet(path) {
            const cachedResult = cache.getCache(path);

            if (cachedResult) {
                return cachedResult;
            }

            const options = prepareOptions(path);

            return new Promise((resolve, reject) => {
                const req = https.request(options, (res) => {
                    let receivedData = '';

                    res.on('data', (data) => {
                        const dataJSON = data.toString();
                        receivedData += dataJSON;
                    });

                    res.on('end', () => {
                        try {
                            const dataObject = JSON.parse(receivedData);

                            if (dataObject.success === false) {
                                log({ placement: 'request', method: 'reject' });
                                reject(dataObject.message);
                            }

                            log({ placement: 'request', method: 'resolve' });
                            resolve(dataObject);
                        } catch (error) {
                            log({ placement: 'request', method: 'reject' });
                            reject(error);
                        }
                    });
                });

                req.on('timeout', () => {
                    reject(new Error('REQUEST_TIMEOUT'));
                });

                req.on('error', (error) => {
                    reject(error);
                });

                req.end();
            });
        },
    };
}

/** @module utils/fetch */
module.exports = { initializeFetch };
