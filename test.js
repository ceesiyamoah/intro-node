import { readFile, writeFile } from 'node:fs/promises';

const readPjson = async () => {
	const urlPath = new URL('./package.json', import.meta.url);

	console.log(JSON.parse(await readFile(urlPath, 'utf-8')));
};

const writeToFile = async () => {
	const urlPath = new URL('./demo.js', import.meta.url);
	await writeFile(urlPath, `console.log('djd')`);
};

// readPjson();
writeToFile();
