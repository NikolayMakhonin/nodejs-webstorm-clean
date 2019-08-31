import path from 'path'
import fse from 'fs-extra'
import xmlHelpers from './xml'

const rules = {
	ChangeListManager              : {list: false},
	CoverageDataManager            : false,
	CoverageViewManager            : false,
	FileEditorManager              : false,
	FileTemplateManagerImpl        : false,
	FindInProjectRecents           : false,
	'Git.Settings'                 : true,
	IdeDocumentHistory             : false,
	ProjectFrameBounds             : false,
	ProjectView                    : false,
	RecentsManager                 : false,
	RunDashboard                   : false,
	SvnConfiguration               : false,
	TaskManager                    : false,
	TestHistory                    : false,
	TimeTrackingManager            : false,
	TodoView                       : false,
	ToolWindowManager              : false,
	TypeScriptGeneratedFilesManager: false,
	VcsManagerConfiguration        : true,
	XDebuggerManager               : false,
	debuggerHistoryManager         : false,
	editorHistoryManager           : false,
	ProjectLevelVcsManager         : true,
	JsFlowSettings                 : true,
	RunManager                     : true,
	PropertiesComponent            : true
}

export function cleanWorkspace(config) {
	let components = config?.project?.component
	if (components) {
		if (!Array.isArray(components)) {
			components = [components]
		}
		let i = 0
		while (i < components.length) {
			const component = components[i]
			const rule = rules[component?._attributes?.name]
			if (rule === false) {
				components.splice(i, 1)
				continue
			} else if (rule && typeof rule === 'object') {
				for (const key in rule) {
					if (Object.prototype.hasOwnProperty.call(rule, key) && rule[key] === false) {
						delete component[key]
					}
				}
			}
			i++
		}
	}
}

export async function cleanIdeaDir(ideaDir, outDir) {
	if (!ideaDir) {
		throw new Error('.idea directory is not specified')
	}

	if (outDir) {
		outDir = path.resolve(outDir)
	}

	await fse.ensureDir(ideaDir)

	if (outDir && ideaDir !== outDir) {
		await fse.copy(ideaDir, outDir)
		ideaDir = outDir
	}

	const workspacePath = path.resolve(ideaDir, 'workspace.xml')
	const workspace = await xmlHelpers.loadXml(workspacePath)
	cleanWorkspace(workspace)
	return xmlHelpers.saveXml(workspacePath, workspace)
}

export default {
	cleanWorkspace,
	cleanIdeaDir
}
