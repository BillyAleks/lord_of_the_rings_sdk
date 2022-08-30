# Lord Of The Rings SDK

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

![HeaderImage](pictures/sdk_header.png)

This SDK has been created for a purpose of making a bridge between [Lord Of The Rings API](https://the-one-api.dev/).
To save developers time for creation serialization layers and mixing different queries.
With this SDK you are able to have a complete access to API and even more.
Simple to install and easy to use.

[Requirements](#requirements)

[Installation](#installation)

[SDK Initialization](#sdk-initialization)

[Before use](#before-use)

[SDK Methods](#sdk-methods)

- [Books](#books)
- [Chapters](#chapters)
- [Characters](#characters)
- [Movies](#movies)
- [Quotes](#quotes)

[Development](#development)

- [Testing](#testing)
- [Design](#design)

[Contacts](#contacts)

---

## Requirements

For being able to use all the functionality, that SDK provides, you will need to register at the [API WebSite](https://the-one-api.dev/sign-up).
After success registration you will receive an **API key**. It has to be used in an imported function call.
The complete installation instructions is right below.

>Note: this package will not work in not Node environment, as it includes core Node JS modules

## Installation

All you need to make an SDK installed is just run the following script in your command line:

```bash
npm i bilichenko_aleksandr_sdk
```

## SDK Initialization

As was mentioned before at this step you will need to have **API key** retrieved from API ([How to retrieve an API key](#requirements)).

You have to import SDK to your application and provide following arguments to it:

- **apiKey** *(key that was retrieved from API)*
- **options** *(optional parameter to set cache and logger)*

Options argument is not a requirement, so you can skip it at all. But it might be helpful for debugging, or caching recurring queries.
It has two properties

- **cacheTime**: Number *(time in milliseconds to reset cache)*
- **loggerEnabled**: Boolean *(initialize an SDK with logger)*

### CommonJS

Common JS SDK initialization example with setting cache reset to 10 seconds and enabling logger:

```javascript
const { LordOfTheRingsSdk } = require('bilichenko_aleksandr_sdk');

const sdk = LordOfTheRingsSdk('12345ApiKey', { cacheTime: 10000, loggerEnabled: true });
```

### ES Modules

ES Modules SDK initialization example without enabling it features:

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk('12345ApiKey');
```

### TypeScript

TypeScript example. Nest.js version of initializing SDK inside a controller, with a partial options enabled:

```typescript
import { LordOfTheRingsSdk, ICharacterWithQuotesResponse } from 'bilichenko_aleksandr_sdk';

@Get()
    async getCharacterQuotes(): Promise<ICharacterWithQuotesResponse | null> {
        const sdk = LordOfTheRingsSdk(<apiKey>, {
            cacheTime: 1000,
        });

        const result = await sdk.characters.getQuotesOfCharacter(<id>));
        return result;
    }
```

>Note: Nest.js is just an example. You can use same approach with any other TypeScript framework

## Before use

>Note: API has a limitation for requests. So you are able to send only **100** requests each **10** minutes.

We are highly recommending to enable cache with this time, to avoid any durability issues. Note that you will need to initialize SDK at the top level, to use the same scope for all users and share cached responses between them.

But this option is still on your choice.

## SDK methods

SDK is created to make developers life easier. However it is just a layer between developers and API.

Our development team is  working to cover as much usage cases as possible. But at the same moment we have left you some freedom in actions.

Please, discover the methods, that SDK provides, to understand how it can be useful for you.

### Methods

Initialized SDK includes five blocks of functions to operate with specific entities.

- books;
- chapters;
- characters;
- movies;
- quotes;

> Note: **params** is always an optional parameter, you don't need to provide it if there is no pagination / sort / filter purpose for it

#### Books

- getBookList(params);
- searchBooksByName(name, params);
- getBookTitles();
- getBook(id);
- getBookWithChapters(id, params);
- getBookWithChaptersTitles(id);

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk(apiKey);
const params = { limit: 2 };
sdk.books.getBookList(params)
    .then((result) => console.log(result));
```

#### Chapters

- getAllChapters(params);
- searchChaptersByName(name, params);
- getAllBooksWithChapters();
- getChapter(id);

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk(apiKey);
sdk.chapters.searchChaptersByName('on')
    .then((result) => console.log(result));
```

#### Characters

- getAllCharacters(params);
- searchCharactersByName(name, params);
- getRacesList();
- getFemaleCharacters(params);
- getMaleCharacters(params);
- searchCharactersByRace(race, params);
- getCharacter(id);
- getQuotesOfCharacter(id, params);

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk(apiKey);
const params = { limit: 2 };
sdk.characters.searchCharactersByRace('human', params)
    .then((result) => console.log(result));
```

#### Movies

- getAllMovies(params);
- searchMovieByName(name, params);
- getMovie(id);
- getQuotesOfMovie(id, params);

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk(apiKey);
sdk.movies.getAllMovies()
    .then((result) => console.log(result));
```

#### Quotes

- getAllQuotes(params);
- getQuote(id);
- getRandomQuote();

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk(apiKey);
sdk.quotes.getRandomQuote()
    .then((result) => console.log(result));
```

### Params object

Object called **params** is an optional object and might consist following properties:

- **limit**?: number;
- **offset**?: number;
- **page**?: number;
- **sort**?: Record<string, string | number>;
- **filter**?: Record<string, string>

> Note: we are not recommending to use sort and filter without a specific need. Some endpoints at the API side are not supporting this options. We are working to bring sort and filter to SDK layer for all possible cases. You will be able to have them in further releases.

#### Recommendations

1. Use **offset** and **page** properties separately. It's about a pagination concept, choose one to proceed with.

2. You can use **sort** property to apply sorting. Not every endpoint supports it, so make sure you are tested such use case in advance.
You have to provide an object to **sort**, which will have a field name as a key and sorting direction as a value (1, -1, 'desc', 'asc').

3. You can use **filter** property to apply filtering. Not every endpoint supports it, so make sure you are tested such use case in advance. You have to provide an object to **filter**, which will have a field name as a key and filtering action string as a value.

**Sorting example:**

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk(apiKey);
const params = { sort: { name: 'desc' } };
sdk.movies.getAllMovies(params)
    .then((result) => console.log(result));
```

**Filtering example:**

```javascript
import { LordOfTheRingsSdk } from 'bilichenko_aleksandr_sdk';

const sdk = LordOfTheRingsSdk(apiKey);
const params = { filter: { name: '=Gandalf' } };
sdk.movies.getAllMovies(params)
    .then((result) => console.log(result));
```

**Filtering options:**

Use your value for filtering instead `value` and regular expression instead `regex`

- *match* - `=value`
- *not match* - `!=value`
- *include* - `=value1,value2`
- *exclude* - `!=value1,value2`
- *less than* - `<value`
- *greater than* - `>value`
- *regex* - `=regex`

### Error handling

For making a usage of current SDK more slight and safe we are not returning or throwing any errors from inside of it. In the success scenario you will always have a response. Consider that `null` is a response of failure. To understand a reason of it, please initialize SDK with logger enabled.

## Development

### Testing

Testing is available for development purpose, you may discover test cases in our [GitHub Repository](https://github.com/BillyAleks/lord_of_the_rings_sdk)

It's developed with a help of **Jest** testing framework on a unit, integration and acceptance levels.

For this you will need to install development dependencies first:

```bash
npm i
```

**Unit tests**
To run unit tests, execute following script:

```bash
npm run test:unit
```

**Integration tests**
To run integration tests, execute following script:

```bash
npm run test:integration
```

**Acceptance tests**
Before running acceptance tests, make sure you have provided an `apiKey` in *tests/libs/testConfig.js* file.
To run them, execute following script:

```bash
npm run test:e2e
```

### Design

If you are curious about architecture of current SDK, please discover our [design.md](design.md) to understand it better.

---

## Contacts

If you have any purposes or troubles with current SDK - please open an issue in our [GitHub Repository](https://github.com/BillyAleks/lord_of_the_rings_sdk).

Our team will take it to work right after.

*Happy Hacking!*
