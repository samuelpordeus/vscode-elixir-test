function isWindows(openedFilename) {
  return openedFilename.includes('\\');
}

function isTestFile(openedFilename) {
  return openedFilename.includes('_test.exs');
}

function isUmbrella(openedFilename) {
  return isFolder(openedFilename, 'apps');
}

function isTestFolder(openedFilename) {
  return isFolder(openedFilename, 'test');
}

function isFolder(openedFilename, folderName) {
  if (!isWindows(openedFilename)) {
    return openedFilename.includes(`/${folderName}/`);
  } else {
    return openedFilename.includes(`\\${folderName}\\`);
  }
}

function getTestPathFilter(isUmbrella, isWindows) {
  if (!isWindows) {
    return isUmbrella ? /.*\/(apps\/.*)$/ : /.*\/(test\/.*)$/;
  } else {
    return isUmbrella ? /.*\\(apps\\.*)$/ : /.*\\(test\\.*)$/;
  }
}

module.exports = {
  isWindows,
  isTestFile,
  isUmbrella,
  isTestFolder,
  getTestPathFilter,
};
