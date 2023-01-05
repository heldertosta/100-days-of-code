require('dotenv').config();
let express = require('express');
let app = express();
let bodyParser = require('body-parser');

app.use((req, res, next) => {
  console.log(req.method + ' ' + req.path + ' - ' + req.ip);
  next();
});

app.use(bodyParser.urlencoded({ extended: false}));

app.use(bodyParser.json());

app.use('/public', express.static(__dirname + '/public'));

app.get('/json', (req, res) => {
  if(process.env.MESSAGE_STYLE == 'uppercase'){
    res.json({"message": "HELLO JSON"});
  } else {
    res.json({"message": "Hello json"});
  }
});

app.get('/', function(req, res) {
  //res.send("Hello Express");
  res.sendFile(__dirname + '/views/index.html');
});

app.get('/teste', (req, res) => {
  console.log(req);
});

app.get('/now', (req, res, next) => {
  req.time = new Date().toString();
  next();
}, (req, res) => {
  res.json({"time": req.time});  
});

app.get('/:word/echo', (req, res) => {
  res.json({"echo": req.params.word});
});

app.get('/name', (req, res) => {
  res.json({"name": req.query.first + " " + req.query.last});
})

//app.route(path).get(handler).post(handler)


 module.exports = app;