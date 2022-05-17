import express from "express";

export type ResponseBody = Record<"message", Record<string, any> | string | Array<any>>;

export class Error {
    public code: number;
    public body: ResponseBody;

    constructor(code: number, body: ResponseBody) {
        this.code = code;
        this.body = body;
    }
}

export const badRequest = (message: ResponseBody) => {
    throw new Error(400, message);
};
export const unauthorizedRequest = (message: ResponseBody) => {
    throw new Error(401, message);
};
export const forbiddenRequest = (message: ResponseBody) => {
    throw new Error(403, message);
};
export const internalServerError = () => {
    throw new Error(500, { message: "Internal Server Error" });
};

export const errorHandler = (err: Error | any, req: express.Request, res: express.Response, next: express.NextFunction) => {
    console.log(err);
    if (err instanceof Error) {
        return res.status(err.code).send({ statusCode: err.code, ...err.body });
    }
    return res.status(500).send({ statusCode: 500, message: "Internal Server Error" });
};
