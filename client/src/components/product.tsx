import React, { useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

export const Product: React.FC = () => {
    const params = useParams();
    const [state, methods] = useAxios();

    useEffect(() => {
        methods.getData(`/?productUuids[]=${(params as any).uuid}`);
    }, []);

    const deleteProduct = () => {
        methods.deleteData("/" + (params as any).uuid);
    };

    return (
        <div className="container w-25">
            <h1>GET PRODUCT</h1>
            {state.error && <div>ERROR</div>}
            {state.loading && <div>LOADING</div>}
            {state.data && (
                <div className="mt-5">
                    <div>
                        <button className="btn btn-warning mx-1">Update Product</button>
                        <button className="btn btn-danger mx-1" onClick={deleteProduct}>
                            Delete Product
                        </button>
                    </div>
                    <div className="card mt-5">
                        <strong>Name:</strong> {state.data.message[0].name}
                        <strong>Price:</strong> {state.data.message[0].price}
                    </div>
                </div>
            )}
        </div>
    );
};
