/**
 * Initialize in RAM cache with a self-prune
 * @param {number} keepAliveTime time the cache should be stored in milliseconds
 * @returns {Object} object carrying functions setCache and getCache
 */
function initializeCache(keepAliveTime) {
    const doNothing = () => {
        // empty function
    };

    if (!keepAliveTime) {
        return {
            setCache: doNothing,
            getCache: doNothing,
        };
    }

    const ramCache = new Map();

    function setCache(key, value) {
        ramCache.set(key, value);

        setTimeout(() => {
            ramCache.delete(key);
        }, keepAliveTime);
    }

    function getCache(key) {
        return ramCache.get(key);
    }

    return { setCache, getCache };
}

/** @module utils/cache */
module.exports = { initializeCache };
