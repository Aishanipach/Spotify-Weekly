const express = require('express');
const app = express();
const session = require('express-session');
const path = require('path');
const config = require('./config');
const port = process.env.PORT || 3000;
const spotifyRoutes = require('./app.route/routes');


// app.get('/', (req, res) => {
//     res.send('Hello, world!');
// });


// app.use(session({
//     secret: 'YOUR_SECRET_KEY',
//     resave: false,
//     saveUninitialized: true
// }));

app.use('/', spotifyRoutes);
app.use(express.static(path.join(__dirname, 'public/index.html')));

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

