var express = require('express');
var router = express.Router();
var _ = require('underscore');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/epam');
var Schema = mongoose.Schema;

// create a Schema for Articles
var ArticleSchema = new Schema({
	title: String,
	url: String,
	image: String,
	username: String,
	date: Date
});

mongoose.model('Article',ArticleSchema);

var Article = mongoose.model('Article');



// note that typically data would NOT be loaded from the filesystem in this manner :)

router.get('/articles', function(req, res, next) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-Requested-Width');
	console.log('mogodbServer getArticles');
	Article.find({},null,{sort:{date:-1}},function(err,data){
		res.json(data);
	});

});

router.get('/articles/:id', function(req, res, next) {
	res.header('Access-Control-Allow-Origin','*');
	res.header('Access-Control-Allow-Headers','X-Requested-Width');
	console.log('mogodbServer getArticles by id: ',req.params.id);
	Article.findById(req.params.id,function(err,article){
		if(!err){
			res.json(article);
		}
		else{
			res.send(404,'file not found');
		}
	})

});

module.exports = router;