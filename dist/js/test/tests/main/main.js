"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _main = _interopRequireDefault(require("../../../main/main"));

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _mockCli = _interopRequireDefault(require("mock-cli"));

var _xml = _interopRequireDefault(require("../../../main/helpers/xml"));

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
    var _config, _config$project, _config2, _config2$project, _config2$project$comp, _config2$project$comp2, _ref, _config3, _config3$project, _config4, _config4$project, _config5, _config5$project, _ref2, _ref2$_attributes, _config6, _config6$project, _config7, _config7$project, _ref3, _config8, _config8$project, _config9, _config9$project;

    if (await _fsExtra.default.pathExists(outputDir)) {
      await _fsExtra.default.remove(outputDir);
    }

    let config = await _xml.default.loadXml(_path.default.resolve(inputDir, 'workspace.xml'));
    assert.ok(config);
    assert.ok((_config = config) === null || _config === void 0 ? void 0 : (_config$project = _config.project) === null || _config$project === void 0 ? void 0 : _config$project.component);
    assert.strictEqual((_config2 = config) === null || _config2 === void 0 ? void 0 : (_config2$project = _config2.project) === null || _config2$project === void 0 ? void 0 : (_config2$project$comp = _config2$project.component[0]) === null || _config2$project$comp === void 0 ? void 0 : (_config2$project$comp2 = _config2$project$comp._attributes) === null || _config2$project$comp2 === void 0 ? void 0 : _config2$project$comp2.name, 'ChangeListManager');
    assert.ok((_ref = ((_config3 = config) === null || _config3 === void 0 ? void 0 : (_config3$project = _config3.project) === null || _config3$project === void 0 ? void 0 : _config3$project.component[0]) || ((_config4 = config) === null || _config4 === void 0 ? void 0 : (_config4$project = _config4.project) === null || _config4$project === void 0 ? void 0 : _config4$project.component)) === null || _ref === void 0 ? void 0 : _ref.list);
    await _main.default.clean(`"${inputDir}" -o "${outputDir}"`);
    config = await _xml.default.loadXml(_path.default.resolve(outputDir, 'workspace.xml'));
    assert.ok(config);
    assert.ok((_config5 = config) === null || _config5 === void 0 ? void 0 : (_config5$project = _config5.project) === null || _config5$project === void 0 ? void 0 : _config5$project.component);
    assert.strictEqual((_ref2 = ((_config6 = config) === null || _config6 === void 0 ? void 0 : (_config6$project = _config6.project) === null || _config6$project === void 0 ? void 0 : _config6$project.component[0]) || ((_config7 = config) === null || _config7 === void 0 ? void 0 : (_config7$project = _config7.project) === null || _config7$project === void 0 ? void 0 : _config7$project.component)) === null || _ref2 === void 0 ? void 0 : (_ref2$_attributes = _ref2._attributes) === null || _ref2$_attributes === void 0 ? void 0 : _ref2$_attributes.name, 'ChangeListManager');
    assert.notOk((_ref3 = ((_config8 = config) === null || _config8 === void 0 ? void 0 : (_config8$project = _config8.project) === null || _config8$project === void 0 ? void 0 : _config8$project.component[0]) || ((_config9 = config) === null || _config9 === void 0 ? void 0 : (_config9$project = _config9.project) === null || _config9$project === void 0 ? void 0 : _config9$project.component)) === null || _ref3 === void 0 ? void 0 : _ref3.list);
  });
});