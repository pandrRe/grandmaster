import express from "express";
import * as Route from "./routes";
import { authError } from "./middlewares/authError";
import { serverError } from "./middlewares/serverError";

export function bootstrap() {
    const app = express();

    //Setup global middlewares.
    app.use(express.json());

    //Setup ALL routes.
    app.use("/", Route.Base);
    app.use("/user", Route.User);
    app.use("/tournament", Route.Tournament);

    //Setup error-handling middlewares.
    app.use(authError());
    app.use(serverError());

    return app;
}