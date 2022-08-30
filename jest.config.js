const { join } = require('path');

const ROOT = `${process.cwd()}`;
const { MODE } = process.env;
const JEST_ENV = join(ROOT, 'test');
const configs = {
    verbose: true,
    automock: false,
    testMatch: [join(JEST_ENV, `/${MODE}/*.test.js`)],
    testEnvironment: 'node',
    transform: {},
};

module.exports = configs;
