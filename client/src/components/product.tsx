import React from "react";
import { useParams } from "react-router-dom";

export const Product: React.FC = () => {
    const params = useParams();

    return (
        <div>
            <h1>GET PRODUCT</h1>
        </div>
    );
};
