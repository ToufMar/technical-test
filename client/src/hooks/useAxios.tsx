import axios, { AxiosError } from "axios";
import React, { useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import env from "../dist/envConfig";

type Product = {
    uuid: string;
    price: string;
    name: string;
};

type Response = {
    statusCode: number;
    message: Product[];
};

type Error = {
    statusCode: number;
    message: any;
};

type RequestState = {
    loading: boolean;
    error: Error | null;
    data: Response | null;
};

export const useAxios = (): [RequestState, Record<string, Function>] => {
    const [requestState, setRequestState] = useState<RequestState>({
        loading: true,
        error: null,
        data: null,
    });
    const { push } = useHistory();
    const _handleError = (e: unknown | AxiosError) => {
        if (e instanceof AxiosError && e.response) {
            setRequestState({
                loading: false,
                error: { message: e.response.data.message, statusCode: e.response.status },
                data: null,
            });
        } else {
            setRequestState({
                loading: false,
                error: { message: "Unknown error", statusCode: 500 },
                data: null,
            });
        }
    };

    const getData = useCallback(async (url: string) => {
        try {
            setRequestState({
                loading: true,
                error: null,
                data: null,
            });
            const {
                data: { message, statusCode },
            } = await axios.get<Response>(env.API_URL + url);
            setRequestState({
                loading: false,
                error: null,
                data: { message, statusCode },
            });
            return message;
        } catch (e) {
            _handleError(e);
        }
    }, []);

    const postData = useCallback(async (url: string, body: any) => {
        try {
            setRequestState({
                loading: true,
                error: null,
                data: null,
            });
            const {
                data: { message, statusCode },
            } = await axios.post<Response>(env.API_URL + url, { ...body });
            setRequestState({
                loading: false,
                error: null,
                data: { message, statusCode },
            });
        } catch (e) {
            _handleError(e);
        }
    }, []);

    const deleteData = useCallback(async (url: string) => {
        try {
            setRequestState({
                loading: true,
                error: null,
                data: null,
            });
            return await axios({
                method: "DELETE",
                url: env.API_URL + url,
            });
        } catch (e) {
            _handleError(e);
        }
    }, []);

    return [requestState, { getData, postData, deleteData }];
};
