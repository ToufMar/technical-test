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
        <div>
            <h1>Product</h1>
            {state.loading && <p>LOADING</p>}
            {state.error && <p>ERROR</p>}
            {state.data && (
                <>
                    <div onClick={() => push("/create")}>
                        <button>Create product</button>
                    </div>
                    <ul>
                        {state.data.message.map((d) => (
                            <li key={randomKey()} style={{ listStyleType: "none", cursor: "pointer" }} onClick={() => push(`/${d.uuid}`)}>
                                <strong>Name:</strong> {d.name} - <strong>Price: </strong>
                                {d.price}
                            </li>
                        ))}
                    </ul>
                </>
            )}
        </div>
    );
};
