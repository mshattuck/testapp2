//dependancies
const express = require('express');
const app = express();

//port to use with code for Heroku
const port = process.env.port || 8080;

//parse incoming requests
app.use(express.json());

//serve the images, css, and JS files
app.use(express.static('public'));

//URL parser for nested objects
app.use(express.urlencoded({extended: true}));

//routes
require('./routes/html-routes')(app);
require('./routes/api-routes')(app);

//set up port for listening
app.listen(port, () => 
{
    console.log('notetaker app listening on port: ' + port);
});

