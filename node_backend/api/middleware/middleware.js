const jwt = require('jsonwebtoken');
const secrets = process.env.JWT_SECRET || "Work! Work! Work!";

module.exports = {
    checkUserInfo,
    restricted
}

function checkUserInfo( req, res, next) {
    const {username, password} = req.body;
    let error = 0;

    if (username === undefined || username.trim() === "") error++;
    if (password === undefined || password.trim() === "") error += 2;

    switch(error) {
        case 1:
            return res.status(400).json({ message: 'username is required' });
            break;
        case 2:
            return res.status(400).json({ message: 'password is required' });
            break;
        case 3:
            return res.status(400).json({ message: 'username and password is required' });
            break;
        default:
            req.user = { username, password };
            next();
    };
};

function restricted(req, res, next) {
    const token = req.headers.authorization;

    if(token) {
        jwt.verify(token, secrets.jwtSecrets, (err, decodedToken) => {
            if(err) {
                res.status(401).json({ message: 'Not Authorized' });
            } else {
                req.user = {
                    username: decodedToken.username
                };
                next();
            };
        });
    };
};