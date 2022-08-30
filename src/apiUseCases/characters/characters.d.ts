import { SDKContext, QueryParameters, SerializedApiResponse, PaginationDetails } from '../../types/commonTypes';
import { ICharacter, IQuote } from '../../index';

export declare interface ICharacterWithQuotesResponse {
    name: string;
    quotes: Omit<IQuote, 'id'>[];
    paginationInfo: PaginationDetails;
}

export declare function getAllCharacters(context: SDKContext, params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
export declare function searchCharactersByName(context: SDKContext, name: string, params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
export declare function getRacesList(context: SDKContext): Promise<string[]| null>;
export declare function getFemaleCharacters(context: SDKContext, params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
export declare function getMaleCharacters(context: SDKContext, params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
export declare function searchCharactersByRace(context: SDKContext, race: string, params?: QueryParameters): Promise<SerializedApiResponse<ICharacter> | null>;
export declare function getCharacter(context: SDKContext, id: string): Promise<ICharacter | null>;
export declare function getQuotesOfCharacter(context: SDKContext, id: string, params?: QueryParameters): Promise<ICharacterWithQuotesResponse | null>;
