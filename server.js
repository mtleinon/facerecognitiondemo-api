const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

app.use(bodyParser.json());
app.use(cors());

const database = {
    users: [
        {
            id: '123',
            name: 'John',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date(),
        },
        {
            id: '124',
            name: 'Sally',
            email: 'sally@gail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ],
    login: [
        {
            id: '987',
            hash: '',
            email: 'john@gmail.com'
        }
    ]
};

app.get('/', (req, res) => {
    res.send(database.users);
});

app.get('/profile/:userId', (req, res) => {
    const { userId } = req.params;
    const user = database.users.find(user => user.id === userId);
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('user not found');
    }
});
app.put('/image', (req, res) => {
    const { id } = req.body;
    const user = database.users.find(user => user.id === id);
    if (user) {
        user.entries++;
        res.send(user.entries.toString());
    } else {
        res.status(404).send('user not found');
    } 
});

app.post('/signin', (req, res) => {
    if(req.body.email === database.users[0].email &&
            req.body.password === database.users[0].password) {
        res.json(database.users[0]);
    } else {
        res.status(400).json('error logging in');
    }
});

app.post('/register', (req, res) => {
    const {name, email, password} = req.body;
    bcrypt.hash(password, null, null, function (err, hash) {
       console.log('hash', hash);
    });
    database.users.push(
        {
            id: '125',
            name: name,
            email: email,
            password: password,
            entries: 0,
            joined: new Date()
        });
    res.send(database.users[database.users.length-1]);
});

app.listen(3000, () => {
    console.log('app is running on port 3000');
});


