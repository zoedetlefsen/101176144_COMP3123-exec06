const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const noteRoutes = require('./routes/NoteRoutes')

const DB_URL = "mongodb+srv://root:FCJKbWXefIB6kSgq@cluster0.bs6u4dl.mongodb.net/F2023_COMP3213?retryWrites=true&w=majority"

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

mongoose.Promise = global.Promise;

// TODO - Update your mongoDB Atals Url here to Connect to the database
mongoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("Successfully connected to the database mongoDB Atlas Server");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

app.use("/notebook", noteRoutes)

app.get('/', (req, res) => {
    res.send("<h1>Welcome to Note taking application - Week06 Exercise</h1>");
});


app.listen(8081, () => {
    console.log("Server is listening on port 3000");
});