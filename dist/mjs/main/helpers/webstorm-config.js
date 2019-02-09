import _regeneratorRuntime from "@babel/runtime/regenerator";
import _asyncToGenerator from "@babel/runtime/helpers/asyncToGenerator";
import _typeof from "@babel/runtime/helpers/typeof";
import path from 'path';
import fse from 'fs-extra';
import xmlHelpers from './xml';
var rules = {
  ChangeListManager: {
    list: false
  },
  CoverageDataManager: false,
  CoverageViewManager: false,
  FileEditorManager: false,
  FileTemplateManagerImpl: false,
  FindInProjectRecents: false,
  'Git.Settings': false,
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
  VcsManagerConfiguration: false,
  XDebuggerManager: false,
  debuggerHistoryManager: false,
  editorHistoryManager: false,
  ProjectLevelVcsManager: false,
  JsFlowSettings: false,
  RunManager: true,
  PropertiesComponent: true
};
export function cleanWorkspace(config) {
  var _config$project;

  var components = config === null || config === void 0 ? void 0 : (_config$project = config.project) === null || _config$project === void 0 ? void 0 : _config$project.component;

  if (components) {
    if (!Array.isArray(components)) {
      components = [components];
    }

    var i = 0;

    while (i < components.length) {
      var _component$_attribute;

      var component = components[i];
      var rule = rules[component === null || component === void 0 ? void 0 : (_component$_attribute = component._attributes) === null || _component$_attribute === void 0 ? void 0 : _component$_attribute.name];

      if (rule === false) {
        components.splice(i, 1);
        continue;
      } else if (rule && _typeof(rule) === 'object') {
        for (var key in rule) {
          if (Object.prototype.hasOwnProperty.call(rule, key)) {
            delete component[key];
          }
        }
      }

      i++;
    }
  }
}
export function cleanIdeaDir(_x, _x2) {
  return _cleanIdeaDir.apply(this, arguments);
}

function _cleanIdeaDir() {
  _cleanIdeaDir = _asyncToGenerator(
  /*#__PURE__*/
  _regeneratorRuntime.mark(function _callee(ideaDir, outDir) {
    var workspacePath, workspace;
    return _regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (ideaDir) {
              _context.next = 2;
              break;
            }

            throw new Error('.idea directory is not specified');

          case 2:
            if (outDir) {
              outDir = path.resolve(outDir);
            }

            _context.next = 5;
            return fse.ensureDir(ideaDir);

          case 5:
            if (!(outDir && ideaDir !== outDir)) {
              _context.next = 9;
              break;
            }

            _context.next = 8;
            return fse.copy(ideaDir, outDir);

          case 8:
            ideaDir = outDir;

          case 9:
            workspacePath = path.resolve(ideaDir, 'workspace.xml');
            _context.next = 12;
            return xmlHelpers.loadXml(workspacePath);

          case 12:
            workspace = _context.sent;
            cleanWorkspace(workspace);
            return _context.abrupt("return", xmlHelpers.saveXml(workspacePath, workspace));

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));
  return _cleanIdeaDir.apply(this, arguments);
}

export default {
  cleanWorkspace: cleanWorkspace,
  cleanIdeaDir: cleanIdeaDir
};