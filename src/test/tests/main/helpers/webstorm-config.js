import path from 'path'
import helpersXml from '../../../../main/helpers/xml'
import helpers from '../../../../main/helpers/webstorm-config'

describe('helpers > webstorm-config', function () {
	const textXmlPath = path.resolve(__dirname, '../../assets/workspace.xml')

	it('cleanWorkspace', async function () {
		const config = await helpersXml.loadXml(textXmlPath)
		assert.ok(config)
		assert.ok(config?.project?.component)
		assert.strictEqual(config?.project?.component[0]?._attributes?.name, 'ChangeListManager')
		assert.ok(config?.project?.component[0]?.list)

		helpers.cleanWorkspace(config)

		assert.strictEqual(config?.project?.component[0]?._attributes?.name, 'ChangeListManager')
		assert.notOk(config?.project?.component[0]?.list)
		// console.log(JSON.stringify(config, null, 4))
	})

	it('cleanIdeaDir', async function () {
		await helpers.cleanIdeaDir(path.dirname(textXmlPath), 'tmp/tests/.idea')
		const config = await helpersXml.loadXml('tmp/tests/.idea/workspace.xml')
		assert.ok(config)
		assert.ok(config?.project?.component)
		// console.log(JSON.stringify(config, null, 4))
		assert.strictEqual((config?.project?.component[0] || config?.project?.component)?._attributes?.name, 'ChangeListManager')
		assert.notOk((config?.project?.component[0] || config?.project?.component)?.list)

		await assert.isRejected(helpers.cleanIdeaDir(), Error)
	})
})
