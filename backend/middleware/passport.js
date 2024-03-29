var JwtStrategy = require("passport-jwt").Strategy,
  ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const userModel = require("../model/user");
var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "Jai Siya Ram";

passport.use(
  new JwtStrategy(opts, function (jwt_payload, done) {
    userModel
      .findOne({ _id: jwt_payload.id })
      .then((user) => {
     
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
          // or you could create a new account
        }
      })
      .catch((err) => {
        return done(err, false);
      });
  })
);
