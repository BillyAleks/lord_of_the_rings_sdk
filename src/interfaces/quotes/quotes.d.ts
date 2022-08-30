import { APIResponse, SDKContext, QueryParameters } from '../../types/commonTypes';

export declare interface IQuote {
    _id: string;
    dialog: string;
    movie: string;
    character: string;
    id: string;
}

export declare function getQuotes(context: SDKContext, queryParams?: QueryParameters): Promise<APIResponse<IQuote>>;
export declare function getQuoteById(context: SDKContext, id: string): Promise<APIResponse<IQuote>>;
