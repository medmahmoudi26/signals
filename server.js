//require packages
const express = require('express');
const BodyParser = require('body-parser');
const ejs = require('ejs');
const session = require('express-session');
const mongoose = require('mongoose');
//const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('connect-flash');

// server
var app = express();

// connecting to database
var server = require('http').createServer(app);
var db = mongoose.connect('mongodb://localhost:27017/signals');

// passport

// session and passport
app.use(session({secret:'signals'}));
app.use(passport.initialize());
app.use(passport.session());

// flash
app.use(flash());
app.use(function (req,res,next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  next();
});

// set app and requirements
app.set('view engine', 'ejs');
app.use(express.static(__dirname+'/public'));
app.use(BodyParser.urlencoded());
app.use(BodyParser.json());
app.use(session({
  secret: 'signals'
}));

// routes
indexRoutes  = require("./routes/index.js");
user         = require("./routes/user.js");

app.use("/", indexRoutes);

// listen
app.listen(80);
console.log("Listening on port 80");