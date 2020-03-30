var express = require("express");
var bcrypt  = require("bcrypt-nodejs"); 
var fs      = require("fs");


// Authentication check
const { checkAuth } = require('../middleware/check-auth');

var router = express.Router();

var User = require('../models/user');
var Collab = require('../models/collab')

router.get("/", checkAuth, function(req, res) {
    res.redirect("/user/profile");
});

// login routes
router.get("/login", function(req, res) {
    if (req.isAuthenticated) {
        res.redirect("/user/profile");
    } else {
        res.render("login");
    }
});

router.post('/login', function (req,res, next) {
    passport.authenticate('local', {
      successRedirect: '/user/profile',
      failureRedirect: '/user/login',
      failureFlash: true
    })(req, res, next);
  });

// logoff route
router.get('/logoff', function(req,res){
    req.session.destroy();
    req.logout();
    res.redirect('/')
});

// display profile page
router.get('/profile', checkAuth, function(req, res) {
    res.render("profile", {user: req.user});
});

// collabs page
router.get('/collabs', checkAuth, function(req, res) {
    Collab.find({}, function(error, collabs) {
        res.render("collabs", {collabs: collabs});
    });
});

// addcollabs routers
router.get('/addcollab', checkAuth, function(req, res) {
    res.render("addcollab");
});

router.post('/addcollab', checkAuth, function(req, res) {
    if (req.body.submit && req.body.name && req.body.surname && req.body.center && req.body.work && req.body.mark) {
        Collab.create({
            name    : req.body.name,
            surname : req.body.surname,
            center  : req.body.center,
            work    : req.body.work,
            mark    : req.body.mark
        }, function(error, success) {
            if (error) {
                req.flash("error_message", error);
            } else {
                req.flash("success_msg", "Collaborateur ajouté");
                req.redirect("/user/addcollab");
            }
        });
    }
});

// delete collab
router.get('/deletecollab/:id', checkAuth, function(req, res) {
    Collab.deleteOne({_id: req.params.id}, function(error) {
        if (error) {
            req.flash('error_msg',error);
            res.redirect('/user/collabs');
        } else {
            req.flash("success_msg","Collaborateur supprimé");
            res.redirect("/user/collabs");
        }
    });
});

// signal
router.get('/signal/:id', checkAuth, function(req, res) {
    res.render("signals", {id: req.params.id});
});

router.post('/signal/:id', checkAuth, function(req, res) {
    Signal.create({
        collabID: req.params.id,
        details: req.body.details
    }, function(error, signal) {
        if (error) {
            req.flash("error_msg", error);
            res.redirect("/user/signal/"+req.params.id);
        } else {
            req.flash("success_msg", "signal enregistré");
            res.redirect("/user/signal/"+req.params.id);
        }
    });
});

module.exports = router;
