const express = require('express');
var bodyParser = require('body-parser');

var routerUser = require('./router/user.router.js');

const app = express();
const port = 1523;

app.set('views', './views');
app.set('view engine', 'pug');


app.get('/', (req, res) => {
	res.render('index.pug');
});

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.use('/newPage', routerUser);

app.listen(port, () => console.log(`Welcome to ExpressJS on port ${port}`));