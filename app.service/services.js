// services/spotifyService.js
const axios = require('axios');
var client_id = 'ee8e612ef23c41198483d3793e11b645';
var redirect_uri = 'http://localhost:3000/redirect';
var client_secret = '9b2cbec7d15b43fdb52d5a49be576c1a'

function generateRandomString(length) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters.charAt(randomIndex);
    }

    return randomString;
}

const SpotifyService = {
    getAuthorizationUrl: (res) => {
        var state = generateRandomString(16);
        var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

        res.redirect('https://accounts.spotify.com/authorize?' +
            JSON.stringify({
                response_type: 'code',
                client_id: client_id,
                scope: scope,
                redirect_uri: redirect_uri,
                state: state
            }));
    },

    saveDiscoverWeekly: async (code) => {

        try {
            const response = await axios.post('https://accounts.spotify.com/api/token', null, {
                params: {
                    grant_type: 'authorization_code',
                    code: code,
                    redirect_uri: redirect_uri
                },
                auth: {
                    username: client_id,
                    password: client_secret
                }
            });

            const accessToken = response.data.access_token;
            const refreshToken = response.data.refresh_token;

            // Now you can use the access token to make requests to the Spotify API

            res.send('Authorization successful!');
        } catch (error) {
            console.error('Error exchanging code for token:', error.message);
            res.status(500).send('Error');
        }


    }
};

module.exports = SpotifyService;
