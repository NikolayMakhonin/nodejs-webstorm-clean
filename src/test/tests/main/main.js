import main from '../../../main/main'
import path from 'path'
import fse from 'fs-extra'
import helpersXml from '../../../main/helpers/xml'

describe('main', function () {
	const inputDir = path.dirname(require.resolve('../assets/workspace.xml'))
	const outputDir = path.resolve('tmp/tests/.idea')

	// it('help', async function () {
	// 	await main.main('node index.js --help')
	// })

	it('parseArgs', async function () {
		// console.log(JSON.stringify(process.argv, null, 4))
		let args = await main.parseArgs(`index.js "${inputDir}" -o "${outputDir}"`)
		// console.log(JSON.stringify(args, null, 4))
		assert.strictEqual(args.input, inputDir)
		assert.strictEqual(args.o, outputDir)
		assert.strictEqual(args.output, outputDir)

		args = await main.parseArgs(`index.js "${inputDir}"`)
		assert.strictEqual(args.input, inputDir)
		assert.strictEqual(args.o, undefined)
		assert.strictEqual(args.output, undefined)

		args = await main.parseArgs(`index.js -o "${outputDir}"`)
		assert.strictEqual(args.input, '.idea')
		assert.strictEqual(args.o, outputDir)
		assert.strictEqual(args.output, outputDir)

		args = await main.parseArgs('index.js')
		assert.strictEqual(args.input, '.idea')
		assert.strictEqual(args.o, undefined)
		assert.strictEqual(args.output, undefined)
	})


	it('clean', async function () {
		if (await fse.pathExists(outputDir)) {
			await fse.remove(outputDir)
		}

		let config = await helpersXml.loadXml(path.resolve(inputDir, 'workspace.xml'))
		assert.ok(config)
		assert.ok(config?.project?.component)
		assert.strictEqual(config?.project?.component[0]?._attributes?.name, 'ChangeListManager')

		await main.clean(`index.js "${inputDir}" -o "${outputDir}"`)

		config = await helpersXml.loadXml(path.resolve(outputDir, 'workspace.xml'))
		assert.ok(config)
		assert.ok(config?.project?.component)
		assert.strictEqual((config?.project?.component[0] || config?.project?.component)?._attributes?.name, 'RunManager')
	})
})
