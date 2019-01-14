import jwt from "express-jwt";

export default jwt({
    secret: process.env.JWT_SECRET!,
    audience: "leaguemaster",
    issuer: "grandmaster",
    getToken: (req) => {
        if (req.headers.jwt) {
            return req.headers.jwt;
        }

        return req.body.jwt;
    },
});