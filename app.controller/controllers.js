const SpotifyService = require('../app.service/services')

const SpotifyController = {

    login: (req, res) => {

        const authUrl = SpotifyService.getAuthorizationUrl();
        res.redirect(authUrl)
    },

    redirect: async (req, res) => {
        // res.send('Discover added')
        res.sendFile(__dirname + '/index.html');
        const code = req.query.code;
        const state = req.query.state


        console.log("REached", code, state)
        let ans = await SpotifyService.saveDiscoverWeekly(code);
        res.send(ans)

    }

};

module.exports = SpotifyController;