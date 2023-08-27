const SpotifyService = require('../app.service/services')

const SpotifyController = {

    login: (res, req) => {
        const authUrl = SpotifyService.getAuthorizationUrl();
        res.redirect(authUrl)
    },

    redirect: async (req, res) => {
        const code = req.query.code;
        await SpotifyService.saveDiscoverWeekly(code);
        res.send('Discover added')
    }

};

module.exports = SpotifyController;