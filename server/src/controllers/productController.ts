import express, { NextFunction } from "express";
import { Product } from "../entities/Product";
import { createProduct, createProductIfNotExists, deleteManyProducts, getManyProducts, updateProduct } from "../repositories/productRepository";

interface TypedRequestBody<T> extends express.Request {
    body: T;
}

type CreateProductInput = {
    name: string;
    price: number;
};

type UpdateProductInput = {
    uuid: string;
    name: string;
    price: number;
};

export const createProductController = async (req: TypedRequestBody<CreateProductInput>, res: express.Response, next: NextFunction) => {
    try {
        const product = await createProduct(req.body);
        return res.status(200).send({ message: product });
    } catch (e) {
        next(e);
    }
};

export const getManyProductController = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        const products = await getManyProducts(req.query.productUuids as string[]);
        res.status(200).send({ message: products });
    } catch (e) {
        next(e);
    }
};

export const updateProductController = async (req: TypedRequestBody<UpdateProductInput>, res: express.Response, next: NextFunction) => {
    try {
        const product = await updateProduct({
            where: {
                where: {
                    uuid: req.body.uuid,
                },
            },
            set: { ...(req.body as Product) },
        });
        return res.status(200).send(product);
    } catch (e) {
        next(e);
    }
};

export const deleteManyProductController = async (req: express.Request, res: express.Response, next: NextFunction) => {
    try {
        await deleteManyProducts([req.params.productUuids]);
        return res.status(204);
    } catch (e) {
        next(e);
    }
};
