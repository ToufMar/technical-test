import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

const randomKey = () => {
    return (Math.random() * (2000 - 1) + 1).toString();
};

export const Home: React.FC = () => {
    const [state, methods] = useAxios();
    const { push } = useHistory();

    useEffect(() => {
        methods.getData("/");
    }, [methods.getData]);

    if (state.loading) {
        return <p>LOADING</p>;
    }
    if (state.error) {
        return <p>ERROR</p>;
    }

    return (
        <div className="container">
            <h1>Product</h1>
            {state.loading && <p>LOADING</p>}
            {state.error && <p>ERROR</p>}
            {state.data && (
                <>
                    <div onClick={() => push("/create")}>
                        <button className="btn btn-primary">Create product</button>
                    </div>
                    <div className="d-flex flex-wrap justify-content-center">
                        {state.data.message.map((d) => (
                            <div
                                onClick={() => push(`/${d.uuid}`)}
                                style={{ minHeight: "100px", minWidth: "200px", cursor: "pointer" }}
                                className="card mx-3 my-3"
                            >
                                <div className="card-text d-flex flex-column">
                                    <strong>Name:</strong> {d.name} - <strong>Price: </strong>
                                    <div className="card-text">{d.price}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
};
