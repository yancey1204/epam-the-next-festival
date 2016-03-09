var article = require('../models/article.js');

article.getAllArticles = (callback) => {
  article.find({},null,(err,data) => {
    console.log('mogodbServer get all articles');
    callback(data);
  });
}

article.getArticleById = (id,callback) => {
  article.find({_id:id},(err,data) => {
    console.log('mongodbServer getArticle by id');
    callback(data);
  })
}

article.createNewArticle = (data,callback) => {
  var newArticle =  new article(data);
  newArticle.save((err) => {
    if (!err) {
      callback();
    }
  })
}

module.exports = article;