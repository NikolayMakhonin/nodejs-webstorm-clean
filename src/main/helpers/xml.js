import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'
import xmlConverter from 'xml-js'
import format from 'xml-formatter'

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

function traversalObject(object, handler, parentKey) {
	if (object == null || typeof object !== 'object') {
		return object
	}

	for (const key in object) {
		if (Object.prototype.hasOwnProperty.call(object, key)) {
			object[key] = handler(key, object[key], parentKey)
			traversalObject(object[key], handler, key)
		}
	}

	return object
}

function escapeSpecialCharsInAttributes(jsObject) {
	traversalObject(jsObject, (key, value, parentKey) => {
		if (parentKey === '_attributes' && typeof value === 'string') {
			return value.replace(/&/g, '&amp;')
		}
		return value
	})
}

function saveXml(filePath, jsObject) {
	const xml = buildXml(jsObject)
	return saveFileText(filePath, xml)
}

function parseXml(xmlText) {
	return xmlConverter.xml2js(xmlText, {compact: true})
}

function buildXml(jsObject) {
	escapeSpecialCharsInAttributes(jsObject)
	return format(xmlConverter.js2xml(jsObject, {compact: true}), {
		collapseContent: true,
		indentation    : '\t',
	})
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
