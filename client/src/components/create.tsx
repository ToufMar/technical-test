import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useAxios } from "../hooks/useAxios";

export const Create: React.FC = () => {
    const [, { postData }] = useAxios();
    const [formInput, setFormInput] = useState({});
    const { push } = useHistory();

    const onChange = (e: any) => {
        setFormInput({ ...formInput, [e.target.name]: e.target.value });
    };
    const onSubmit = (e: any) => {
        e.preventDefault();
        postData("/", { ...formInput }).then(() => push("/"));
    };

    return (
        <div className="container h-100 d-flex flex-column align-items-center justify-content-center">
            <h1>CREATE PRODUCT</h1>
            <div className="d-flex justify-content-center">
                <div className="card">
                    <div className="card-body">
                        <form onSubmit={onSubmit}>
                            <div className="form-group">
                                <label htmlFor="name">Name:</label>
                                <input placeholder="Name" className="form-control" type="text" name="name" id="name" onChange={onChange} />
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="name">Price:</label>
                                <input placeholder="Price" className="form-control" type="text" name="price" id="name" onChange={onChange} />
                            </div>
                            <button type="submit" className="btn btn-primary">
                                Create Product
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};
