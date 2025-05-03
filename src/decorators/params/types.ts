export enum ParamType{
    BODY = "body",
    PARAM= "param",
    QUERY = "query",
    HEADER = "header",
    REQUEST ="request",
    REAPONSE = "response"
}

export interface ParamMetadata {
    index: number; 
    type: ParamType;
    key?: string;
}