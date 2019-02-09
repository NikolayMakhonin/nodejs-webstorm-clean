import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import path from 'path';
import helpersXml from '../../../../main/helpers/xml';
import helpers from '../../../../main/helpers/webstorm-config';
describe('helpers > webstorm-config', function () {
  var textXmlPath = path.resolve(__dirname, '../../assets/workspace.xml');
  it('cleanWorkspace',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var _config$project, _config$project2, _config$project2$comp, _config$project2$comp2, _config$project3, _config$project3$comp, _config$project4, _config$project4$comp, _config$project4$comp2, _config$project5, _config$project5$comp;

    var config;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return helpersXml.loadXml(textXmlPath);

          case 2:
            config = _context.sent;
            assert.ok(config);
            assert.ok(config === null || config === void 0 ? void 0 : (_config$project = config.project) === null || _config$project === void 0 ? void 0 : _config$project.component);
            assert.strictEqual(config === null || config === void 0 ? void 0 : (_config$project2 = config.project) === null || _config$project2 === void 0 ? void 0 : (_config$project2$comp = _config$project2.component[0]) === null || _config$project2$comp === void 0 ? void 0 : (_config$project2$comp2 = _config$project2$comp._attributes) === null || _config$project2$comp2 === void 0 ? void 0 : _config$project2$comp2.name, 'ChangeListManager');
            assert.ok(config === null || config === void 0 ? void 0 : (_config$project3 = config.project) === null || _config$project3 === void 0 ? void 0 : (_config$project3$comp = _config$project3.component[0]) === null || _config$project3$comp === void 0 ? void 0 : _config$project3$comp.list);
            helpers.cleanWorkspace(config);
            assert.strictEqual(config === null || config === void 0 ? void 0 : (_config$project4 = config.project) === null || _config$project4 === void 0 ? void 0 : (_config$project4$comp = _config$project4.component[0]) === null || _config$project4$comp === void 0 ? void 0 : (_config$project4$comp2 = _config$project4$comp._attributes) === null || _config$project4$comp2 === void 0 ? void 0 : _config$project4$comp2.name, 'ChangeListManager');
            assert.notOk(config === null || config === void 0 ? void 0 : (_config$project5 = config.project) === null || _config$project5 === void 0 ? void 0 : (_config$project5$comp = _config$project5.component[0]) === null || _config$project5$comp === void 0 ? void 0 : _config$project5$comp.list); // console.log(JSON.stringify(config, null, 4))

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('cleanIdeaDir',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2() {
    var _config$project6, _ref3, _ref3$_attributes, _config$project7, _config$project8, _ref4, _config$project9, _config$project10;

    var config;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return helpers.cleanIdeaDir(path.dirname(textXmlPath), 'tmp/tests/.idea');

          case 2:
            _context2.next = 4;
            return helpersXml.loadXml('tmp/tests/.idea/workspace.xml');

          case 4:
            config = _context2.sent;
            assert.ok(config);
            assert.ok(config === null || config === void 0 ? void 0 : (_config$project6 = config.project) === null || _config$project6 === void 0 ? void 0 : _config$project6.component); // console.log(JSON.stringify(config, null, 4))

            assert.strictEqual((_ref3 = (config === null || config === void 0 ? void 0 : (_config$project7 = config.project) === null || _config$project7 === void 0 ? void 0 : _config$project7.component[0]) || (config === null || config === void 0 ? void 0 : (_config$project8 = config.project) === null || _config$project8 === void 0 ? void 0 : _config$project8.component)) === null || _ref3 === void 0 ? void 0 : (_ref3$_attributes = _ref3._attributes) === null || _ref3$_attributes === void 0 ? void 0 : _ref3$_attributes.name, 'ChangeListManager');
            assert.notOk((_ref4 = (config === null || config === void 0 ? void 0 : (_config$project9 = config.project) === null || _config$project9 === void 0 ? void 0 : _config$project9.component[0]) || (config === null || config === void 0 ? void 0 : (_config$project10 = config.project) === null || _config$project10 === void 0 ? void 0 : _config$project10.component)) === null || _ref4 === void 0 ? void 0 : _ref4.list);
            _context2.next = 11;
            return assert.isRejected(helpers.cleanIdeaDir(), Error);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
});