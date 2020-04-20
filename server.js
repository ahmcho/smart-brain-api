const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const pg = knex({
    client: 'pg',
    connection: {
      host : '127.0.0.1',
      user : 'postgres',
      password : 'abc456',
      database : 'smart-brain'
    }
});


app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

app.get('/', (req,res) => {
    res.send('Hello');
})

app.get('/profile/:id', (req,res) => {
    profile.handleProfileGet(req,res,pg);
});

app.post('/signin', signin.handleSignin(pg,bcrypt))

app.post('/register', (req,res) => {
    register.handleRegister(req,res, pg, bcrypt);
})

app.put('/image', (req,res) => {
    image.handleImage(req,res,pg);
})

app.post('/imageurl', (req,res) => {
    image.handleApiCall(req,res)
})

app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})