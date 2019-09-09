const express = require('express');
const app = express();
const port = 2300;
var bodyParser = require('body-parser');

const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapter = new FileSync('db.json');
const db = low(adapter);

const shortid = require('shortid');


app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
	res.render('index.pug');
});

db.defaults({users: []}).write();

// view user
app.get('/users/:id', (req, res) => {
	const id = req.params.id;
	const user = db.get("users").find({ id : id}).value();
	res.render('newPage/view.pug', {
		user: user
	});
});
app.get('/newPage', (req, res) => {
	res.render('newPage/index.pug', {
		users : db.get('users').value()
	});
});	

app.get('/newPage/search', (req, res) => {
	var q = req.query.q;
	var result = db.get("users").value().filter((user) => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('newPage/index.pug', {
		users : result,
	});
});

app.get('/newPage/create', (req, res) => {
	res.render('newPage/create.pug');
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded
app.post('/newPage/create', (req, res) => {
	req.body.id = shortid.generate();
	db.get("users").push(req.body).write();
	res.redirect('/newPage');
});

app.listen(port, () => console.log(`Welcome to ExpressJS on port ${port}`));