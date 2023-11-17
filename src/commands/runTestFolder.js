const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler(folderUri) {
  test.onTestFolder(folderUri, (folder) => mix.testPath(folder));
}

module.exports = {
  name: 'extension.elixirRunTestFolder',
  handler,
};
