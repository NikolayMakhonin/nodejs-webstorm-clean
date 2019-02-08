"use strict";

var _main = _interopRequireDefault(require("../../../main/main"));

var _mockCli = _interopRequireDefault(require("mock-cli"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('main', function () {
  let mockCliDispose;
  before(function () {
    mockCliDispose = (0, _mockCli.default)(['node', 'index.js'], {
      stdin: undefined,
      // Hook up a fake input stream
      stdout: process.stdout,
      // Display the captured output in the main console
      stderr: process.stderr // Display the captured error output in the main console

    }, (error, result) => {
      assert.notOk(error);
      const exitCode = result.code; // Process exit code

      assert.strictEqual(exitCode, 0);
    });
  });
  after(function () {
    mockCliDispose();
  });
  it('main', function () {
    _main.default.main('-x 4 -y 5');
  });
});