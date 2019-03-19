# TREEHOUSE TECHDEGREE PROJECT 8 - SQL Library Manager

Built using Javascript, Pug, Express, Sequelize and Sqlite3.

Going for the exceeds expectations grade by adding search and pagination.

Type npm start or npm run dev for nodemon.

#### Home Page

App reroutes from the / path to page 1 of the library. The Books title at the top always returns to page 1.
Page number links at the bottom direct user to that page, with max 10 books per page.
Books are organized alphabetically by author, then title.

#### Search

User can search for anything and all columns will be searched. Push the Books title to go back to page 1.

#### Create New Book

This links takes user to a form to add a new book to the library. Errors will be displayed if either the title or author is blank. Cancel button goes back to page 1.

#### Book Detail / Update Book / Delete Book

Clicking on a book in the library takes user to a page to update the information in the book. This has the same validation as adding a book: author and title are required. Update Book adds it to the library and takes user back to page 1. Delete Book routes to a confirmation page where user can confirm deletion, or go back to the Book Detail page.

#### Error Handling

If a bad route is entered, e.g., **_http://localhost:3000/errors_**, user will be routed to an error page that displays a message, and a button to go back to page 1.

If a book that doesn't exist is entered, e.g., **_http://localhost:3000/books/99_**, user is routed to another error page with a message that the book doesn't exist, and a button to go back to page 1.

#### Design Changes

Changed font and tweaked colors, changed width and added a favicon. Most of these changes are added at the bottom of the css file.
