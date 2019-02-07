import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'
import xmlConverter from 'xml-js'

export function loadFile(filePath) {
	return new Promise((resolve, reject) => fs.readFile(filePath, (err, data) => {
		if (err) {
			reject(err)
			return
		}

		resolve(data)
	}))
}

export async function saveFile(filePath, data) {
	const dir = path.dirname(filePath)

	if (!await fse.pathExists(dir)) {
		await fse.mkdirp(dir)
	}

	return new Promise((resolve, reject) => fs.writeFile(filePath, data, err => {
		if (err) {
			reject(err)
			return
		}
		resolve()
	}))
}

export async function loadFileText(filePath, encoding = 'utf8') {
	const buffer = await loadFile(filePath)
	if (!buffer) {
		return null
	}
	return buffer.toString(encoding)
}

export function saveFileText(filePath, text) {
	const buffer = Buffer.from(text)

	return saveFile(filePath, buffer)
}

async function loadXml(filePath) {
	const xml = await loadFileText(filePath)
	return parseXml(xml)
}

function saveXml(filePath, jsObject) {
	const xml = buildXml(jsObject)
	return saveFileText(filePath, xml)
}

function parseXml(xmlText) {
	return xmlConverter.xml2js(xmlText, {compact: true})
}

function buildXml(jsObject) {
	return xmlConverter.js2xml(jsObject, {compact: true})
}

export default {
	loadFile,
	saveFile,
	loadFileText,
	saveFileText,
	parseXml,
	buildXml,
	loadXml,
	saveXml
}
