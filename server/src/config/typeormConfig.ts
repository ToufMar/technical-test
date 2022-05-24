import "dotenv/config";
import { DataSource, DeepPartial } from "typeorm";
import path from "path";
import { Product } from "../entities/Product";
import { createProductIfNotExists } from "../repositories/productRepository";

const rootDir = path.join(__dirname, "../../src");

const dataSource = new DataSource({
    type: "postgres",
    url: "postgres://postgres:marty@localhost:5432/postgres",
    synchronize: true,
    logging: false,
    entities: [rootDir + "/entities/**/*.ts"],
});

export default dataSource;

export const seedDatabase = async () => {
    for (let i = 0; i < 20; i++) {
        const product = new Product();
        product.name = `My Product - ${i}`;
        product.price = Math.random() * (200 - 0) + 0;
        await createProductIfNotExists(product);
    }
};
