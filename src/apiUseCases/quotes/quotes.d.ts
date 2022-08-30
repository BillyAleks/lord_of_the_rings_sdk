import { SDKContext, QueryParameters, SerializedApiResponse } from '../../types/commonTypes';
import { IMovie, ICharacter, IQuote } from '../../index';

export declare interface IQuoteExtended extends Omit<IQuote, 'id', 'movie', 'character'> {
    movie: IMovie;
    character: ICharacter;
}

export declare function getAllQuotes(context: SDKContext, params?: QueryParameters): Promise<SerializedApiResponse<Omit<IQuote, 'id'>> | null>;
export declare function getQuote(context: SDKContext, id: string, params?: QueryParameters): Promise<IQuoteExtended | null>;
export declare function getRandomQuote(context: SDKContext): Promise<IQuoteExtended | null>;
