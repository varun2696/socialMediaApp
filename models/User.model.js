const mongoose = require('mongoose');


// name ==> String
// email ==> String
// gender ==> String
// password ==> String

const userSchema = mongoose.Schema({
  name:{type: String, required:true},
  email:{type: String, required:true},
  gender:{type: String, required:true},
  password:{type: String, required:true}
})

const UserRegModel = mongoose.model('user', userSchema);

module.exports = {
    UserRegModel
}