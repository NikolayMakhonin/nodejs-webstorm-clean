"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _path = _interopRequireDefault(require("path"));

var _xml = _interopRequireDefault(require("../../../../main/helpers/xml"));

var _webstormConfig = _interopRequireDefault(require("../../../../main/helpers/webstorm-config"));

describe('helpers > webstorm-config', function () {
  const textXmlPath = _path.default.resolve(__dirname, '../../assets/workspace.xml');

  it('cleanWorkspace', async function () {
    var _config$project, _config$project2, _config$project2$comp, _config$project2$comp2, _config$project3, _config$project3$comp, _config$project3$comp2;

    const config = await _xml.default.loadXml(textXmlPath);
    assert.ok(config);
    assert.ok(config === null || config === void 0 ? void 0 : (_config$project = config.project) === null || _config$project === void 0 ? void 0 : _config$project.component);
    assert.strictEqual(config === null || config === void 0 ? void 0 : (_config$project2 = config.project) === null || _config$project2 === void 0 ? void 0 : (_config$project2$comp = _config$project2.component[0]) === null || _config$project2$comp === void 0 ? void 0 : (_config$project2$comp2 = _config$project2$comp._attributes) === null || _config$project2$comp2 === void 0 ? void 0 : _config$project2$comp2.name, 'ChangeListManager');

    _webstormConfig.default.cleanWorkspace(config);

    assert.strictEqual(config === null || config === void 0 ? void 0 : (_config$project3 = config.project) === null || _config$project3 === void 0 ? void 0 : (_config$project3$comp = _config$project3.component[0]) === null || _config$project3$comp === void 0 ? void 0 : (_config$project3$comp2 = _config$project3$comp._attributes) === null || _config$project3$comp2 === void 0 ? void 0 : _config$project3$comp2.name, 'PropertiesComponent'); // console.log(JSON.stringify(config, null, 4))
  });
  it('cleanIdeaDir', async function () {
    var _config$project4, _ref, _ref$_attributes, _config$project5, _config$project6;

    await _webstormConfig.default.cleanIdeaDir(_path.default.dirname(textXmlPath), 'tmp/tests/.idea');
    const config = await _xml.default.loadXml('tmp/tests/.idea/workspace.xml');
    assert.ok(config);
    assert.ok(config === null || config === void 0 ? void 0 : (_config$project4 = config.project) === null || _config$project4 === void 0 ? void 0 : _config$project4.component); // console.log(JSON.stringify(config, null, 4))

    assert.strictEqual((_ref = (config === null || config === void 0 ? void 0 : (_config$project5 = config.project) === null || _config$project5 === void 0 ? void 0 : _config$project5.component[0]) || (config === null || config === void 0 ? void 0 : (_config$project6 = config.project) === null || _config$project6 === void 0 ? void 0 : _config$project6.component)) === null || _ref === void 0 ? void 0 : (_ref$_attributes = _ref._attributes) === null || _ref$_attributes === void 0 ? void 0 : _ref$_attributes.name, 'PropertiesComponent');
    await assert.isRejected(_webstormConfig.default.cleanIdeaDir(), Error);
  });
});