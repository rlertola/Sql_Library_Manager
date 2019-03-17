const Sequelize = require("sequelize");
const db = require("../config/database");

const Book = db.define("book", {
  title: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Title is required"
      }
    }
  },
  author: {
    type: Sequelize.STRING,
    validate: {
      notEmpty: {
        msg: "Author is required"
      }
    }
  },
  genre: Sequelize.STRING,
  year: Sequelize.INTEGER
});

module.exports = Book;
