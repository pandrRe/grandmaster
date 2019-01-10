import "reflect-metadata";
import { createConnection } from "typeorm";
import config from "./dbconfig";
import { bootstrap } from "./bootstrap";

createConnection(config).then(connection => {
    const port = 3000;

    const app = bootstrap();

    app.listen(port, () => console.log(`Listening on port ${port}.`));
});