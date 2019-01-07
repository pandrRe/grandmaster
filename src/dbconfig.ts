import * as dotenv from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
dotenv.config();

const config: PostgresConnectionOptions = {
    "type": "postgres",
    "schema": "public",
    "host": process.env.DB_HOST!,
    "port": +process.env.DB_PORT!,
    "username": process.env.DB_USER!,
    "password": process.env.DB_PASSWORD!,
    "database": process.env.DB_NAME!,
    "synchronize": true,
    "logging": false,
    "entities": [
        __dirname + "/models/*.js"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
};

export default config;