const { nanoid } = require("nanoid");
const book = require("./books");
const books = require("./books");

const testing = (request, h) => {
  const response = h.response({
    status: "success",
    message: "Testing",
  });
  response.code(200);
  return response;
};

const addBookHandler = (request, h) => {
  // tamabha buku
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;
  const id = nanoid(16);
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;
  const finished = false;
  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  // cek apakaha client melampirkan nama
  if (name == undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal menambahkan buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // cek apakah Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  // masukan data newBook ke dalam array books
  books.push(newBook);

  const isSuccess = books.filter((book) => book.id == id);

  if (isSuccess) {
    const response = h.response({
      status: "success",
      message: "Buku berhasil ditambahkan",
      data: {
        bookId: id,
      },
    });
    response.code(201);
    return response;
  }

  const response = h.response({
    status: "fail",
    message: "Data gagal ditambahkan",
  });
  response.code(500);
  return response;
};

const getAllBooksHandler = (request, h) => {
  // Ambil semua buku
  dataBooks = [];
  for (let i = 0; i < books.length; i++) {
    var id = books[i].id;
    var name = books[i].name;
    var publisher = books[i].publisher;
    dataBooks.push({ id, name, publisher });
  }

  const response = h.response({
    status: "success",
    data: {
      books: dataBooks,
    },
  });
  response.code(200);
  return response;
};

const getBookByIdHandler = (request, h) => {
  // Ambil detail buku
};

const editBookHandler = (request, h) => {
  // ubah data buku
};

const deleteBookHandler = (request, h) => {
  // hapus data buku
};

module.exports = {
  testing,
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookHandler,
  deleteBookHandler,
};
