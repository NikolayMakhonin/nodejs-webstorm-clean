"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanWorkspace = cleanWorkspace;
exports.cleanIdeaDir = cleanIdeaDir;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _xml = _interopRequireDefault(require("./xml"));

const rules = {
  ChangeListManager: {
    list: false
  },
  CoverageDataManager: false,
  CoverageViewManager: false,
  FileEditorManager: false,
  FileTemplateManagerImpl: false,
  FindInProjectRecents: false,
  'Git.Settings': true,
  IdeDocumentHistory: false,
  ProjectFrameBounds: false,
  ProjectView: false,
  RecentsManager: false,
  RunDashboard: false,
  SvnConfiguration: false,
  TaskManager: false,
  TestHistory: false,
  TimeTrackingManager: false,
  TodoView: false,
  ToolWindowManager: false,
  TypeScriptGeneratedFilesManager: false,
  VcsManagerConfiguration: true,
  XDebuggerManager: false,
  debuggerHistoryManager: false,
  editorHistoryManager: false,
  ProjectLevelVcsManager: true,
  JsFlowSettings: true,
  RunManager: true,
  PropertiesComponent: true
};

function cleanWorkspace(config) {
  var _config$project;

  let components = config === null || config === void 0 ? void 0 : (_config$project = config.project) === null || _config$project === void 0 ? void 0 : _config$project.component;

  if (components) {
    if (!Array.isArray(components)) {
      components = [components];
    }

    let i = 0;

    while (i < components.length) {
      var _component$_attribute;

      const component = components[i];
      const rule = rules[component === null || component === void 0 ? void 0 : (_component$_attribute = component._attributes) === null || _component$_attribute === void 0 ? void 0 : _component$_attribute.name];

      if (rule === false) {
        components.splice(i, 1);
        continue;
      } else if (rule && typeof rule === 'object') {
        for (const key in rule) {
          if (Object.prototype.hasOwnProperty.call(rule, key) && rule[key] === false) {
            delete component[key];
          }
        }
      }

      i++;
    }
  }
}

async function cleanIdeaDir(ideaDir, outDir) {
  if (!ideaDir) {
    throw new Error('.idea directory is not specified');
  }

  if (outDir) {
    outDir = _path.default.resolve(outDir);
  }

  await _fsExtra.default.ensureDir(ideaDir);

  if (outDir && ideaDir !== outDir) {
    await _fsExtra.default.copy(ideaDir, outDir);
    ideaDir = outDir;
  }

  const workspacePath = _path.default.resolve(ideaDir, 'workspace.xml');

  const workspace = await _xml.default.loadXml(workspacePath);
  cleanWorkspace(workspace);
  return _xml.default.saveXml(workspacePath, workspace);
}

var _default = {
  cleanWorkspace,
  cleanIdeaDir
};
exports.default = _default;