const jumpToTest = require('./jumpToTest');
const runTestAtCursor = require('./runTestAtCursor');
const runTestFile = require('./runTestFile');
const runTestFolder = require('./runTestFolder');
const runTestSuite = require('./runTestSuite');

module.exports = [jumpToTest, runTestAtCursor, runTestFile, runTestFolder, runTestSuite];
