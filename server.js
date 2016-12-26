const fs = require('fs');
const express = require('express');
const hbs = require('hbs');

const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

// logger
app.use(function(req, res, next){
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;
    console.log(log);
    fs.appendFile('server.log', log + '\n', function(err){
        if(err){
            console.log('Unable to save to log file');
        }
    });
    next();
});

// under maintenance
/*app.use(function(req, res, next){
    res.render('maintenance', {
        pagetitle: 'Under Maintenance...'
    });
});*/

hbs.registerHelper('getCurrentYear', function(){
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', function(text){
    return text.toUpperCase();
});


app.get('/', function(req, res){
    res.render('home', {
        pagetitle: 'Home'
    });
});

app.get('/maintenance', function(req, res){
    res.render('maintenance', {
        pagetitle: 'Under Maintenance...'
    });
});

app.get('/about', function(req, res){
    res.render('about', {
        pagetitle: 'About'
    });
});

app.get('/bad', function(req, res){
    res.send({
        err: 'No Page'
    });
});

app.listen(port, function(){
    console.log(`Server is up on port ${port}`);
});