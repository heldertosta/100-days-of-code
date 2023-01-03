require('dotenv').config();
let express = require('express');
let app = express();

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


 module.exports = app;