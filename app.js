// include and setup express
var express = require('express');
var bodyParser = require('body-parser');

// include express handlebars (templating engine)
var exphbs  = require('express-handlebars');

// specify the layour for our handlebars template
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

// respond to the get request with the home page
app.get('/', function (req, res) {
    res.render('home');
});

// respond to the get request with the about page
app.get('/about', function(req, res) {
  res.render('about');
});

// respond to the get request with the register page
app.get('/register', function(req, res) {
  res.render('register');
});

// handle the posted registration data
app.post('/register', function(req, res) {
  res.redirect('/quiz');
});

// respond to the get request with quiz page (and pass in some data into the template)
app.get('/quiz', function (req, res) {
    res.render('quiz', {
    	questions: [{
		    title: "Hello",
		    answer: "World!"
		},{
		    title: "Greetings",
		    answer: "Universe!"
		}]
    });
});

// create the server based on express
var server = require('http').createServer(app);

// start the server
server.listen(1337, '127.0.0.1', function () {
  console.log('Node.js + Express are looking good! Open http://localhost:%d to begin.', 1337);
});