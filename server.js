// <---------- Server setup ---------->
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');

// <---------- Dependencies ---------->
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(session({
    secret: 'surveyformsecsesh',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 60000}
}))

// <---------- Routing ---------->
// Root
app.get('/', function(req, res) {
    res.render('index', {title: "survey form"});
})

// New
app.post('/new', function(req, res) {
    console.log(req.body);
    req.session.body = req.body;
    res.redirect('/result');
})

// Result
app.get('/result', function(req, res) {
    res.render('result', {title: "survey result", results: req.session.body});
})

// <---------- Port listening ---------->
app.listen(8000, function() {
    console.log('listening on port 8000...')
})