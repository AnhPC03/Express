const express = require('express');
const app = express();
const port = 2300;
var bodyParser = require('body-parser');


app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
	res.render('index.pug');
});


var users = [
			{ name : 'Anh', age : 20},
			{ name : 'Dai Boss', age : 18},
			{ name : 'Abc', age : 17},
			{ name : 'Def', age : 15}
		]
app.get('/newPage', (req, res) => {
	res.render('newPage/index.pug', {
		users : users
	});
});	

app.get('/newPage/search', (req, res) => {
	var q = req.query.q;
	var result = users.filter((user) => {
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
	users.push(req.body);
	res.redirect('/newPage');
});

app.listen(port, () => console.log(`Welcome to ExpressJS on port ${port}`));