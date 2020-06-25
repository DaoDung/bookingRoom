var JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    FacebookStrategy = require('passport-facebook').Strategy;
// load up the user model
var User = require('../models/user');
var config = require('../config/database'); // get db config file
var configAuth = require('./auth');
module.exports = function(passport) {
    var opts = {};
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.secretOrKey = config.secret;
    passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
        User.findOne({id: jwt_payload.id}, function(err, user) {
            if (err) {
                return done(err, false);
            }
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        });
    }));

    passport.use(new FacebookStrategy({
        // điền thông tin để xác thực với Facebook.
        // những thông tin này đã được điền ở file auth.js
        clientID: configAuth.facebookAuth.clientID,
        clientSecret: configAuth.facebookAuth.clientSecret,
        callbackURL: configAuth.facebookAuth.callbackURL,
        profileFields: ['id','displayName','email','first_name','last_name','middle_name']
    },
    // Facebook sẽ gửi lại chuối token và thông tin profile của user
    function (token, refreshToken, profile, done) {
        // asynchronous
        process.nextTick(function () {
            // tìm trong db xem có user nào đã sử dụng facebook id này chưa
        
            User.findOne({'facebook.id': profile.id}, function (err, user) {
                if (err)
                    return done(err);
                // Nếu tìm thấy user, cho họ đăng nhập
                if (user) {
                    return done(null, user); // user found, return that user
                } else {
                    // nếu chưa có, tạo mới user
                    var newUser = new User();
                    // lưu các thông tin cho user
                    newUser.username = profile.displayName
                    newUser.facebook.id = profile.id;
                    newUser.facebook.token = token;
                    newUser.facebook.name = profile.displayName; // bạn có thể log đối tượng profile để xem cấu trúc
                    newUser.facebook.email = profile.emails[0].value; // fb có thể trả lại nhiều email, chúng ta lấy cái đầu tiền
                    // lưu vào db
                    newUser.save(function (err) {
                        if (err)
                            throw err;
                        // nếu thành công, trả lại user
                        return done(null, newUser);
                    });
                }
            });
        });
    }));
    passport.serializeUser(function(user, done) {
        done(null, user);
      });
      
      passport.deserializeUser(function(user, done) {
        done(null, user);
      });
};