import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import main from '../../../main/main';
import path from 'path';
import fse from 'fs-extra';
import mockCli from 'mock-cli';
import helpersXml from '../../../main/helpers/xml';
describe('main', function () {
  var inputDir = path.resolve(__dirname, '../assets');
  var outputDir = path.resolve('tmp/tests/.idea');
  var mockCliDispose;
  before(function () {
    mockCliDispose = mockCli(['node', 'index.js'], {
      stdin: undefined,
      // Hook up a fake input stream
      stdout: process.stdout,
      // Display the captured output in the main console
      stderr: process.stderr // Display the captured error output in the main console

    }, function (error, result) {
      assert.notOk(error);
      var exitCode = result.code; // Process exit code

      assert.strictEqual(exitCode, 0);
    });
  });
  after(function () {
    mockCliDispose();
  }); // it('help', async function () {
  // 	await main.main('--help')
  // })

  it('parseArgs',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var args;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return main.parseArgs("\"".concat(inputDir, "\" -o \"").concat(outputDir, "\""));

          case 2:
            args = _context.sent;
            console.log(JSON.stringify(args, null, 4));
            assert.strictEqual(args.input, inputDir);
            assert.strictEqual(args.o, outputDir);
            assert.strictEqual(args.output, outputDir);
            _context.next = 9;
            return main.parseArgs("\"".concat(inputDir, "\""));

          case 9:
            args = _context.sent;
            assert.strictEqual(args.input, inputDir);
            assert.strictEqual(args.o, undefined);
            assert.strictEqual(args.output, undefined);
            _context.next = 15;
            return main.parseArgs("-o \"".concat(outputDir, "\""));

          case 15:
            args = _context.sent;
            assert.strictEqual(args.input, '.idea');
            assert.strictEqual(args.o, outputDir);
            assert.strictEqual(args.output, outputDir);
            _context.next = 21;
            return main.parseArgs('');

          case 21:
            args = _context.sent;
            assert.strictEqual(args.input, '.idea');
            assert.strictEqual(args.o, undefined);
            assert.strictEqual(args.output, undefined);

          case 25:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('clean',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2() {
    var _config, _config$project, _config2, _config2$project, _config2$project$comp, _config2$project$comp2, _config3, _config3$project, _ref3, _ref3$_attributes, _config4, _config4$project, _config5, _config5$project;

    var config;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return fse.pathExists(outputDir);

          case 2:
            if (!_context2.sent) {
              _context2.next = 5;
              break;
            }

            _context2.next = 5;
            return fse.remove(outputDir);

          case 5:
            _context2.next = 7;
            return helpersXml.loadXml(path.resolve(inputDir, 'workspace.xml'));

          case 7:
            config = _context2.sent;
            assert.ok(config);
            assert.ok((_config = config) === null || _config === void 0 ? void 0 : (_config$project = _config.project) === null || _config$project === void 0 ? void 0 : _config$project.component);
            assert.strictEqual((_config2 = config) === null || _config2 === void 0 ? void 0 : (_config2$project = _config2.project) === null || _config2$project === void 0 ? void 0 : (_config2$project$comp = _config2$project.component[0]) === null || _config2$project$comp === void 0 ? void 0 : (_config2$project$comp2 = _config2$project$comp._attributes) === null || _config2$project$comp2 === void 0 ? void 0 : _config2$project$comp2.name, 'ChangeListManager');
            _context2.next = 13;
            return main.clean("\"".concat(inputDir, "\" -o \"").concat(outputDir, "\""));

          case 13:
            _context2.next = 15;
            return helpersXml.loadXml(path.resolve(outputDir, 'workspace.xml'));

          case 15:
            config = _context2.sent;
            assert.ok(config);
            assert.ok((_config3 = config) === null || _config3 === void 0 ? void 0 : (_config3$project = _config3.project) === null || _config3$project === void 0 ? void 0 : _config3$project.component);
            assert.strictEqual((_ref3 = ((_config4 = config) === null || _config4 === void 0 ? void 0 : (_config4$project = _config4.project) === null || _config4$project === void 0 ? void 0 : _config4$project.component[0]) || ((_config5 = config) === null || _config5 === void 0 ? void 0 : (_config5$project = _config5.project) === null || _config5$project === void 0 ? void 0 : _config5$project.component)) === null || _ref3 === void 0 ? void 0 : (_ref3$_attributes = _ref3._attributes) === null || _ref3$_attributes === void 0 ? void 0 : _ref3$_attributes.name, 'PropertiesComponent');

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
});