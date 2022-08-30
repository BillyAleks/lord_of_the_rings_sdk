const {
    getAllCharacters,
    searchCharactersByName,
    getRacesList,
    getFemaleCharacters,
    getMaleCharacters,
    searchCharactersByRace,
    getCharacter,
    getQuotesOfCharacter,
} = require('../../src/apiUseCases/characters/characters.js');
const { mockContext } = require('../libs/testUtils.js');
const { externalEndpoints: { characters: charactersEndpoints } } = require('../libs/testConfig.js');

describe('Test characters useCases', () => {
    const id = '12345';
    const testParams = { limit: 1000, offset: 1 };
    const negativeScenarioTestParams = { ...testParams, throwError: true };
    let context;
    let paramsEntriesLength;

    beforeAll(() => {
        context = mockContext();
        paramsEntriesLength = Object.entries(testParams).length;
    });

    describe('[getAllCharacters] useCases', () => {
        it('Success scenario: no params', async () => {
            const result = await getAllCharacters(context);

            expect(result.characters[0]).toEqual(charactersEndpoints.getAllCharacters);
        });

        it('Success scenario: with params', async () => {
            const result = await getAllCharacters(context, testParams);

            expect(result.characters[0]).toEqual(charactersEndpoints.getAllCharacters);
            expect(+result.characters[1]).toEqual(paramsEntriesLength);
        });

        it('Negative scenario', async () => {
            const result = await getAllCharacters(context, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[searchCharactersByName] useCase', () => {
        const name = 'test';
        it('Success scenario: no params', async () => {
            const result = await searchCharactersByName(context, name);
            expect(result.characters[0]).toEqual(charactersEndpoints.getAllCharacters);
        });

        it('Success scenario: with params', async () => {
            const result = await searchCharactersByName(context, name, testParams);
            expect(result.characters[0]).toEqual(charactersEndpoints.getAllCharacters);
            expect(+result.characters[1]).toEqual(paramsEntriesLength + 1); // filter property added
        });

        it('Negative scenario', async () => {
            const result = await searchCharactersByName(context, name, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getRacesList] useCase', () => {
        it('Success scenario', async () => {
            const result = await getRacesList(context);
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
        });
    });

    describe('[getFemaleCharacters] useCases', () => {
        it('Success scenario: no params', async () => {
            const result = await getFemaleCharacters(context);

            expect(result.femaleCharacters[0]).toEqual(charactersEndpoints.getAllCharacters);
        });

        it('Success scenario: with params', async () => {
            const result = await getFemaleCharacters(context, testParams);

            expect(result.femaleCharacters[0]).toEqual(charactersEndpoints.getAllCharacters);
            expect(+result.femaleCharacters[1]).toEqual(paramsEntriesLength + 1); // filter added
        });

        it('Negative scenario', async () => {
            const result = await getFemaleCharacters(context, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getMaleCharacters] useCases', () => {
        it('Success scenario: no params', async () => {
            const result = await getMaleCharacters(context);

            expect(result.maleCharacters[0]).toEqual(charactersEndpoints.getAllCharacters);
        });

        it('Success scenario: with params', async () => {
            const result = await getMaleCharacters(context, testParams);

            expect(result.maleCharacters[0]).toEqual(charactersEndpoints.getAllCharacters);
            expect(+result.maleCharacters[1]).toEqual(paramsEntriesLength + 1); // filter added
        });

        it('Negative scenario', async () => {
            const result = await getMaleCharacters(context, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[searchCharactersByRace] useCase', () => {
        const name = 'test';
        it('Success scenario: no params', async () => {
            const result = await searchCharactersByRace(context, name);
            expect(result.characters[0]).toEqual(charactersEndpoints.getAllCharacters);
        });

        it('Success scenario: with params', async () => {
            const result = await searchCharactersByRace(context, name, testParams);
            expect(result.characters[0]).toEqual(charactersEndpoints.getAllCharacters);
            expect(+result.characters[1]).toEqual(paramsEntriesLength + 1); // filter property added
        });

        it('Negative scenario', async () => {
            const result = await searchCharactersByRace(context, name, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });

    describe('[getCharacter] useCase', () => {
        it('Success scenario', async () => {
            const result = await getCharacter(context, id);
            const matchPath = charactersEndpoints.getCharacter.replace(':id', id);
            expect(result).toEqual(matchPath);
        });

        it('Negative scenario no id', async () => {
            const result = await getCharacter(context);
            expect(result).toBeNull();
        });
    });

    describe('[getQuotesOfCharacter] useCase', () => {
        it('Success scenario: no params', async () => {
            const result = await getQuotesOfCharacter(context, id);
            expect(result).toBeDefined();
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('quotes'));
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('name'));
        });

        it('Success scenario: with params', async () => {
            const result = await getQuotesOfCharacter(context, id, testParams);
            expect(result).toBeDefined();
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('quotes'));
            // eslint-disable-next-line no-prototype-builtins
            expect(result.hasOwnProperty('name'));
        });

        it('Negative scenario: no id', async () => {
            const result = await getQuotesOfCharacter(context);
            expect(result).toBeNull();
        });

        it('Negative scenario: query error imitation', async () => {
            const result = await getQuotesOfCharacter(context, id, negativeScenarioTestParams);
            expect(result).toBeNull();
        });
    });
});
