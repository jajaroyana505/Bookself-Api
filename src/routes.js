const { testing, addBookHandler } = require("./handler");

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
];

module.exports = routes;
