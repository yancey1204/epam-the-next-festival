var mongoose = require('mongoose');

// connect to database
var Schema = mongoose.Schema;

// create a Schema for Articles
var ArticleSchema = new Schema({
  title: String,
  image: String,
  location: String,
  date: String,
  content: String
});
 mongoose.model('Article',ArticleSchema);
module.exports = mongoose.model('Article');
