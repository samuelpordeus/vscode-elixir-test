const jumpToTest = require('./jumpToTest');
const runTestAtCursor = require('./runTestAtCursor');
const runTestFile = require('./runTestFile');
const runTestFolder = require('./runTestFolder');
const runTestSuite = require('./runTestSuite');
const runFailedTests = require('./runFailedTests');
const runStaleTests = require('./runStaleTests');
const watchTestFile = require('./watchTestFile');
const watchTestFolder = require('./watchTestFolder');
const watchTestAtCursor = require('./watchTestAtCursor');
const watchTestSuite = require('./watchTestSuite');

module.exports = [
  jumpToTest,
  runTestAtCursor,
  runTestFile,
  runTestFolder,
  runTestSuite,
  runFailedTests,
  runStaleTests,
  watchTestFile,
  watchTestFolder,
  watchTestAtCursor,
  watchTestSuite,
];
