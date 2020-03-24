const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/', isLoggedIn, (req,res) => {
    //const tickets = await pool.query('SELECT * FROM ticket WHERE user_id =?', [req.user.id]);
    //console.log(tickets);
    req.flash('success', 'Tus proyectos');
    res.render('proyectos');
});