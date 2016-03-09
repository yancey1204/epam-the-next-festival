var user = require('../models/user.js');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;


// Use Passport's 'serializeUser' method to serialize the user
passport.serializeUser(function(user, done) {
 done(null, user);
});

// Use Passport's 'deserializeUser' method to load the user document
passport.deserializeUser(function(user, done) {
 done(null, user);
});



passport.use(new LocalStrategy(
  (username, password, done) => {

    user.findOne({ email: username }, (err, user) => {
      console.log("validation");
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect email.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

user.register = (data,callback) => {
  var newUser =  new user(data);
  newUser.save((err, user)=>{
    if (!err) callback(user);
    else {
      console.log(err.errors);
    }
  })
}

user.login = (user) =>{
      console.log("yo");
  // passport.authenticate('local', { successRedirect: '/',
  //                                   failureRedirect: '/login',
  //                                   failureFlash: true })

}


module.exports = user;