const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userName: {type:String},
  userTitle: {type: String}
})

userSchema.path('user')

const User = mongoose.model('User' , userSchema);
module.exports = User;

