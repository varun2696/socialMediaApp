const mongoose = require('mongoose');

// title ==> String
// body ==> String
// device ==> String

// ==> Where device is the one from which the post has been made, it can be "PC", "TABLET", "MOBILE"

const postsSchema = mongoose.Schema({
  title:{type: String, required:true},
  body:{type: String, required:true},
  device:{type: String, required:true},
  userName:{type: String, required:true},
  userId:{type: String, required:true}
})

const PostsModel = mongoose.model('post', postsSchema);

module.exports = {
    PostsModel
}