import path from 'path'
import fse from 'fs-extra'
import xmlHelpers from './xml'

const unnecessary = [
	'ChangeListManager',
	'CoverageDataManager',
	'CoverageViewManager',
	'FileEditorManager',
	'FileTemplateManagerImpl',
	'FindInProjectRecents',
	'Git.Settings',
	'IdeDocumentHistory',
	'ProjectFrameBounds',
	'ProjectView',
	'RecentsManager',
	'RunDashboard',
	'SvnConfiguration',
	'TaskManager',
	'TestHistory',
	'TimeTrackingManager',
	'TodoView',
	'ToolWindowManager',
	'TypeScriptGeneratedFilesManager',
	'VcsManagerConfiguration',
	'XDebuggerManager',
	'debuggerHistoryManager',
	'editorHistoryManager',
	'ProjectLevelVcsManager',
	'JsFlowSettings'
]

const necessary = [
	'RunManager',
	'PropertiesComponent'
]

export function cleanWorkspace(config) {
	let components = config?.project?.component
	if (components) {
		if (!Array.isArray(components)) {
			components = [components]
		}
		let i = 0
		while (i < components.length) {
			const component = components[i]
			if (unnecessary.includes(component?._attributes?.name)) {
				components.splice(i, 1)
				continue
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
