import jwt from "express-jwt";
import { User } from "./models/User";

export default jwt({
    secret: process.env.JWT_SECRET!,
    requestProperty: 'headers.jwt',
    audience: "leaguemaster",
    issuer: "grandmaster",
    getToken: (req) => {
        if (req.headers.jwt) {
            return req.headers.jwt;
        }

        return req.body.jwt;
    },
});