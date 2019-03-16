const express = require("express");
const router = express.Router();
const db = require("../config/database");
const Book = require("../models/Book");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

// app.use(bodyParser.json());
// ***MAKE SURE THIS IS NEAR THE TOP OR IT WON'T WORK.
// app.use(bodyParser.urlencoded({ extended: false }));

/* GET full list of books.
Home route redirects to /books. */
router.get("/", (req, res, next) => {
  Book.findAll()
    .then(books => {
      res.render("index", { books: books, title: "My Awesome Book Library" });
    })
    .catch(err => res.send(500));
});

// Search for books.
router.post("/search", (req, res) => {
  // let { searchTerm } = req.query;
  let searchTerm = req.body.searchTerm;

  Book.findAll({
    where: {
      [Op.or]: {
        title: {
          [Op.like]: `%${searchTerm}%`
        },
        author: {
          [Op.like]: `%${searchTerm}%`
        },
        genre: {
          [Op.like]: `%${searchTerm}%`
        },
        year: {
          [Op.like]: `%${searchTerm}%`
        }
      }
    }
  })
    .then(books => res.render("index", { books: books }))
    .catch(err => res.send(500));
});

// GET create new book form.
router.get("/new", (req, res, next) => {
  res.render("new-book", { book: Book.build(), title: "New Book" });
});

// POST new book to database.
router.post("/", (req, res, next) => {
  Book.create(req.body)
    .then(book => {
      res.redirect("/");
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        let book = Book.build(req.body);
        res.render("new-book", {
          book: book,
          title: "Edit Book (new book)",
          errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch(err => res.send(500));
});

// GET book detail form.
router.get("/:id", (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .then(book => {
      if (book) {
        res.render("book-detail", { book: book });
      } else {
        let err = new Error("Book Not found");
        err.status = 500;
        next(err);
      }
    })
    .catch(err => res.send(err.status));
});

// POST edit book info in database.
router.post("/:id", (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .then(book => {
      if (book) {
        return book.update(req.body);
      } else {
        res.send(404);
      }
    })
    .then(book => {
      res.redirect("/");
    })
    .catch(err => {
      if (err.name === "SequelizeValidationError") {
        let book = Book.build(req.body);
        book.id = id;
        res.render("book-detail", {
          book: book,
          title: "Edit Book",
          errors: err.errors
        });
      } else {
        throw err;
      }
    })
    .catch(err => res.send(500));
});

// GET delete-confirmation form.
router.get("/:id/delete", (req, res, next) => {
  const id = req.params.id;
  Book.findById(id)
    .then(book => {
      if (book) {
        res.render("delete-confirm", { book: book, title: "Delete Book" });
      } else {
        res.send(404);
      }
    })
    .catch(err => send(500));
});

// POST deletes a book.
router.delete("/:id", (req, res, next) => {
  console.log("yes");
  const id = req.params.id;
  Book.findById(id)
    .then(book => {
      if (book) {
        console.log("yes");
        return book.destroy();
      } else {
        res.send(404);
      }
    })
    .then(() => {
      res.redirect("/");
    })
    .catch(err => res.send(500));
});

module.exports = router;
