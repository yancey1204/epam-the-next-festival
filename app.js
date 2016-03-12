// include and setup express
var express = require('express');
var bodyParser = require('body-parser');
var _ = require('underscore');
var mongoose = require('mongoose');

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var session = require('express-session');


// connect to database
mongoose.connect('mongodb://localhost/epam');


// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layout for our handlebars template
var hbs = exphbs.create({defaultLayout: 'main'});

// crethe the express app
var app = express();

// setup handlebars
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// express middleware that parser the key-value pairs sent in the request body in the format of our choosing (e.g. json)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// setup our public directory (which will serve any file stored in the 'public' directory)
app.use(express.static('public'));

var articleController = require('./routes/articleController');
var userController = require('./routes/userController');

app.use(session({ secret: 'anything' }));
app.use(passport.initialize());
app.use(passport.session());


app.use((req, res, next) => {
	res.locals.scripts = [];

	if (req.user) {
		req.session.user = req.user;
		console.log("session: ", req.session, "\nreq.user: ",req.user, "\nreq: ",req);
		res.locals.user = req.user;
	}

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

app.get('/register', (req, res) => {
	res.render('register');
});

app.post('/register', (req, res) => {
	userController.register(req.body,(user) => {
		res.render('dashboard', {user:user});
	})
});

app.get('/login', (req, res) => {
	res.render('login');
});

app.post('/login', passport.authenticate('local', {
	    successRedirect: '/dashboard',
	    failureRedirect: '/login'})
);

var isAuthenticated = function (req,res,next) {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

app.get('/dashboard',isAuthenticated,(req, res) => {
	res.render('dashboard');
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