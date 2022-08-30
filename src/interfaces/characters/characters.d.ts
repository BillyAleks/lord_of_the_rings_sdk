import { APIResponse, SDKContext, QueryParameters } from '../../types/commonTypes';
import { IQuote } from '../quotes/quotes';

export declare interface ICharacter {
    _id: string;
    height: string;
    race: string;
    gender: string;
    birth: string;
    spouse: string;
    death: string;
    realm: string;
    hair: string;
    name: string;
    wikiUrl: string;
}

export declare function getCharacters(context: SDKContext, queryParams?: QueryParameters): Promise<APIResponse<ICharacter>>;
export declare function getCharacterById(context: SDKContext, id: string): Promise<APIResponse<ICharacter>>;
export declare function getCharactersQuotes(context: SDKContext, id: string, queryParams?: QueryParameters): Promise<APIResponse<Omit<IQuote, 'id'>>>;
