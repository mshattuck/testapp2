//dependancies
const express = require('express');
const app = express();

//port to use with code for Heroku
var PORT = process.env.PORT || 5000

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
app.listen(PORT, () => 
{
    console.log('notetaker app listening on port: ' + PORT);
});

