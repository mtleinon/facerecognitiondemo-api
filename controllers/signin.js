const handleSignIn = (req, res, db, bcrypt) => {
    const {email, password} = req.body;
    if (!email || !password) {
        return res.status(400).json('email or password is empty');
    }
    db.select('email', 'hash').from('login')
        .where('email', '=', email)
        .then(data => {
            if (data.length === 0) {
                console.log('/signin:', 'user email not found');
                return res.status(400).json("unable to get user 1")
            }
            const isValid = bcrypt.compareSync(
                password, data[0].hash);
            if (isValid) {
                return db.select('*').from('users')
                    .where('email', '=', email)
                    .then(users => {
                        res.json(users[0])
                    })
                    .catch(err => {
                        console.log('/signin', err.details);
                        return res.status(400).json("unable to get user 2")
                    })
            } else {
                console.log('/signin:', 'invalid password');
                return res.status(400).json('Invalid credentials')
            }
        })
        .catch(err =>
        {
            console.log('/signin', err.details);
            res.status(400).json('wrong credentials');
        });
};
module.exports = {
    handleSignIn: handleSignIn
};
