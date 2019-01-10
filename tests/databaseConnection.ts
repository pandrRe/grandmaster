import { createConnection, Connection } from "typeorm";
import * as dotenv from "dotenv";
import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";
dotenv.config();

const testConfig: PostgresConnectionOptions = {
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
        __dirname + "/../src/models/*.ts"
    ],
    "migrations": [
        "src/migration/**/*.ts"
    ],
    "subscribers": [
        "src/subscriber/**/*.ts"
    ],
};

let testConnection: {
    connection: Connection | null,
    isInitialized: boolean,
} = {connection: null, isInitialized: false};

export function connectToDB() {
    return createConnection(testConfig)
        .then( connection => {
            testConnection.connection = connection;
            testConnection.isInitialized = true;
        });
}

export async function endConnectionToDB(tablesToTruncate: string[] = []) {
    const queryRunner = testConnection.connection!.createQueryRunner();
    await queryRunner.connect();
    tablesToTruncate.forEach(async table => {
        await queryRunner.query(`TRUNCATE ${table}`);
    });

    await testConnection.connection!.close()
    testConnection.connection = null;
    testConnection.isInitialized = false;
}