var express = require('express');
var router = express.Router();
var db = require('../db.js');
var shortid = require('shortid');

router.get('/', (req, res) => {
	res.render('newPage/index.pug', {
		users : db.get('users').value()
	});
});	

router.get('/:id', (req, res) => {
	const id = req.params.id;
	const user = db.get("users").find({ id : id}).value();
	res.render('./newPage/view.pug', {
		user: user
	});
});

router.get('/search', (req, res) => {
	var q = req.query.q;
	var result = db.get("users").value().filter((user) => {
		return user.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	res.render('./newPage/index.pug', {
		users : result
	});
});

router.get('/create', (req, res) => {
	res.render('./newPage/create.pug');
});

router.post('/create', (req, res) => {
	req.body.id = shortid.generate();
	console.log(req.body.id);
	db.get("users").push(req.body).write();
	res.redirect('/newPage');
});


module.exports = router;