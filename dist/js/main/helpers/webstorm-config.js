"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.cleanWorkspace = cleanWorkspace;
exports.cleanIdeaDir = cleanIdeaDir;
exports.default = void 0;

var _path = _interopRequireDefault(require("path"));

var _fsExtra = _interopRequireDefault(require("fs-extra"));

var _xml = _interopRequireDefault(require("./xml"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const unnecessary = ['ChangeListManager', 'CoverageDataManager', 'CoverageViewManager', 'FileEditorManager', 'FileTemplateManagerImpl', 'FindInProjectRecents', 'Git.Settings', 'IdeDocumentHistory', 'ProjectFrameBounds', 'ProjectView', 'RecentsManager', 'RunDashboard', 'SvnConfiguration', 'TaskManager', 'TestHistory', 'TimeTrackingManager', 'TodoView', 'ToolWindowManager', 'TypeScriptGeneratedFilesManager', 'VcsManagerConfiguration', 'XDebuggerManager', 'debuggerHistoryManager', 'editorHistoryManager', 'ProjectLevelVcsManager', 'JsFlowSettings'];
const necessary = ['RunManager', 'PropertiesComponent'];

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

      if (unnecessary.includes(component === null || component === void 0 ? void 0 : (_component$_attribute = component._attributes) === null || _component$_attribute === void 0 ? void 0 : _component$_attribute.name)) {
        components.splice(i, 1);
        continue;
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