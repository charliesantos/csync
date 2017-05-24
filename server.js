var express = require('express'),
    app = express(),
    port = parseInt(process.env.PORT, 10) || 3030;

app.use('/', express.static(__dirname + '/dist'));

app.route('/*').get((req, res) => {
  res.sendFile(__dirname + '/dist/index.html');
});

console.log('Server listening at ' + port);
app.listen(port);
