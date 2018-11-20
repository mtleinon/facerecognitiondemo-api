const bcrypt = require('bcrypt-nodejs');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const signin = require("./controllers/signin");
const register = require("./controllers/register");
const image = require("./controllers/image");
const profile = require("./controllers/profile");

const db = knex({
    client: 'pg',
    connection: {
        host: process.env.DATABASE_URL,
        ssl: true,
        //host: '127.0.0.1',
        // user: 'postgres',
        // password: 'postgres',
        // database: 'facerecognition'
    }
});

console.log(process.env.PORT);
const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => { res.send('root request'); });
app.get('/profile/:userId', (req, res) => { profile.handleProfile(req, res, db)});
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res); });
app.put('/image', (req, res) => { image.handleImage(req, res, db); });

app.post('/signin', (req, res) => { signin.handleSignIn (req, res, db, bcrypt); });
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt); });

const port = process.env.PORT || 3000;
app.listen(port, () => { console.log(`app is running on port ${port}`); });


