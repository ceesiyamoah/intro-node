import { readFile } from 'node:fs/promises';
import http from 'node:http';
import open from 'open';

const interpolate = (html, data) => {
	return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
		return data[placeholder] || '';
	});
};

const formatNotes = (notes) => {
	return notes
		.map((note) => {
			return `
      <div class="note">
        <p>${note.content}</p>
        <div class="tags">
          ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join('')}
        </div>
      </div>
    `;
		})
		.join('\n');
};

const createServer = (notes) => {
	return http.createServer(async (req, res) => {
		const TEMP_PATH = new URL('./template.html', import.meta.url);
		const template = await readFile(TEMP_PATH, 'utf-8');
		const formattedNotes = formatNotes(notes);
		const interpolatedTemplate = interpolate(template, { notes: formattedNotes });
		res.writeHead(200, { 'Content-Type': 'text/html' });
		res.end(interpolatedTemplate);
	});
};

export const start = (notes, port) => {
	const server = createServer(notes);
	server.listen(port, () => {
		const address = `http://localhost:${port}`;
		console.log('server on ' + address);
		open(address);
	});
};
