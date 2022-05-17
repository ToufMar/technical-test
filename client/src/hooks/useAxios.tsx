import axios, { AxiosError } from "axios";
import React, { useCallback, useState } from "react";

type Response = {
    statusCode: number;
    message: any;
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
            } = await axios.get<Response>(url);
            setRequestState({
                loading: false,
                error: null,
                data: { message, statusCode },
            });
        } catch (e) {
            _handleError(e);
        }
    }, []);

    const postData = useCallback(async (url: string) => {
        try {
            setRequestState({
                loading: true,
                error: null,
                data: null,
            });
            const {
                data: { message, statusCode },
            } = await axios.post<Response>(url);
            setRequestState({
                loading: false,
                error: null,
                data: { message, statusCode },
            });
        } catch (e) {
            _handleError(e);
        }
    }, []);

    return [requestState, { getData }];
};
