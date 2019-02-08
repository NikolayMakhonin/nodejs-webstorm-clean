"use strict";

var _xml = _interopRequireDefault(require("../../../../main/helpers/xml"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('helpers > xml', function () {
  const textXmlPath = _path.default.resolve(__dirname, '../../assets/workspace.xml');

  it('loadFile', async function () {
    const data = await _xml.default.loadFile(textXmlPath);
    assert.strictEqual(data.constructor.name, 'Buffer');
  });
  it('saveFile', async function () {
    const filePath = _path.default.resolve('tmp/tests/test.txt');

    const buffer = Buffer.from('Test', 'utf8');

    if (_fs.default.existsSync(filePath)) {
      _fs.default.unlinkSync(filePath);
    }

    assert.notOk(_fs.default.existsSync(filePath));
    await _xml.default.saveFile(filePath, buffer);
    assert.ok(_fs.default.existsSync(filePath));
  });
  it('loadFileText', async function () {
    const data = await _xml.default.loadFileText(textXmlPath);
    assert.strictEqual(typeof data, 'string');
  });
  it('saveFileText', async function () {
    const filePath = _path.default.resolve('tmp/tests/test.txt');

    const text = 'Test';

    if (_fs.default.existsSync(filePath)) {
      _fs.default.unlinkSync(filePath);
    }

    assert.notOk(_fs.default.existsSync(filePath));
    await _xml.default.saveFileText(filePath, text);
    assert.ok(_fs.default.existsSync(filePath));
  });
  it('save/load file text', async function () {
    const filePath = _path.default.resolve('tmp/tests/test.txt');

    const text = 'Test';

    if (_fs.default.existsSync(filePath)) {
      _fs.default.unlinkSync(filePath);
    }

    assert.notOk(_fs.default.existsSync(filePath));
    await _xml.default.saveFileText(filePath, text);
    assert.ok(_fs.default.existsSync(filePath));
    const loadedText = await _xml.default.loadFileText(filePath);
    assert.strictEqual(loadedText, text);
  });
  const testXml = '<?xml version="1.0" encoding="utf-8"?>' + '<note importance="high" logged="true">' + '<title>Happy</title>' + '<todo>Work</todo>' + '<todo>Play</todo>' + '</note>';
  const testJs = {
    _declaration: {
      _attributes: {
        version: '1.0',
        encoding: 'utf-8'
      }
    },
    note: {
      _attributes: {
        importance: 'high',
        logged: 'true'
      },
      title: {
        _text: 'Happy'
      },
      todo: [{
        _text: 'Work'
      }, {
        _text: 'Play'
      }]
    }
  };
  it('parse xml', function () {
    assert.deepStrictEqual(_xml.default.parseXml(testXml), testJs);
  });
  it('save/load xml', async function () {
    const filePath = _path.default.resolve('tmp/tests/test.xml');

    if (_fs.default.existsSync(filePath)) {
      _fs.default.unlinkSync(filePath);
    }

    assert.notOk(_fs.default.existsSync(filePath));
    await _xml.default.saveXml(filePath, testJs);
    assert.ok(_fs.default.existsSync(filePath));
    const loadedText = await _xml.default.loadFileText(filePath);
    assert.strictEqual(loadedText, testXml);
    const loadedXml = await _xml.default.loadXml(filePath);
    assert.deepStrictEqual(loadedXml, testJs);
  });
});