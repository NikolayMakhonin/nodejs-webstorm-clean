import main from '../../../main/main'
import path from 'path'
import fse from 'fs-extra'
import mockCli from 'mock-cli'
import helpersXml from '../../../main/helpers/xml'

describe('main', function () {
	const inputDir = path.resolve(__dirname, '../assets')
	const outputDir = path.resolve('tmp/tests/.idea')
	let mockCliDispose

	before(function () {
		mockCliDispose = mockCli(
			['node', 'index.js'],
			{
				stdin : undefined, // Hook up a fake input stream
				stdout: process.stdout, // Display the captured output in the main console
				stderr: process.stderr // Display the captured error output in the main console
			}, (error, result) => {
				assert.notOk(error)
				const exitCode = result.code // Process exit code
				assert.strictEqual(exitCode, 0)
			}
		)
	})

	after(function () {
		mockCliDispose()
	})

	// it('help', async function () {
	// 	await main.main('--help')
	// })

	it('parseArgs', async function () {
		// console.log(JSON.stringify(process.argv, null, 4))
		let args = await main.parseArgs(`"${inputDir}" -o "${outputDir}"`)
		console.log(JSON.stringify(args, null, 4))
		assert.strictEqual(args.input, inputDir)
		assert.strictEqual(args.o, outputDir)
		assert.strictEqual(args.output, outputDir)

		args = await main.parseArgs(`"${inputDir}"`)
		assert.strictEqual(args.input, inputDir)
		assert.strictEqual(args.o, undefined)
		assert.strictEqual(args.output, undefined)

		args = await main.parseArgs(`-o "${outputDir}"`)
		assert.strictEqual(args.input, '.idea')
		assert.strictEqual(args.o, outputDir)
		assert.strictEqual(args.output, outputDir)

		args = await main.parseArgs('')
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

		await main.clean(`"${inputDir}" -o "${outputDir}"`)

		config = await helpersXml.loadXml(path.resolve(outputDir, 'workspace.xml'))
		assert.ok(config)
		assert.ok(config?.project?.component)
		assert.strictEqual((config?.project?.component[0] || config?.project?.component)?._attributes?.name, 'RunManager')
	})
})
