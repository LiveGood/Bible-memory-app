const path = require('path');
const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();
const engines = require('consolidate');
// Allows the usage of project defined environment variables
require('dotenv').config();

// Express middleware
app.use(cors());
app.use(express.json())
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'views')));

// Start DB connection
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database is running!');
})

// Start server connection
const port = process.env.PORT;
// app.set('views', path.join(__dirname, 'html'))
//TODO: Make THE API to return API
//    Make a select element where based on it's Bible verse value sends and API request to get the verses and returns them in JSON
//    Make the first API request on front/back end which takes number of verses and puts them on the front end.
// TODO: Make the DB model for users/verses/saved
//      {User}
//          [Known] 
//             Bible Verses Title
//             Title (set by user)
//             Content-Editable 
//          Due
//          New                        


app.get('/', (req, res) => {
    console.log('Cookies: ', req.cookies);
    res.cookie('greeted', 'true')
    res.render('index', {title: 'title'})
})

app.use()

app.listen(port, () => {
    console.log('Express app listening on port: ' + port);
})

