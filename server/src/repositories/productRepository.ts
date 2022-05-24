import { DeepPartial, FindOneOptions, In } from "typeorm";
import dataSource from "../config/typeormConfig";
import { Product } from "../entities/Product";

export const createProductIfNotExists = async (params: DeepPartial<Product>): Promise<Product | null> => {
    const repository = dataSource.getRepository(Product);
    const product = await repository.findOne({ where: { name: params.name } });
    if (!product) {
        return await repository.save(params);
    }
    return null;
};

export const createProduct = async (params: DeepPartial<Product>): Promise<Product | null> => {
    const repository = dataSource.getRepository(Product);
    const product = new Product();
    product.name = params.name as string;
    product.price = params.price as number;
    return await repository.save(product);
};

export const updateProduct = async ({ where, set }: { where: FindOneOptions<Product>; set: Product }): Promise<Product> => {
    const repository = dataSource.getRepository(Product);
    const product = await repository.findOneOrFail(where);
    return await repository.save({ ...product, ...set });
};

export const getManyProducts = async (productUuids: string[] | undefined) => {
    const repository = dataSource.getRepository(Product);
    if (!productUuids) {
        return repository.find();
    }
    return await repository.find({ where: { uuid: In(productUuids) } });
};

export const deleteManyProducts = async (productUuids: string[]) => {
    const repository = dataSource.getRepository(Product);
    return await repository.delete(productUuids);
};
