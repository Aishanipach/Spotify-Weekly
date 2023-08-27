const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const config = require('./config');
const port = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public/index.html')));
// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });


// app.use(session({
//     secret: 'YOUR_SECRET_KEY',
//     resave: false,
//     saveUninitialized: true
// }));

const spotifyRoutes = require('./app.route/routes');
app.use('/', spotifyRoutes);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

