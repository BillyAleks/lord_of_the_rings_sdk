const { initializeSDK } = require('../libs/testUtils.js');
const { defaultPaginationStates } = require('../libs/testConfig.js');

describe('Test characters endpoints availability and response changes', () => {
    let sdk;
    let characterId;

    beforeAll(() => {
        sdk = initializeSDK();
    });

    // eslint-disable-next-line arrow-body-style
    afterAll(() => {
        // to disable further https request hanging jest execution;
        // eslint-disable-next-line no-useless-return
        return;
    });

    describe('[getAllCharacters]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.characters.getAllCharacters();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            characterId = characterSample._id;
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };

            const result = await sdk.characters.getAllCharacters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };

            const result = await sdk.characters.getAllCharacters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);
        });
    });

    describe('[searchCharactersByName]: test suits', () => {
        const searchInput = 'ara';

        it('[Success scenario] no params', async () => {
            const result = await sdk.characters.searchCharactersByName(searchInput);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            characters.forEach((character) => {
                const characterNameLowerCased = character.name.toLowerCase();
                const matchIndex = characterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Negative scenario] not found', async () => {
            const result = await sdk.characters.searchCharactersByName('qwerty');
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toEqual(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            expect(paginationInfo.total).toEqual(0);
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };
            const result = await sdk.characters.searchCharactersByName(searchInput, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();

            characters.forEach((character) => {
                const characterNameLowerCased = character.name.toLowerCase();
                const matchIndex = characterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };
            const result = await sdk.characters.searchCharactersByName(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);

            characters.forEach((character) => {
                const characterNameLowerCased = character.name.toLowerCase();
                const matchIndex = characterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });
    });

    describe('[getRacesList]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.characters.getRacesList();
            expect(result).toBeDefined();
            expect(Array.isArray(result)).toBeTruthy();
            expect(result.length).toBeGreaterThan(0);

            result.forEach((race) => {
                expect(typeof race).toEqual('string');
            });
        });
    });

    describe('[getFemaleCharacters]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.characters.getFemaleCharacters();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { femaleCharacters, paginationInfo } = result;
            expect(femaleCharacters).toBeDefined();
            expect(Array.isArray(femaleCharacters)).toBeTruthy();
            expect(femaleCharacters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = femaleCharacters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toEqual('Female');
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            const maleCharacter = femaleCharacters.find((character) => character.gender === 'Male');
            expect(maleCharacter).not.toBeDefined();
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };

            const result = await sdk.characters.getFemaleCharacters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { femaleCharacters, paginationInfo } = result;
            expect(femaleCharacters).toBeDefined();
            expect(Array.isArray(femaleCharacters)).toBeTruthy();
            expect(femaleCharacters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = femaleCharacters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toEqual('Female');
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();

            const maleCharacter = femaleCharacters.find((character) => character.gender === 'Male');
            expect(maleCharacter).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };

            const result = await sdk.characters.getFemaleCharacters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { femaleCharacters, paginationInfo } = result;
            expect(femaleCharacters).toBeDefined();
            expect(Array.isArray(femaleCharacters)).toBeTruthy();
            expect(femaleCharacters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = femaleCharacters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender).toEqual('Female');
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);

            const maleCharacter = femaleCharacters.find((character) => character.gender === 'Male');
            expect(maleCharacter).not.toBeDefined();
        });
    });

    describe('[getMaleCharacters]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.characters.getMaleCharacters();
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { maleCharacters, paginationInfo } = result;
            expect(maleCharacters).toBeDefined();
            expect(Array.isArray(maleCharacters)).toBeTruthy();
            expect(maleCharacters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = maleCharacters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender.toLowerCase().indexOf('male')).not.toBeLessThan(0);
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            const femaleCharacter = maleCharacters.find((character) => character.gender === 'Female');
            expect(femaleCharacter).not.toBeDefined();
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };

            const result = await sdk.characters.getMaleCharacters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { maleCharacters, paginationInfo } = result;
            expect(maleCharacters).toBeDefined();
            expect(Array.isArray(maleCharacters)).toBeTruthy();
            expect(maleCharacters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = maleCharacters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender.toLowerCase().indexOf('male')).not.toBeLessThan(0);
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();

            const femaleCharacter = maleCharacters.find((character) => character.gender === 'Female');
            expect(femaleCharacter).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };

            const result = await sdk.characters.getMaleCharacters(params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { maleCharacters, paginationInfo } = result;
            expect(maleCharacters).toBeDefined();
            expect(Array.isArray(maleCharacters)).toBeTruthy();
            expect(maleCharacters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = maleCharacters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(typeof characterSample.race).toEqual('string');
            expect(characterSample.gender.toLowerCase().indexOf('male')).not.toBeLessThan(0);
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);

            const femaleCharacter = maleCharacters.find((character) => character.gender === 'Female');
            expect(femaleCharacter).not.toBeDefined();
        });
    });

    describe('[searchCharactersByRace]: test suits', () => {
        const searchInput = 'human';

        it('[Success scenario] no params', async () => {
            const result = await sdk.characters.searchCharactersByRace(searchInput);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(characterSample.race.toLowerCase()).toEqual(searchInput);
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);

            characters.forEach((character) => {
                const characterNameLowerCased = character.race.toLowerCase();
                const matchIndex = characterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Negative scenario] not found', async () => {
            const result = await sdk.characters.searchCharactersByRace('qwerty');
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toEqual(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            expect(paginationInfo.total).toEqual(0);
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };
            const result = await sdk.characters.searchCharactersByRace(searchInput, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(characterSample.race.toLowerCase()).toEqual(searchInput);
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();

            characters.forEach((character) => {
                const characterNameLowerCased = character.race.toLowerCase();
                const matchIndex = characterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };
            const result = await sdk.characters.searchCharactersByRace(searchInput, params);

            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { characters, paginationInfo } = result;
            expect(characters).toBeDefined();
            expect(Array.isArray(characters)).toBeTruthy();
            expect(characters.length).toBeGreaterThan(0);
            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');

            const characterSample = characters[0];
            expect(characterSample._id).toBeDefined();
            expect(typeof characterSample._id).toEqual('string');
            expect(characterSample.height).toBeDefined();
            expect(typeof characterSample.height).toEqual('string');
            expect(characterSample.race).toBeDefined();
            expect(characterSample.race.toLowerCase()).toEqual(searchInput);
            expect(characterSample.gender).toBeDefined();
            expect(typeof characterSample.gender).toEqual('string');
            expect(characterSample.birth).toBeDefined();
            expect(typeof characterSample.birth).toEqual('string');
            expect(characterSample.spouse).toBeDefined();
            expect(typeof characterSample.spouse).toEqual('string');
            expect(characterSample.death).toBeDefined();
            expect(typeof characterSample.death).toEqual('string');
            expect(characterSample.realm).toBeDefined();
            expect(typeof characterSample.realm).toEqual('string');
            expect(characterSample.hair).toBeDefined();
            expect(typeof characterSample.hair).toEqual('string');
            expect(characterSample.name).toBeDefined();
            expect(typeof characterSample.name).toEqual('string');
            expect(characterSample.wikiUrl).toBeDefined();
            expect(typeof characterSample.wikiUrl).toEqual('string');

            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).not.toBeDefined();
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.page).toEqual(params.page);

            characters.forEach((character) => {
                const characterNameLowerCased = character.race.toLowerCase();
                const matchIndex = characterNameLowerCased.indexOf(searchInput);
                expect(matchIndex).not.toBeLessThan(0);
            });
        });
    });

    describe('[getCharacter]: test suits', () => {
        it('[Success scenario]', async () => {
            const result = await sdk.characters.getCharacter(characterId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');
            expect(result._id).toEqual(characterId);
            expect(result.height).toBeDefined();
            expect(typeof result.height).toEqual('string');
            expect(result.race).toBeDefined();
            expect(typeof result.race).toEqual('string');
            expect(result.gender).toBeDefined();
            expect(typeof result.gender).toEqual('string');
            expect(result.birth).toBeDefined();
            expect(typeof result.birth).toEqual('string');
            expect(result.spouse).toBeDefined();
            expect(typeof result.spouse).toEqual('string');
            expect(result.death).toBeDefined();
            expect(typeof result.death).toEqual('string');
            expect(result.realm).toBeDefined();
            expect(typeof result.realm).toEqual('string');
            expect(result.hair).toBeDefined();
            expect(typeof result.hair).toEqual('string');
            expect(result.name).toBeDefined();
            expect(typeof result.name).toEqual('string');
            expect(result.wikiUrl).toBeDefined();
            expect(typeof result.wikiUrl).toEqual('string');
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await sdk.characters.getCharacter();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.characters.getCharacter('1234567');
            expect(result).toBeNull();
        });
    });

    describe('[getQuotesOfCharacter]: test suits', () => {
        it('[Success scenario] no params', async () => {
            const result = await sdk.characters.getQuotesOfCharacter(characterId);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, name, paginationInfo } = result;
            expect(name).toBeDefined();
            expect(typeof name).toEqual('string');

            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();

            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');
            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(defaultPaginationStates.limit);
            expect(paginationInfo.offset).toEqual(defaultPaginationStates.offset);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
            expect(paginationInfo.page).toEqual(defaultPaginationStates.page);
            expect(paginationInfo.pages).toEqual(defaultPaginationStates.pages);
        });

        it('[Success scenario] with limit and offset', async () => {
            const params = { limit: 2, offset: 1 };
            const result = await sdk.characters.getQuotesOfCharacter(characterId, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, name, paginationInfo } = result;
            expect(name).toBeDefined();
            expect(typeof name).toEqual('string');

            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();

            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');
            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.offset).toEqual(params.offset);
            expect(paginationInfo.pages).not.toBeDefined();
            expect(paginationInfo.page).not.toBeDefined();
        });

        it('[Success scenario] with limit and page', async () => {
            const params = { limit: 2, page: 1 };
            const result = await sdk.characters.getQuotesOfCharacter(characterId, params);
            expect(result).toBeDefined();
            expect(typeof result).toEqual('object');

            const { quotes, name, paginationInfo } = result;
            expect(name).toBeDefined();
            expect(typeof name).toEqual('string');

            expect(quotes).toBeDefined();
            expect(Array.isArray(quotes)).toBeTruthy();

            expect(paginationInfo).toBeDefined();
            expect(typeof paginationInfo).toEqual('object');
            expect(paginationInfo.total).toBeDefined();
            expect(paginationInfo.limit).toEqual(params.limit);
            expect(paginationInfo.page).toEqual(params.page);
            expect(paginationInfo.pages).toBeDefined();
            expect(paginationInfo.offset).not.toBeDefined();
        });

        it('[Negative scenario] no id provided', async () => {
            const result = await await sdk.characters.getQuotesOfCharacter();
            expect(result).toBeNull();
        });

        it('[Negative scenario] wrong id provided', async () => {
            const result = await sdk.characters.getQuotesOfCharacter('abcd');
            expect(result).toBeNull();
        });
    });
});
