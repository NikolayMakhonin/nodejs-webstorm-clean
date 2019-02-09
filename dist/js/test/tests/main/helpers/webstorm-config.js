"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _xml = _interopRequireDefault(require("../../../../main/helpers/xml"));

var _webstormConfig = _interopRequireDefault(require("../../../../main/helpers/webstorm-config"));

describe('helpers > webstorm-config', function () {
  const textXmlPath = _path.default.resolve(__dirname, '../../assets/workspace.xml');

  it('cleanWorkspace', async function () {
    var _config$project, _config$project2, _config$project2$comp, _config$project2$comp2, _config$project3, _config$project3$comp, _config$project4, _config$project4$comp, _config$project4$comp2, _config$project5, _config$project5$comp;

    const config = await _xml.default.loadXml(textXmlPath);
    assert.ok(config);
    assert.ok(config === null || config === void 0 ? void 0 : (_config$project = config.project) === null || _config$project === void 0 ? void 0 : _config$project.component);
    assert.strictEqual(config === null || config === void 0 ? void 0 : (_config$project2 = config.project) === null || _config$project2 === void 0 ? void 0 : (_config$project2$comp = _config$project2.component[0]) === null || _config$project2$comp === void 0 ? void 0 : (_config$project2$comp2 = _config$project2$comp._attributes) === null || _config$project2$comp2 === void 0 ? void 0 : _config$project2$comp2.name, 'ChangeListManager');
    assert.ok(config === null || config === void 0 ? void 0 : (_config$project3 = config.project) === null || _config$project3 === void 0 ? void 0 : (_config$project3$comp = _config$project3.component[0]) === null || _config$project3$comp === void 0 ? void 0 : _config$project3$comp.list);

    _webstormConfig.default.cleanWorkspace(config);

    assert.strictEqual(config === null || config === void 0 ? void 0 : (_config$project4 = config.project) === null || _config$project4 === void 0 ? void 0 : (_config$project4$comp = _config$project4.component[0]) === null || _config$project4$comp === void 0 ? void 0 : (_config$project4$comp2 = _config$project4$comp._attributes) === null || _config$project4$comp2 === void 0 ? void 0 : _config$project4$comp2.name, 'ChangeListManager');
    assert.notOk(config === null || config === void 0 ? void 0 : (_config$project5 = config.project) === null || _config$project5 === void 0 ? void 0 : (_config$project5$comp = _config$project5.component[0]) === null || _config$project5$comp === void 0 ? void 0 : _config$project5$comp.list); // console.log(JSON.stringify(config, null, 4))
  });
  it('cleanIdeaDir', async function () {
    var _config$project6, _ref, _ref$_attributes, _config$project7, _config$project8, _ref2, _config$project9, _config$project10;

    await _webstormConfig.default.cleanIdeaDir(_path.default.dirname(textXmlPath), 'tmp/tests/.idea');
    const config = await _xml.default.loadXml('tmp/tests/.idea/workspace.xml');
    assert.ok(config);
    assert.ok(config === null || config === void 0 ? void 0 : (_config$project6 = config.project) === null || _config$project6 === void 0 ? void 0 : _config$project6.component); // console.log(JSON.stringify(config, null, 4))

    assert.strictEqual((_ref = (config === null || config === void 0 ? void 0 : (_config$project7 = config.project) === null || _config$project7 === void 0 ? void 0 : _config$project7.component[0]) || (config === null || config === void 0 ? void 0 : (_config$project8 = config.project) === null || _config$project8 === void 0 ? void 0 : _config$project8.component)) === null || _ref === void 0 ? void 0 : (_ref$_attributes = _ref._attributes) === null || _ref$_attributes === void 0 ? void 0 : _ref$_attributes.name, 'ChangeListManager');
    assert.notOk((_ref2 = (config === null || config === void 0 ? void 0 : (_config$project9 = config.project) === null || _config$project9 === void 0 ? void 0 : _config$project9.component[0]) || (config === null || config === void 0 ? void 0 : (_config$project10 = config.project) === null || _config$project10 === void 0 ? void 0 : _config$project10.component)) === null || _ref2 === void 0 ? void 0 : _ref2.list);
    await assert.isRejected(_webstormConfig.default.cleanIdeaDir(), Error);
  });
});