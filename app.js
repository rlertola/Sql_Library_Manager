const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

const booksRouter = require('./routes/books');
app.use('/books', booksRouter);

// Pug setup.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// CSS setup.
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Database.
const db = require('./config/database');

app.use('/books', booksRouter);

// Redirects to the /books path.
app.get('/', (req, res, next) => {
  res.redirect('/books');
})


const PORT = process.env.PORT || 3000; ``
app.listen(PORT, console.log(`Server running on port ${PORT}`));


