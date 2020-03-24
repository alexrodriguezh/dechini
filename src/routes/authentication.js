const express = require('express');
const router = express.Router();
const pool = require('../database');
const passport = require('passport');
const { isLoggedIn, isNotLoggedIn } = require('../lib/auth');

router.get('/signup', isNotLoggedIn, (req, res)=>{
    res.render('auth/signup');
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup', {
        successRedirect: '/profile', 
        failureRedirect: '/signup',
        failureFlash: true
}));

router.get('/signin', isNotLoggedIn, (req, res) => {
    res.render('auth/signin');
}); 

router.post('/signin', isNotLoggedIn, (req, res, next) => {
    passport.authenticate('local.signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
}); 

router.get('/profile', isLoggedIn, async(req, res)=>{
    const { id } = req.params;
    const profile = await pool.query('SELECT * FROM users WHERE ID = ?', [id]);
    console.log("id: " + id);
    console.log(profile[0]);
    res.render('profile');
});

router.post('/profile', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const { nombre, username, email, empresa, cargo, oficina, anexo, celular, telefono } = req.body;
    const newNew = {
        nombre,
        username,
        email,
        empresa,
        cargo,
        oficina,
        anexo,
        celular,
        telefono
    };
    await pool.query('UPDATE users set ? WHERE id = ?', [newNew, id]);
    req.flash('success', 'Usuario actualizado satisfactoriamente');
    res.redirect('/profile');
});

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin'); 
});


router.get('/proyectos', isLoggedIn, (req,res) => {
    //const tickets = await pool.query('SELECT * FROM ticket WHERE user_id =?', [req.user.id]);
    //console.log(tickets);
    req.flash('success', 'Tus proyectos');
    res.render('proyectos');
});

module.exports = router;