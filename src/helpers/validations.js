function isWindows(openedFilename) {
  return openedFilename.includes('\\');
}

const isFolder = (openedFilename, folderName) => {
  if (!isWindows(openedFilename)) {
    return openedFilename.includes(`/${folderName}/`);
  }
  return openedFilename.includes(`\\${folderName}\\`);
};

function isTestFile(openedFilename) {
  return openedFilename.includes('_test.exs');
}

function isUmbrella(openedFilename) {
  return isFolder(openedFilename, 'apps');
}

function isTestFolder(openedFilename) {
  return isFolder(openedFilename, 'test');
}


function getTestPathFilter(checkIsUmbrella, checkIsWindows) {
  if (!checkIsWindows) {
    return checkIsUmbrella ? /.*\/(apps\/.*)$/ : /.*\/(test\/.*)$/;
  }
  return checkIsUmbrella ? /.*\\(apps\\.*)$/ : /.*\\(test\\.*)$/;
}

module.exports = {
  isWindows,
  isTestFile,
  isUmbrella,
  isTestFolder,
  getTestPathFilter,
};
