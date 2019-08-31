import helpers from '../../../../main/helpers/xml'
import path from 'path'
import fs from 'fs'

describe('helpers > xml', function () {
	const textXmlPath = path.resolve(__dirname, '../../assets/workspace.xml')

	it('loadFile', async function () {
		const data = await helpers.loadFile(textXmlPath)
		assert.strictEqual(data.constructor.name, 'Buffer')
	})

	it('saveFile', async function () {
		const filePath = path.resolve('tmp/tests/test.txt')
		const buffer = Buffer.from('Test', 'utf8')
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}
		assert.notOk(fs.existsSync(filePath))
		await helpers.saveFile(filePath, buffer)
		assert.ok(fs.existsSync(filePath))
	})

	it('loadFileText', async function () {
		const data = await helpers.loadFileText(textXmlPath)
		assert.strictEqual(typeof data, 'string')
	})

	it('saveFileText', async function () {
		const filePath = path.resolve('tmp/tests/test.txt')
		const text = 'Test'
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}
		assert.notOk(fs.existsSync(filePath))
		await helpers.saveFileText(filePath, text)
		assert.ok(fs.existsSync(filePath))
	})

	it('save/load file text', async function () {
		const filePath = path.resolve('tmp/tests/test.txt')
		const text = 'Test'
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}
		assert.notOk(fs.existsSync(filePath))
		await helpers.saveFileText(filePath, text)
		assert.ok(fs.existsSync(filePath))
		const loadedText = await helpers.loadFileText(filePath)
		assert.strictEqual(loadedText, text)
	})

	const testXml = '<?xml version="1.0" encoding="utf-8"?>\r\n'
		+ '<note importance="high" logged="true">\r\n'
		+ '\t<title>Happy</title>\r\n'
		+ '\t<todo>Work</todo>\r\n'
		+ '\t<todo>Play</todo>\r\n'
		+ '</note>'

	const testJs = {
		_declaration: {
			_attributes: {
				version : '1.0',
				encoding: 'utf-8'
			}
		},
		note: {
			_attributes: {
				importance: 'high',
				logged    : 'true'
			},
			title: {
				_text: 'Happy'
			},
			todo: [
				{
					_text: 'Work'
				},
				{
					_text: 'Play'
				}
			]
		}
	}

	it('parse xml', function () {
		assert.deepStrictEqual(helpers.parseXml(testXml), testJs)
	})

	it('save/load xml', async function () {
		const filePath = path.resolve('tmp/tests/test.xml')
		if (fs.existsSync(filePath)) {
			fs.unlinkSync(filePath)
		}
		assert.notOk(fs.existsSync(filePath))
		await helpers.saveXml(filePath, testJs)
		assert.ok(fs.existsSync(filePath))
		const loadedText = await helpers.loadFileText(filePath)
		assert.strictEqual(loadedText, testXml)
		const loadedXml = await helpers.loadXml(filePath)
		assert.deepStrictEqual(loadedXml, testJs)
	})
})
