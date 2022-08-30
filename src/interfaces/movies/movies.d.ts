import { APIResponse, SDKContext, QueryParameters } from '../../types/commonTypes';
import { IQuote } from '../quotes/quotes';

export declare interface IMovie {
    _id: string;
    name: string;
    runtimeInMinutes: number;
    budgetInMillions: number;
    boxOfficeRevenueInMillions: number;
    academyAwardNominations: number;
    academyAwardWins: number;
    rottenTomatoesScore: number;
}

export declare function getMovies(context: SDKContext, queryParams?: QueryParameters): Promise<APIResponse<IMovie>>;
export declare function getMovieById(context: SDKContext, id: string): Promise<APIResponse<IMovie>>;
export declare function getMovieQuotes(context: SDKContext, id: string, queryParams?: QueryParameters): Promise<APIResponse<IQuote>>;
