const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done)=>{
    console.log(req.body);
    const rows = await pool.query('SELECT * FROM users where email = ?', [email]);
    if(rows.length > 0){
        const user = rows[0];
        const validPassword = await helpers.matchPassword(password, user.password);
        if(validPassword){
            done(null, user, req.flash('success','Bienvenido ' + user.nombre));
        } else{
            done(null, false, req.flash('message','Incorrect Password'))
        }
    } else{
        return done(null, false, req.flash('message', 'El nombre de usuario no existe'));
    }
}));

passport.use('local.signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    emailField: 'email',
    passReqToCallback: true
}, async (req, username, password, done)=>{
    console.log(req.body);
    const { nombre, email } = req.body;

    const newUser = {
        username,
        email,
        password,
        nombre
    };
    // Toma la contraseña y la cifra
    newUser.password = await helpers.encryptPassword(password);
    const result = await pool.query('INSERT INTO users SET ?', [newUser]);
    newUser.id = result.insertId;
    console.log(result);
    return done(null, newUser);
}));

passport.serializeUser((user, done)=>{
    done(null, user.id);
});

passport.deserializeUser(async (id, done)=>{
    const rows = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    done(null, rows[0]);
});