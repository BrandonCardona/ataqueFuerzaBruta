const express = require('express');

const PORT = 3000;
const app = express();

app.use(express.urlencoded({extended:false}));
app.use(express.json());

const dotenv = require('dotenv');
dotenv.config({path: './env/.env'});

app.use('/resources', express.static('public'));
app.use('/resources', express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

const bcryptjs = require('bcryptjs');


const session = require('express-session');
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

const connection = require('./database/db');

app.get('/', (req, res)=>{
    res.render('login');
})

app.get('/login', (req, res)=>{
    res.render('login');
})

app.get('/register', (req, res)=>{
    res.render('register');
})

app.post('/register', (req, res)=>{

    const email = req.body.email;
    const pass = req.body.pass;

    connection.query('INSERT INTO users SET ?', {email:email, password:pass}, async(error, results)=>{
        if(error){
            console.log(error);
        }else{
            res.render('register', {
                alert: true,
                alertTitle: "Registration",
                alertMessage: "Succesful registration",
                alertIcon:"success",
                showConfirmButton: false,
                timer: 1500,
                ruta: ''
            })
        }
    })


})

app.post('/auth', (req, res)=>{
    const email = req.body.email;
    const pass = req.body.pass;

    //  ||  !(pass === results[0].password)
    if(email && pass){
        connection.query('SELECT * FROM users WHERE email=?', [email], (error, results)=>{

            if(results.length !== 0){
                if(!(pass === results[0].password)){
                    res.send('USUARIO O PASSWORD INCORRECTAS');
                }else{
                    res.send('LOGIN CORRECTO');
                }
            }else{
                res.send('USUARIO O PASSWORD INCORRECTAS');
            }

        });

    }

})

app.listen(PORT, (req, res)=>{
    console.log(`Server running on port ${PORT}`);
})