import _typeof from "@babel/runtime/helpers/typeof";
import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import helpers from '../../../../main/helpers/xml';
import path from 'path';
import fs from 'fs';
describe('helpers > xml', function () {
  var textXmlPath = path.resolve(__dirname, '../../assets/workspace.xml');
  it('loadFile',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee() {
    var data;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return helpers.loadFile(textXmlPath);

          case 2:
            data = _context.sent;
            assert.strictEqual(data.constructor.name, 'Buffer');

          case 4:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  })));
  it('saveFile',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2() {
    var filePath, buffer;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            filePath = path.resolve('tmp/tests/test.txt');
            buffer = Buffer.from('Test', 'utf8');

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

            assert.notOk(fs.existsSync(filePath));
            _context2.next = 6;
            return helpers.saveFile(filePath, buffer);

          case 6:
            assert.ok(fs.existsSync(filePath));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  })));
  it('loadFileText',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3() {
    var data;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return helpers.loadFileText(textXmlPath);

          case 2:
            data = _context3.sent;
            assert.strictEqual(_typeof(data), 'string');

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  })));
  it('saveFileText',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee4() {
    var filePath, text;
    return _regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            filePath = path.resolve('tmp/tests/test.txt');
            text = 'Test';

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

            assert.notOk(fs.existsSync(filePath));
            _context4.next = 6;
            return helpers.saveFileText(filePath, text);

          case 6:
            assert.ok(fs.existsSync(filePath));

          case 7:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, this);
  })));
  it('save/load file text',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee5() {
    var filePath, text, loadedText;
    return _regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            filePath = path.resolve('tmp/tests/test.txt');
            text = 'Test';

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

            assert.notOk(fs.existsSync(filePath));
            _context5.next = 6;
            return helpers.saveFileText(filePath, text);

          case 6:
            assert.ok(fs.existsSync(filePath));
            _context5.next = 9;
            return helpers.loadFileText(filePath);

          case 9:
            loadedText = _context5.sent;
            assert.strictEqual(loadedText, text);

          case 11:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, this);
  })));
  var testXml = '<?xml version="1.0" encoding="utf-8"?>' + '<note importance="high" logged="true">' + '<title>Happy</title>' + '<todo>Work</todo>' + '<todo>Play</todo>' + '</note>';
  var testJs = {
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
    assert.deepStrictEqual(helpers.parseXml(testXml), testJs);
  });
  it('save/load xml',
  /*#__PURE__*/
  _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee6() {
    var filePath, loadedText, loadedXml;
    return _regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            filePath = path.resolve('tmp/tests/test.xml');

            if (fs.existsSync(filePath)) {
              fs.unlinkSync(filePath);
            }

            assert.notOk(fs.existsSync(filePath));
            _context6.next = 5;
            return helpers.saveXml(filePath, testJs);

          case 5:
            assert.ok(fs.existsSync(filePath));
            _context6.next = 8;
            return helpers.loadFileText(filePath);

          case 8:
            loadedText = _context6.sent;
            assert.strictEqual(loadedText, testXml);
            _context6.next = 12;
            return helpers.loadXml(filePath);

          case 12:
            loadedXml = _context6.sent;
            assert.deepStrictEqual(loadedXml, testJs);

          case 14:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, this);
  })));
});