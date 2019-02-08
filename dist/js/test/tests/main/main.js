"use strict";

var _main = _interopRequireDefault(require("../../../main/main"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _mockCli = _interopRequireDefault(require("mock-cli"));

var _xml = _interopRequireDefault(require("../../../main/helpers/xml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('main', function () {
  const inputDir = _path.default.resolve(__dirname, '../assets');

  const outputDir = _path.default.resolve('tmp/tests/.idea');

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
  }); // it('help', async function () {
  // 	await main.main('--help')
  // })

  it('parseArgs', async function () {
    // console.log(JSON.stringify(process.argv, null, 4))
    let args = await _main.default.parseArgs(`"${inputDir}" -o "${outputDir}"`);
    console.log(JSON.stringify(args, null, 4));
    assert.strictEqual(args.input, inputDir);
    assert.strictEqual(args.o, outputDir);
    assert.strictEqual(args.output, outputDir);
    args = await _main.default.parseArgs(`"${inputDir}"`);
    assert.strictEqual(args.input, inputDir);
    assert.strictEqual(args.o, undefined);
    assert.strictEqual(args.output, undefined);
    args = await _main.default.parseArgs(`-o "${outputDir}"`);
    assert.strictEqual(args.input, '.idea');
    assert.strictEqual(args.o, outputDir);
    assert.strictEqual(args.output, outputDir);
    args = await _main.default.parseArgs('');
    assert.strictEqual(args.input, '.idea');
    assert.strictEqual(args.o, undefined);
    assert.strictEqual(args.output, undefined);
  });
  it('clean', async function () {
    var _config, _config$project, _config2, _config2$project, _config2$project$comp, _config2$project$comp2, _config3, _config3$project, _ref, _ref$_attributes, _config4, _config4$project, _config5, _config5$project;

    if (await _fsExtra.default.pathExists(outputDir)) {
      await _fsExtra.default.remove(outputDir);
    }

    let config = await _xml.default.loadXml(_path.default.resolve(inputDir, 'workspace.xml'));
    assert.ok(config);
    assert.ok((_config = config) === null || _config === void 0 ? void 0 : (_config$project = _config.project) === null || _config$project === void 0 ? void 0 : _config$project.component);
    assert.strictEqual((_config2 = config) === null || _config2 === void 0 ? void 0 : (_config2$project = _config2.project) === null || _config2$project === void 0 ? void 0 : (_config2$project$comp = _config2$project.component[0]) === null || _config2$project$comp === void 0 ? void 0 : (_config2$project$comp2 = _config2$project$comp._attributes) === null || _config2$project$comp2 === void 0 ? void 0 : _config2$project$comp2.name, 'ChangeListManager');
    await _main.default.clean(`"${inputDir}" -o "${outputDir}"`);
    config = await _xml.default.loadXml(_path.default.resolve(outputDir, 'workspace.xml'));
    assert.ok(config);
    assert.ok((_config3 = config) === null || _config3 === void 0 ? void 0 : (_config3$project = _config3.project) === null || _config3$project === void 0 ? void 0 : _config3$project.component);
    assert.strictEqual((_ref = ((_config4 = config) === null || _config4 === void 0 ? void 0 : (_config4$project = _config4.project) === null || _config4$project === void 0 ? void 0 : _config4$project.component[0]) || ((_config5 = config) === null || _config5 === void 0 ? void 0 : (_config5$project = _config5.project) === null || _config5$project === void 0 ? void 0 : _config5$project.component)) === null || _ref === void 0 ? void 0 : (_ref$_attributes = _ref._attributes) === null || _ref$_attributes === void 0 ? void 0 : _ref$_attributes.name, 'PropertiesComponent');
  });
});