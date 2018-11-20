
const handleRegister = (req, res, db, bcrypt) => {
    const {name, email, password} = req.body;
    if (!name || !email || !password) {
        return res.status(400).json('name, email or password is empty');
    }
    const hash = bcrypt.hashSync(password);
    db.transaction(trx => {
        trx.insert({
            hash: hash,
            email: email
        })
            .into('login')
            .returning('email')
            .then(loginEmails => {
                return trx('users')
                    .returning('*')
                    .insert({
                        email: loginEmails[0],
                        name: name,
                        joined: new Date()
                    })
                    .then(users => {
                        res.json(users[0]);
                    })

            })
            .then(trx.commit)
            .catch(trx.rollback)
    })
        .catch(err => {
            console.log('/register:', err.detail);
            return res.status(400).json('unable to register')
        });
};
module.exports = {
    handleRegister: handleRegister
};