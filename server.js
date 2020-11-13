var express = require('express');
var path = require('path');
app = express();
port = process.env.PORT || 3000;

app.get('/',(req, res) => {
  res.sendFile(path.join(__dirname + '/simulator/src/main/web/index.html'));
});


app.listen(port);
console.log('server is running!! on port ' + port);