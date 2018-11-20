const handleProfile = (req, res, db) => {
    const {userId} = req.params;
    db.select('*').from('users').where({id: userId})
        .then(users => {
            if (users.length) {
                res.json(users[0]);
            } else {
                res.status(400).json('user not found');
            }
        })
        .catch(err => res.status(400).json('error getting user'));
};

module.exports = {
    handleProfile: handleProfile
};