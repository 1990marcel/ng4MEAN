var express = require('express');

var bodyParser = require('body-parser');

var cors = require('cors');

var path = require('path');

var app = express();

var index = require('./routes/index');
var users = require('./routes/users');

app.use(cors());
const port = 3000;


app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'views')));

app.use('/', index);
app.use('/api', users);


app.get('/', (req, res)=>{
	res.send('foobar');
});

app.listen(port,()=>{
	console.log('server is listening');
});
