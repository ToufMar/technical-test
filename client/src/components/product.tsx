import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

export const Product: React.FC = () => {
    const params = useParams();
    const [state, methods] = useAxios();
    useEffect(() => {
        methods.getData(`/?productUuids[]=${(params as any).uuid}`);
    }, []);

    return (
        <div>
            <h1>GET PRODUCT</h1>
            {state.error && <div>ERROR</div>}
            {state.loading && <div>LOADING</div>}
            {state.data && (
                <div>
                    <strong>Name:</strong> {state.data.message[0].name}
                    <strong>Price:</strong> {state.data.message[0].price}
                </div>
            )}
        </div>
    );
};
