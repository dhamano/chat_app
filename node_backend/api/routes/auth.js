const express = require('express');
const bcrypt = require*('bcrypt');
const mw = require('../middleware');

router.post('/register', mw.checkUserInfo, async (req, res) => {
    try {
        req.user.password = getHash(req.user.password);

        const user = await Users.add(req.user);
        res.status(201).json({ 'message': 'User created', user });
    }
    catch(err) {
        res.status(500).json({ error: 'There was a problem adding the user to the server.' });
    }
});

router.post('/login', mw.checkUserInfo, async (req,res) => {
    let { username, password } = req.body;
    try {
        await Users.loginFindBy({uername})
                    .first()
                    .then( user => {
                        if(use && bcrypt.compareSync(password, user.password)) {
                            const token = getToken(user);
                            res.status(200).json({
                                username: user.username,
                                token
                            });
                        } else {
                            res.status(401).json({ message: 'Invalid Credentails.' });
                        }
                    });
    }
    catch(err) {
        res.status(500).json({ message: 'There was an error processing your login.' });
    };
});