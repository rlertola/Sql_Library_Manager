const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Book = require('../models/Book');

// Home route redirects to /books.
// Shows full list of books.
router.get('/', (req, res, next) => {
  Book.findAll().then(books => {
    res.render('index', { books: books, title: "My Awesome Book Library" });
  }).catch(err => console.log(err));
})

// Shows create new book form.
router.get('/new', (req, res, next) => {
  res.render('new-book', { book: Book.build(), title: 'New Book' });
})

// Posts new book to database.
router.post('/', (req, res, next) => {
  console.log('body: ' + req.body);
  Book.create(req.body).then(book => {
    // console.log(req.body);
    res.redirect('/books/' + book.id);
  })
})


// Shows book detail form.
router.get('/:id', (req, res, next) => {
  const id = req.params.id; ``
  Book.findById(id).then(book => {
    res.render('book-detail', { book: book });
  }).catch(err => console.log(err));
})

// Updates book info in database.
// post /books/:id

// Deletes a book.
// post /books/:id/delete
// *** MAKE SURE TO CREATE A TEST BOOK. DELETES CANNOT BE UNDONE. MAKE AN ALERT WITH CONFIRMATION ***


module.exports = router;
