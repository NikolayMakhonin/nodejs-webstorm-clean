"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

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

var _xmlFormatter = _interopRequireDefault(require("xml-formatter"));

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

function traversalObject(object, handler, parentKey) {
  if (object == null || typeof object !== 'object') {
    return object;
  }

  for (const key in object) {
    if (Object.prototype.hasOwnProperty.call(object, key)) {
      object[key] = handler(key, object[key], parentKey);
      traversalObject(object[key], handler, key);
    }
  }

  return object;
}

function escapeSpecialCharsInAttributes(jsObject) {
  traversalObject(jsObject, (key, value, parentKey) => {
    if (parentKey === '_attributes' && typeof value === 'string') {
      return value.replace(/&/g, '&amp;');
    }

    return value;
  });
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
  escapeSpecialCharsInAttributes(jsObject);
  return (0, _xmlFormatter.default)(_xmlJs.default.js2xml(jsObject, {
    compact: true
  }), {
    collapseContent: true,
    indentation: '\t'
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