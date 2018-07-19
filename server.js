var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
app.use(session({
  secret: 'kowasekowase',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 60000 }
}))
app.use(bodyParser.json());

// Require path
var path = require('path');

// Setting our Static Folder Directory
app.use(express.static(path.join(__dirname, './public/dist/public')));

require('./server/config/mongoose.js')();
require('./server/config/routes.js')(app);
app.listen(8000, function() {
    console.log("listening on port 8000");
})
