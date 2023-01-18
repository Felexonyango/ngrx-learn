import {User} from "../model/user"
import { Strategy, ExtractJwt, StrategyOptions } from "passport-jwt";
import {JWT_SECRET_KEY} from  "../config/index"

const opts: StrategyOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET_KEY
};

export default new Strategy(opts, async (payload, done) => {
    try {
        const user = await User.findById(payload.id);
        if (user) {
            return done(null, user);
        }
        return done(null, false);
    } catch (error) {
        console.log(error);
    }
});