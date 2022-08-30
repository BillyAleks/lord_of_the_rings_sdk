/**
 * Initialize logger instance
 * @param {Boolean} loggerEnabled is logging requested
 * @returns {function} logger function
 */
function initializeLogger(loggerEnabled) {
    let logger = () => {
        // empty function
    };

    if (!loggerEnabled) {
        return logger;
    }

    const events = {
        useCase: 'useCase',
        request: 'request',
    };

    const title = 'Lord Of The Rings SDK Logger';

    function getLoggerTitle() {
        const now = new Date();
        const date = now.toLocaleDateString().split('/').join('-');
        const time = now.toLocaleTimeString();
        return `[${date} ${time} | ${title}]: `;
    }

    logger = (logObject) => {
        const { placement, method, error, payload } = logObject;
        let message = '';

        if (error) {
            message = `${getLoggerTitle()}ERROR: ${error.message}\nPayload:\n${JSON.stringify(payload)}`;
        } else {
            switch (placement) {
                case events.useCase:
                    message = `${getLoggerTitle()} ${method} has been called. Waiting for API response...`;
                    break;
                case events.request:
                    message = `${getLoggerTitle()}${method === 'resolve' ? 'Data has been successfully retrieved' : 'API call has failed'}`;
                    break;
                default:
            }
        }
        console.log(message);
    };

    console.log(`${getLoggerTitle()}logger has been successfully launched`);
    return logger;
}

/** @module utils/logger */
module.exports = { initializeLogger };
