const express = require('express');
const router = express.Router();

const pool = require('../database');
const { isLoggedIn } = require('../lib/auth');

router.get('/add', isLoggedIn, (req, res) => {
    res.render('tickets/add');
});


router.post('/add', isLoggedIn, async (req, res) => {
    const { title, url, description, categoria } = req.body;
    const newNew = {
        title,
        url,
        description,
        categoria,
        user_id: req.user.id
    };
    console.log(newNew);
    await pool.query('INSERT INTO ticket set ?', [newNew]);
    req.flash('success', 'Ticket guardada satisfactoriamente');
    res.redirect('/tickets');
});

router.get('/', isLoggedIn, async (req,res) => {
    const tickets = await pool.query('SELECT * FROM ticket WHERE user_id =?', [req.user.id]);
    console.log(tickets);
    res.render('tickets/list', { tickets });
});

router.get('/delete/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    await pool.query('DELETE FROM ticket WHERE ID = ?', [id]);
    req.flash('success', 'Enlace removido satisfactoriamente');
    res.redirect('/tickets');
});

router.get('/edit/:id', isLoggedIn, async (req, res) =>{
    const { id } = req.params;
    const tickets = await pool.query('SELECT * FROM ticket WHERE ID = ?', [id]);
    console.log(tickets[0]);
    res.render('tickets/edit', {new: tickets[0]});
});

router.post('/edit/:id', isLoggedIn, async (req, res)=>{
    const { id } = req.params;
    const { title, description, url, categoria } = req.body;
    const newNew = {
        title,
        description,
        url,
        categoria
    };
    await pool.query('UPDATE ticket set ? WHERE id = ?', [newNew, id]);
    req.flash('success', 'Ticket actualizado satisfactoriamente');
    res.redirect('/tickets');
});

module.exports = router;