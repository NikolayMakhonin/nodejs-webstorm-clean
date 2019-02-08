import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import path from 'path';
import fs from 'fs';
import fse from 'fs-extra';
import xmlConverter from 'xml-js';
export function loadFile(filePath) {
  return new Promise(function (resolve, reject) {
    return fs.readFile(filePath, function (err, data) {
      if (err) {
        reject(err);
        return;
      }

      resolve(data);
    });
  });
}
export function saveFile(_x, _x2) {
  return _saveFile.apply(this, arguments);
}

function _saveFile() {
  _saveFile = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(filePath, data) {
    var dir;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            dir = path.dirname(filePath);
            _context.next = 3;
            return fse.pathExists(dir);

          case 3:
            if (_context.sent) {
              _context.next = 6;
              break;
            }

            _context.next = 6;
            return fse.mkdirp(dir);

          case 6:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              return fs.writeFile(filePath, data, function (err) {
                if (err) {
                  reject(err);
                  return;
                }

                resolve();
              });
            }));

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _saveFile.apply(this, arguments);
}

export function loadFileText(_x3) {
  return _loadFileText.apply(this, arguments);
}

function _loadFileText() {
  _loadFileText = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee2(filePath) {
    var encoding,
        buffer,
        _args2 = arguments;
    return _regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            encoding = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : 'utf8';
            _context2.next = 3;
            return loadFile(filePath);

          case 3:
            buffer = _context2.sent;

            if (buffer) {
              _context2.next = 6;
              break;
            }

            return _context2.abrupt("return", null);

          case 6:
            return _context2.abrupt("return", buffer.toString(encoding));

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));
  return _loadFileText.apply(this, arguments);
}

export function saveFileText(filePath, text) {
  var buffer = Buffer.from(text);
  return saveFile(filePath, buffer);
}

function loadXml(_x4) {
  return _loadXml.apply(this, arguments);
}

function _loadXml() {
  _loadXml = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee3(filePath) {
    var xml;
    return _regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return loadFileText(filePath);

          case 2:
            xml = _context3.sent;
            return _context3.abrupt("return", parseXml(xml));

          case 4:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, this);
  }));
  return _loadXml.apply(this, arguments);
}

function saveXml(filePath, jsObject) {
  var xml = buildXml(jsObject);
  return saveFileText(filePath, xml);
}

function parseXml(xmlText) {
  return xmlConverter.xml2js(xmlText, {
    compact: true
  });
}

function buildXml(jsObject) {
  return xmlConverter.js2xml(jsObject, {
    compact: true
  });
}

export default {
  loadFile: loadFile,
  saveFile: saveFile,
  loadFileText: loadFileText,
  saveFileText: saveFileText,
  parseXml: parseXml,
  buildXml: buildXml,
  loadXml: loadXml,
  saveXml: saveXml
};