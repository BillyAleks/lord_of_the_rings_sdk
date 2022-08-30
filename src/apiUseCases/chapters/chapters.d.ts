import { SDKContext, QueryParameters, SerializedApiResponse } from '../../types/commonTypes';
import { IBook } from '../../index';
import { IBookWithChapterTitles } from '../books/books';

export declare interface IChapterExtended {
    _id: string;
    chapterName: string;
    book: IBook;
}

export declare function getAllChapters(context: SDKContext, params?: QueryParameters): Promise<SerializedApiResponse<IChapterExtended> | null>;
export declare function searchChaptersByName(context: SDKContext, name: string, params?: QueryParameters): Promise<SerializedApiResponse<IChapterExtended> | null>;
export declare function getAllBooksWithChapters(context: SDKContext): Promise<IBookWithChapterTitles[] | null>;
export declare function getChapter(context: SDKContext, id: string): Promise<IChapterExtended | null>;
