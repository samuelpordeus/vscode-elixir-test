const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler(folderUri) {
  test.onTestFolder(folderUri, (folderName) => mix.testWatchPath(folderName));
}

module.exports = {
  name: 'extension.elixirWatchTestFolder',
  handler,
};
