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
})