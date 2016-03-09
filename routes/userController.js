var user = require('../models/user.js');

user.register = (data,callback) => {
  var newUser =  new user(data);
  newUser.save((err, user)=>{
    if (!err) callback(user);
    else {
      console.logg(err.errors);
    }
  })
}


module.exports = user;