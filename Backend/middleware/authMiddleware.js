// middleware/authMiddleware.js
import passport from 'passport';
import passportJWT from 'passport-jwt';
import { secret } from '../config';

const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;

passport.use(
	new JWTStrategy(
		{
			jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
			secretOrKey: secret.key,
		},
		(jwtPayload, done) => {
			return done(null, jwtPayload.userId);
		}
	)
);

export default passport.authenticate('jwt', { session: false });
