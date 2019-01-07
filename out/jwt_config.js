"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_jwt_1 = require("passport-jwt");
const User_1 = require("./models/User");
const passport_1 = __importDefault(require("passport"));
function JWTConfig() {
    const [secretOrKey, issuer, audience] = [process.env.JWT_SECRET, "grandmaster", "leaguemaster"];
    const post_options = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromBodyField("jwt"),
        secretOrKey, issuer, audience,
    };
    const get_options = {
        jwtFromRequest: passport_jwt_1.ExtractJwt.fromHeader("jwt"),
        secretOrKey, issuer, audience
    };
    const strategy = (payload, done) => {
        return User_1.User.findOne({ id: payload.id })
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
    passport_1.default.use("jwt_post", new passport_jwt_1.Strategy(post_options, strategy));
    passport_1.default.use("jwt_get", new passport_jwt_1.Strategy(get_options, strategy));
}
exports.JWTConfig = JWTConfig;
