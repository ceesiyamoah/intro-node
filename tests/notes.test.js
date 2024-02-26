import { jest } from '@jest/globals';

jest.unstable_mockModule('../src/db.js', () => ({
	insert: jest.fn(),
	getDB: jest.fn(),
	saveDB: jest.fn(),
}));

const { insert, getDB, saveDB } = await import('../src/db.js');
const { newNote, getAllNotes, removeNote } = await import('../src/notes.js');

beforeEach(() => {
	insert.mockClear();
	getDB.mockClear();
	saveDB.mockClear();
});

test('new note inserts data and returns it', async () => {
	const note = {
		tags: ['tag1', 'tag2'],
		content: 'test note',
	};

	insert.mockResolvedValue(note);
	const result = await newNote(note.content, note.tags);
	expect(result.content).toEqual(note.content);
	expect(result.tags).toEqual(note.tags);
});
