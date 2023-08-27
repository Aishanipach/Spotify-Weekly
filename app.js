const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const config = require('./config');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public/index.html')));


app.use(session({
    secret: 'YOUR_SECRET_KEY',
    resave: false,
    saveUninitialized: true
}));

const spotifyRoutes = require('./routes/spotifyRoutes');
app.use('/spotify', spotifyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});