import "dotenv/config";
import express from "express";
import router from "./routes/routes";
import cors from "cors";
import { errorHandler } from "./toolServices/responseService";
import "reflect-metadata";
import dataSource from "./config/typeormConfig";

const NODE_PORT = process.env.NODE_PORT as string;

const main = () => {
    const app = express();

    app.use(cors());
    app.use(express.json());
    app.use(router);

    app.use(errorHandler);
    app.listen(NODE_PORT, () => console.log(`server is listening on port ${NODE_PORT}`));
};

dataSource
    .initialize()
    .then(main)
    .catch((e) => console.log(e));
