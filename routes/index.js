var express = require('express');
var router = express.Router();


// Models - user is in the passport/init.js
var premises = require('../models/premises');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/login');
}

module.exports = function(passport){

	/* GET Home Page */
	router.get('/', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});
	
	/* GET Login Page */
	router.get('/login', function(req, res){
		res.render('login', {message: req.flash('message')});
	});	
	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/',
		failureRedirect: '/login',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('signup',{message: req.flash('message')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('home', { user: req.user });
	});

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});
	
		// route for facebook authentication and login
	// different scopes while logging in
	router.get('/login/facebook', 
		passport.authenticate('facebook', { scope : 'email' }
	));

	// handle the callback after facebook has authenticated the user
	router.get('/login/facebook/callback',
		passport.authenticate('facebook', {
			successRedirect : '/facebook',
			failureRedirect : '/'
		})
	);

	/* GET Facebook View Page */
	router.get('/facebook', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});
	
	// route for twitter authentication and login
	// different scopes while logging in
	router.get('/login/twitter', 
		passport.authenticate('twitter'));

	// handle the callback after twitter has authenticated the user
	router.get('/login/twitter/callback',
		passport.authenticate('twitter', {
			successRedirect : '/twitter',
			failureRedirect : '/'
		})
	);

	/* GET Twitter View Page */
	router.get('/twitter', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});

	/* GET Settings Page */
	router.get('/settings', isAuthenticated, function(req, res){
		res.render('settings', { user: req.user });
	});

	/* Premises */
	router.get('/premises', isAuthenticated, function(req, res){
		res.render('premises', { user: req.user });
	});
	router.post('/premises/', isAuthenticated, function(req, res){
		console.log("About to create a user");
		premises.create({
        title: req.params,
        body: req.body
    });
    		res.redirect('/premises');
	});
	return router;
}
