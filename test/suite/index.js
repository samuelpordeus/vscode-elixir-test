const path = require('path');
const Mocha = require('mocha');
const glob = require('glob');

function run() {
  // Create the mocha test
  const mocha = new Mocha({
    ui: 'tdd',
  });
  // Use any mocha API
  mocha.useColors(true);

  const testsRoot = path.resolve(__dirname, '..');

  return new Promise((c, e) => {
    glob('**/**.test.js', { cwd: testsRoot }, (err, files) => {
      if (err) {
        return e(err);
      }

      // Add files to the test suite
      files.forEach((f) => mocha.addFile(path.resolve(testsRoot, f)));

      try {
        // Run the mocha test
        mocha.run((failures) => {
          if (failures > 0) {
            e(new Error(`${failures} tests failed.`));
          } else {
            c();
          }
        });
      } catch (error) {
        return e(error);
      }
      return 0;
    });
  });
}

module.exports = {
  run,
};
