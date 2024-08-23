const { testing, addBookHandler, getAllBooksHandler } = require("./handler");

const routes = [
  {
    method: "GET",
    path: "/testing",
    handler: testing,
  },
  {
    method: "POST",
    path: "/books",
    handler: addBookHandler,
  },
  {
    method: "GET",
    path: "/books",
    handler: getAllBooksHandler,
  },
];

module.exports = routes;
