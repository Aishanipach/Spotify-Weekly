// services/spotifyService.js
const axios = require('axios');
var client_id = 'ee8e612ef23c41198483d3793e11b645';
var redirect_uri = 'http://127.0.0.1:3000/redirect';
var client_secret = '9b2cbec7d15b43fdb52d5a49be576c1a'
const querystring = require('querystring');

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
    getAuthorizationUrl: () => {
        var state = generateRandomString(16);
        var scope = 'user-read-private user-read-email playlist-modify-private playlist-modify-public';

        return `${'https://accounts.spotify.com/authorize?'}${querystring.stringify({
            response_type: 'code',
            client_id: client_id,
            scope: scope,
            redirect_uri: 'http://127.0.0.1:3000/hi',
            state: state
        })}`
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

            console.log('Authorization successful!');
            return 'YAY'
        } catch (error) {
            console.error('Error exchanging code for token:', error.message);
            return error
        }


    }
};

module.exports = SpotifyService;
