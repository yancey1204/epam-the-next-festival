var mongoose = require('mongoose');

// connect to database
var Schema = mongoose.Schema;

// create a Schema for Articles
var UserSchema = new Schema({
  name    : String,
  email   : {
    type: String,
    required: true,
    validate: {
      validator: (email) => {
          var regx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return regx.test(email);
        },
      message: '{VALUE} is not a valid phone number!'
    }
  },
  password: {
    type: String,
    required: true,
    validate: {
      validator: (pass) => {
          var regx = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
          return regx.test(pass);
        },
      message: '{VALUE}Contain at least 8 characters, 1 number,1 lowercase,1 uppercase)'
    }
  }
});

module.exports = mongoose.model('User',UserSchema);