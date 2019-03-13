const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
// app.use(bodyParser.json());
// ***MAKE SURE THIS IS NEAR THE TOP OR IT WON'T WORK.
app.use(bodyParser.urlencoded({ extended: false }));

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Pug setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CSS setup.
app.use(express.static(path.join(__dirname, 'public')));

// Database.
const db = require('./config/database');

app.use('/books', booksRouter);

// Redirects to the /books path.
app.get('/', (req, res, next) => {
  res.redirect('/books');
})


const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));


