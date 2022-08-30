import { APIResponse, SDKContext, QueryParameters } from '../../types/commonTypes';

export declare interface IChapter {
    _id: string;
    chapterName: string;
    book: string;
}

export declare function getChapters(context: SDKContext, queryParams?: QueryParameters): Promise<APIResponse<IChapter>>;
export declare function getChapterById(context: SDKContext, id: string): Promise<APIResponse<IChapter>>;
