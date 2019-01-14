import * as DB from "../databaseConnection";
import { app } from "../app";
import supertest from "supertest";

beforeAll(() => {
    return DB.connectToDB();
});

afterAll(() => {
    return DB.endConnectionToDB();
});

test("Test the testing environment and the app bootstrap.", () => {
    return supertest(app).get("/")
        .then(response => {
            expect(response.status).toBe(200);
            expect(response.text).toBe("Grandmaster API");
        });
})