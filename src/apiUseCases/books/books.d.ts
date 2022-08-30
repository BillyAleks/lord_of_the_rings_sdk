import { SDKContext, QueryParameters, SerializedApiResponse, PaginationDetails } from '../../types/commonTypes';
import { IBook, IChapter } from '../../index';

export declare interface IBookWithChaptersResponse {
    book: IBook;
    bookChapters: Omit<IChapter, 'book'>[];
    paginationInfo: PaginationDetails;
}

export declare interface IBookWithChapterTitles {
    bookName: string;
    chapters: string[];
}

export declare function getBookList(context: SDKContext, params?: QueryParameters): Promise<SerializedApiResponse<IBook> | null>;
export declare function searchBooksByName(context: SDKContext, name: string, params?: QueryParameters): Promise<SerializedApiResponse<IBook> | null>;
export declare function getBookTitles(context: SDKContext): Promise<string[] | null>;
export declare function getBook(context: SDKContext, id: string): Promise<IBook | null>;
export declare function getBookWithChapters(context: SDKContext, id: string, params?: QueryParameters): Promise<IBookWithChaptersResponse | null>;
export declare function getBookWithChaptersTitles(context: SDKContext, id: string): Promise<IBookWithChapterTitles | null>;
