// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var mongoose = require('mongoose');

// connect to database
mongoose.connect('mongodb://localhost/epam');


// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});

// crethe the express app
var app = express();

// var api = require('./routes/api');
var articleController = require('./routes/articleController');
var userController = require('./routes/userController');

// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));

app.use((req, res, next) => {
	res.locals.scripts = [];
	next();
});

// respond to the get request with the home page
app.get('/', (req, res) => {
	articleController.getAllArticles((data) => {
		res.render('home',{articles: data});
	});
});

// respond to the get specific article by id
app.get('/article/:id', (req, res) => {
	articleController.getArticleById(req.params.id, (data) => {
		res.render('article',{article: data[0]});
	});
});

// respond to the get request with the about page
app.get('/about', (req, res) => {
	res.render('about');
});

// respond to the get request with the register page
app.get('/register', (req, res) => {
	res.render('register');
});

// handle the posted registration data
app.post('/register', (req, res) => {
  // get the data out of the request (req) object
	userController.register(req.body,(user) => {
		res.render('dashboard', {user:user});
	})

});

// respond to the get request with dashboard page (and pass in some data into the template / note this will be rendered server-side)
app.get('/dashboard',  (req, res) => {
	res.render('dashboard', {
		stuff: [{
			greeting: "Hello",
			subject: "World!"
		}]
	});
});

app.post('/dashboard',  (req, res) => {
	articleController.createNewArticle(req.body,() => {
		res.redirect('/');
	});
});


// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1',  () => {
	console.log('The Next XYZ is looking good! Open http://localhost:%d to begin.', 1337);
});