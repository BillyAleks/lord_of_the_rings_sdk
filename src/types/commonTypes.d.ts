export type PaginationDetails = {
    total: number;
    limit: number;
    offset?: number;
    page?: number;
    pages?: number;
};

export type APIResponse<T> = PaginationDetails & {
    docs: T[];
};

export type QueryParameters = {
    limit?: number;
    offset?: number;
    page?: number;
    sort?: Record<string, string | number>;
    filter?: Record<string, string>;
};

export type LoggerParameter = {
    placement: string;
    method: string;
    error?: Error;
    payload?: Record<string, any>;
}

export type SerializedApiResponse<T> = { [key: string]: T[] } & { paginationInfo: PaginationDetails };

export type UtilityObject = {
    serializeApiResponse: <T>(data: APIResponse<T>, dataKey?: string ) => SerializedApiResponse<T> | T;
    validateRequest: (id: string) => void;
}

export type SDKContext = {
    fetch: <T>(path: string) => Promise<T>;
    queryBuilder: (queryParams: QueryParameters) => string;
    config: Record<string, any>;
    log: (logObject: LoggerParameter) => void;
    utils: UtilityObject;
};
