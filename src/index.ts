import "reflect-metadata";
import { createConnection } from "typeorm";
import express from "express";
import config from "./dbconfig";

import * as Route from "./routes";

createConnection(config).then(async (connection) => {
    console.log(connection.entityMetadatas);
    const app = express();
    const port = 3000;

    app.use("/", Route.Base);

    app.listen(port, () => console.log(`Listening on port ${port}.`));
});