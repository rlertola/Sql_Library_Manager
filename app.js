const express = require("express");
const app = express();
const path = require("path");
const bodyParser = require("body-parser");

// app.use(bodyParser.json());
// ***MAKE SURE THIS IS NEAR THE TOP OR IT WON'T WORK.
app.use(bodyParser.urlencoded({ extended: false }));

var methodOverride = require("method-override");
app.use(methodOverride("_method"));

const booksRouter = require("./routes/books");
app.use("/books", booksRouter);

// CSS setup.
app.use(express.static(path.join(__dirname, "public")));

// Pug setup.
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

// Database.
const db = require("./config/database");

app.use("/books", booksRouter);

// Redirects to the /books path.
app.get("/", (req, res, next) => {
  res.redirect("/books");
});

// Error handling.
app.use((req, res, next) => {
  let err = new Error("Page Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  if (err.status === 404) {
    res.render("page-not-found", {
      message: err.message,
      error: err
    });
  }
  if (err.status === 500) {
    res.render("book-not-found", {
      message: err.message,
      error: err
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, console.log(`Server running on port ${PORT}`));
