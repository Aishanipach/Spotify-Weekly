// routes/spotifyRoutes.js
const express = require('express');
const router = express.Router();
const SpotifyController = require('../app.controller/controllers');


router.get('/login', SpotifyController.login);
router.get('/redirect', SpotifyController.redirect);
router.get('/hi', (req, res) => { res.send("DISCOVRED") })

module.exports = router;
