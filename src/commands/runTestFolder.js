const test = require('../helpers/test');
const mix = require('../helpers/mix');

function handler(context, folderUri) {
  test.onTestFolder(context, folderUri, (folder) => mix.testPath(folder));
}

module.exports = {
  name: 'extension.elixirRunTestFolder',
  handler,
};
