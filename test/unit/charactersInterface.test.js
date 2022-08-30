const { getCharacters, getCharacterById, getCharactersQuotes } = require('../../src/interfaces/characters/characters.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { characters: charactersEndpoints } } = require('../libs/testConfig.js');

describe('Test characters interfaces', () => {
    const testParams = { limit: 1000, offset: 1 };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    it('[getCharacters] suite', async () => {
        const result = await getCharacters(context, testParams);

        expect(result.startsWith(charactersEndpoints.getAllCharacters)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });

    it('[getCharacterById] suite', async () => {
        const id = '12345';
        const result = await getCharacterById(context, id, testParams);
        const matchPath = charactersEndpoints.getCharacter.replace(':id', id);

        expect(result).toEqual(matchPath);
    });

    it('[getCharactersQuotes] suite', async () => {
        const id = '12345';
        const result = await getCharactersQuotes(context, id, testParams);
        const matchPath = charactersEndpoints.getCharacterQuotes.replace(':id', id);

        expect(result.startsWith(matchPath)).toBeTruthy();
        expect(result.endsWith(paramsEntriesLength)).toBeTruthy();
    });
});
