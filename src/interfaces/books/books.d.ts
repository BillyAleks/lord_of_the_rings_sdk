import { APIResponse, SDKContext, QueryParameters } from '../../types/commonTypes';
import { IChapter } from '../chapters/chapters';

export declare interface IBook {
    _id: string;
    name: string;
}

export declare function getBooks(context: SDKContext, queryParams?: QueryParameters): Promise<APIResponse<IBook>>;
export declare function getBookById(context: SDKContext, id: string): Promise<APIResponse<IBook>>;
export declare function getBooksChapters(context: SDKContext, id: string, queryParams?: QueryParameters): Promise<APIResponse<Omit<IChapter, 'book'>>>;
