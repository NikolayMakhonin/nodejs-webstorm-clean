"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.loadFile = loadFile;
exports.saveFile = saveFile;
exports.loadFileText = loadFileText;
exports.saveFileText = saveFileText;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _xmlJs = _interopRequireDefault(require("xml-js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function loadFile(filePath) {
  return new Promise((resolve, reject) => _fs.default.readFile(filePath, (err, data) => {
    if (err) {
      reject(err);
      return;
    }

    resolve(data);
  }));
}

async function saveFile(filePath, data) {
  const dir = _path.default.dirname(filePath);

  if (!(await _fsExtra.default.pathExists(dir))) {
    await _fsExtra.default.mkdirp(dir);
  }

  return new Promise((resolve, reject) => _fs.default.writeFile(filePath, data, err => {
    if (err) {
      reject(err);
      return;
    }

    resolve();
  }));
}

async function loadFileText(filePath, encoding = 'utf8') {
  const buffer = await loadFile(filePath);

  if (!buffer) {
    return null;
  }

  return buffer.toString(encoding);
}

function saveFileText(filePath, text) {
  const buffer = Buffer.from(text);
  return saveFile(filePath, buffer);
}

async function loadXml(filePath) {
  const xml = await loadFileText(filePath);
  return parseXml(xml);
}

function saveXml(filePath, jsObject) {
  const xml = buildXml(jsObject);
  return saveFileText(filePath, xml);
}

function parseXml(xmlText) {
  return _xmlJs.default.xml2js(xmlText, {
    compact: true
  });
}

function buildXml(jsObject) {
  return _xmlJs.default.js2xml(jsObject, {
    compact: true
  });
}

var _default = {
  loadFile,
  saveFile,
  loadFileText,
  saveFileText,
  parseXml,
  buildXml,
  loadXml,
  saveXml
};
exports.default = _default;