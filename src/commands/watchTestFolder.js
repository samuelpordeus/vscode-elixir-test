const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler(context, folderUri) {
  test.onTestFolder(context, folderUri, (folderName) => mix.testWatchPath(folderName));
}

module.exports = {
  name: 'extension.elixirWatchTestFolder',
  handler,
};
