var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {

  var options = {
    root: __dirname + '/public',
  }

  res.sendFide('index.html', options);

});

app.get('/resume', function (req, res) {

  var options = {
    root: __dirname + '/public',
  }

  res.sendFile('resume.html', options);

});

app.listen(8080, function () {
  console.log('Server running on port 8080');
});
