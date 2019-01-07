import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { User } from "./models/User";
import passport from "passport";

export function JWTConfig() {
    const [secretOrKey, issuer, audience] = [process.env.JWT_SECRET!, "grandmaster", "leaguemaster"];

    const post_options = {
        jwtFromRequest: ExtractJwt.fromBodyField("jwt"),
        secretOrKey, issuer, audience,
    };
    
    const get_options = {
        jwtFromRequest: ExtractJwt.fromHeader("jwt"),
        secretOrKey, issuer, audience
    }

    const strategy = (payload: any, done: VerifiedCallback) => {
        return User.findOne({id: payload.id})
            .then(user => {
                if (user) {
                    return done(null, user);
                }

                return done(null, false);
            })
            .catch(e => {
                done(e, false);
            });
    };

    passport.use("jwt_post", new Strategy(post_options, strategy));
    passport.use("jwt_get", new Strategy(get_options, strategy));
}