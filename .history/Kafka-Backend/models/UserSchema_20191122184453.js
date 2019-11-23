var mongoose = require('mongoose');
var Schema = mongoose.Schema;

//schema
UserSchema = new Schema({
  
  username: {
    type: String,
    default: ''
  },

  firstName: {
    type: String,
    default: ''
  },

  lastName: {
    type: String,
    default: ''
  },

  email: {
    type: String,
    default: ''
  },

  city: {
    type: String,
    default: ''
  },

  state: {
    type: String,
    default: ''
  },

  zipcode: {
    type: Int,
    default: ''
  },


  buyerPassword: {
    type: String,
    default: ''
  },

  buyerImg: {
    type: String,
    default: ''
  },
  
  buyerPhoneNumber: {
    type: String,
    default: ''
  },
  
  buyerAddress: {
    type: String,
    default: ''
  },
});
    
module.exports = mongoose.model('Users', UserSchema);