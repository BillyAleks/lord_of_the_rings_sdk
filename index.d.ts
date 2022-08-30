import {
    IBook, QueryParameters, SerializedApiResponse, IBookWithChaptersResponse, IBookWithChapterTitles,
    IChapterExtended, ICharacterWithQuotesResponse, ICharacter, IMovie, IMovieWithChaptersResponse,
    IQuote, IQuoteExtended,
} from './src/index';

interface ISdk {
    books: {
        getBookList(params?: QueryParameters): Promise<SerializedApiResponse<IBook> | null>;
        searchBooksByName(name: string, params?: QueryParameters) : Promise<SerializedApiResponse<IBook> | null>;
        getBookTitles(): Promise<string[] | null>;
        getBook(id: string) : Promise<IBook | null>;
        getBookWithChapters(id: string, params?: QueryParameters) : Promise<IBookWithChaptersResponse | null>;
        getBookWithChaptersTitles(id: string) : Promise<IBookWithChapterTitles | null>
    },
    chapters: {
        getAllChapters(params?: QueryParameters): Promise<SerializedApiResponse<IChapterExtended> | null>;
        searchChaptersByName(name: string, params?: QueryParameters) : Promise<SerializedApiResponse<IChapterExtended> | null>;
        getAllBooksWithChapters(): Promise<IBookWithChapterTitles[] | null>;
        getChapter(id: string) : Promise<IChapterExtended | null>;
    },
    characters: {
        getAllCharacters(params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
        searchCharactersByName(name: string, params?: QueryParameters) : Promise<SerializedApiResponse<ICharacter> | null>;
        getRacesList(): Promise<string[] | null>;
        getFemaleCharacters(params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
        getMaleCharacters(params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
        searchCharactersByRace(race: string, params?: QueryParameters) : Promise<SerializedApiResponse<ICharacter> | null>;
        getCharacter(id: string) : Promise<ICharacter | null>;
        getQuotesOfCharacter(id: string, params?: QueryParameters) : Promise<ICharacterWithQuotesResponse | null>;
    },
    movies: {
        getAllMovies(params?: QueryParameters): Promise<SerializedApiResponse<IMovie> | null>;
        searchMovieByName(name: string, params?: QueryParameters) : Promise<SerializedApiResponse<IMovie> | null>;
        getCharacter(id: string) : Promise<IMovie | null>;
        getQuotesOfCharacter(id: string, params?: QueryParameters) : Promise<IMovieWithChaptersResponse | null>;
    },
    quotes: {
        getAllQuotes(params?: QueryParameters): Promise<SerializedApiResponse<Omit<IQuote, 'id'>> | null>;
        getQuote(id: string, params?: QueryParameters): Promise<IQuoteExtended | null>;
        getRandomQuote(): Promise<IQuoteExtended | null>;
    }
}

export declare interface ISdkOptions {
    cacheTime: number;
    loggerEnabled: boolean;
}

export declare function LordOfTheRingsSdk(apiKey: string, options: ISdkOptions): ISdk;
export * from './src/index';
