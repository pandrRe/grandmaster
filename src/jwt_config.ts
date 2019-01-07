import { Strategy, ExtractJwt, VerifiedCallback } from "passport-jwt";
import { User } from "./models/User";
import passport from "passport";

export function JWTConfig() {
    const [secretOrKey, issuer, audience] = [process.env.JWT_SECRET!, "grandmaster", "leaguemaster"];
    
    const options = {
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

    passport.use("jwt", new Strategy(options, strategy));
}