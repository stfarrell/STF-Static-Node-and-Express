const express = require('express');
const app = express();
const data = require('./data.json');
const bodyParser = require('body-parser');
app.set('view engine', 'pug');

app.use('/public', express.static('public'));

app.get('/', (req, res) => {
	res.locals = data.projects;
	console.log(res.locals);
	res.render('index', { projects: data.projects });
});

app.get('/about', (req, res) => {
	res.render('about');
});

app.get('/project/:id', (req, res) => {
	console.log(req.params);
	res.render('project', {
		projectName: data.projects[req.params.id].project_name,
		description: data.projects[req.params.id].description,
		technologies: data.projects[req.params.id].technologies,
		repo: data.projects[req.params.id].github_link,
		imageURLs: data.projects[req.params.id].image_urls,
	});
});

app.use((req, res, next) => {
	const err = new Error('Not Found');
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	//res.locals = err;
	res.status(500);
	res.render('error', { err });
});

app.listen(3000, () => {
	console.log('I think its working!');
});
