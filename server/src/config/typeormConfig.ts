import "dotenv/config";
import { DataSource } from "typeorm";
import path from "path";

const rootDir = path.join(__dirname, "../../src");
const dataSource = new DataSource({
    type: "postgres",
    url: "postgres://postgres:marty@localhost:5432/postgres",
    synchronize: true,
    logging: false,
    entities: [rootDir + "/entities/**/*.ts"],
});

export default dataSource;
