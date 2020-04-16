const express = require('express');
const app = express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');


app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'Ahmad',
            email: 'mail@ahmcho.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'John',
            password: 'bananas',
            email: 'carpenter@is.here.com',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'mail@ahmcho.com'
        }
    ]
}

app.get('/', (req,res) => {
    res.send(database.users)
})

app.get('/profile/:id', (req,res) => {
    const {id} = req.params;
    let found =false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            return res.json(user);
        }
    })
    if(!found){
        res.status(400).json('no such user');
    }
});

app.post('/signin', (req,res) => {
    if(req.body.email === database.users[0].email && req.body.password === database.users[0].password){
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
})

app.post('/register', (req,res) => {
    const {email,name,password} = req.body;
    database.users.push({
        id: '125',
        name: name,
        email: email,
        entries: 0,
        joined: new Date()
    })
    res.json(database.users[database.users.length - 1]);
})

app.put('/image', (req,res) => {
    const {id} = req.body;
    let found =false;
    database.users.forEach(user => {
        if(user.id === id){
            found = true;
            user.entries++
            return res.json(user.entries);
        }
    })
    if(!found){
        res.status(400).json('no such user');
    }
})

app.listen(3000, () => {
    console.log('app is running on port 3000')
})