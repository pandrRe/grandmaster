import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import config from "./dbconfig";
import { JWTConfig } from "./jwt_config";

import * as Route from "./routes";

createConnection(config).then(async (connection) => {
    JWTConfig();

    const app = express();
    const port = 3000;

    app.use(express.json());

    app.use("/", Route.Base);
    app.use("/user", Route.User);

    app.listen(port, () => console.log(`Listening on port ${port}.`));
});