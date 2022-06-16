//Initialize all the things
const express = require('express');
const app = express();
const data = require('./data.json');
const bodyParser = require('body-parser');
app.set('view engine', 'pug');

//serve the static files!
app.use('/public', express.static('public'));

//render the landing page for this portfolio
app.get('/', (req, res) => {
	res.locals = data.projects;
	res.render('index', { projects: data.projects });
});

//render the about page for this portfolio + test a 500 error (commented out)
app.get('/about', (req, res, next) => {
	// const testError = new Error('uh oh');
	// testError.status = 500;
	// next(testError);
	res.render('about');
});

//Set variable routes using :id
app.get('/project/:id', (req, res, next) => {
	if (req.params.id < data.projects.length) {
		res.render('project', {
			projectName: data.projects[req.params.id].project_name,
			description: data.projects[req.params.id].description,
			technologies: data.projects[req.params.id].technologies,
			repo: data.projects[req.params.id].github_link,
			imageURLs: data.projects[req.params.id].image_urls,
		});
	}
	next();
});

//Handle 404 errors
app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	res.render('page-not-found', { err });
});

//Handle other errors
app.use((err, req, res, next) => {
	res.status(500);
	res.render('error', { err });
});

//Listen for this application on port 3000
app.listen(3000, () => {
	console.log('I think its working!');
});
