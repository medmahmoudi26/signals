var express = require("express");
var bcrypt  = require("bcrypt-nodejs"); 
var fs      = require("fs");

var router = express.Router();

var User = require("../models/user");

router.get("/", function(req, res) {
    res.render("index");
});

router.get("/register", function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/user");
    } else {
        res.render("register");
    }
});

router.post("/register", function(req, res) {
    if (req.isAuthenticated()) {
        res.redirect("/user");
    } else {
        var hashedpass = bcrypt.hashSync(req.body.password, 10);
        User.create({
            name     : req.body.name,
            surname  : req.body.surname,
            email    : req.body.surname,
            password : hashedpass,
            RH       : rh
        }, function(error, success){
            if (error) res.render("register", {error: error}); // change error message with email already exists
            else if (success) {
                req.flash("success_msg", "Compte crée, vous pouvez connecter");
                res.redirect("/login");
            }
        });
    }
});

module.exports = router;