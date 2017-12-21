const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

app.use((req, res, next) => {

		let now = new Date().toString();
		let log = `${now}:${req.method} ${req.url}`;
		console.log(log);
		fs.appendFile('server.log', log + '\n')
		next();
});

// app.use((req, res, next) => { 		res.render('maintenance.hbs'); });

app.use(express.static(__dirname + '/public'));

hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('getCurrentYear', () => {
		return new Date()
});

hbs.registerHelper('screamIt', (text) => text.toUpperCase());

app.set('view engine', 'hbs')

app.get('/', (req, res) => {
		res.render('home.hbs', {
				pageTitle: 'Home page',
				welcomeMessage: 'welcome to my websit'
		})
});

app.get('/about', (req, res) => {
		res.render('about.hbs', {pageTitle: 'About page'});
})

app.get('/projects', (req, res) => {
		res.render('projects.hbs', {pageTitle: 'Projects'})
})

app.listen(port,"localhost", () => {
		console.log(`Server is up on port ${port}`)
})