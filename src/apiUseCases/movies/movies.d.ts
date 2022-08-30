import { SDKContext, QueryParameters, SerializedApiResponse, PaginationDetails } from '../../types/commonTypes';
import { IMovie, IQuote } from '../../index';

export declare interface IMovieWithChaptersResponse {
    name: string;
    quotes: Omit<IQuote, 'id'>[];
    paginationInfo: PaginationDetails;
}

export declare function getAllMovies(context: SDKContext, params?: QueryParameters): Promise<SerializedApiResponse<IMovie> | null>;
export declare function searchMovieByName(context: SDKContext, name: string, params?: QueryParameters): Promise<SerializedApiResponse<IMovie> | null>;
export declare function getMovie(context: SDKContext, id: string): Promise<IMovie | null>;
export declare function getQuotesOfMovie(context: SDKContext, id: string, params?: QueryParameters): Promise<IMovieWithChaptersResponse | null>;
