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
  if (pageCount == readPage) {
    var finished = true;
  } else {
    finished = false;
  }
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
  const { finished, reading } = request.query;
  if (finished !== undefined) {
    var resultBooks = books.filter((b) => b.finished == finished);
  } else if (reading !== undefined) {
    resultBooks = books.filter((b) => b.reading == reading);
  } else {
    resultBooks = books;
  }
  dataBooks = [];
  for (let i = 0; i < resultBooks.length; i++) {
    var id = resultBooks[i].id;
    var name = resultBooks[i].name;
    var publisher = resultBooks[i].publisher;
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
  const { bookId } = request.params;

  const book = books.filter((b) => b.id == bookId)[0];
  if (book != undefined) {
    const response = h.response({
      status: "success",
      data: {
        book: book,
      },
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku tidak ditemukan",
  });
  response.code(404);
  return response;
};

const editBookHandler = (request, h) => {
  // ubah data buku
  const { bookId } = request.params;
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

  // cek apakaha client melampirkan nama
  if (name == undefined) {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Mohon isi nama buku",
    });
    response.code(400);
    return response;
  }
  // cek apakah Client melampirkan nilai properti readPage yang lebih besar dari nilai properti pageCount
  if (readPage > pageCount) {
    const response = h.response({
      status: "fail",
      message:
        "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount",
    });
    response.code(400);
    return response;
  }
  const updatedAt = new Date().toISOString();

  const index = books.findIndex((book) => book.id === bookId);
  if (index !== -1) {
    books[index] = {
      ...books[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      reading,
      updatedAt,
    };
    const response = h.response({
      status: "success",
      message: "Buku berhasil diperbarui",
    });
    response.code(200);
    return response;
  } else {
    const response = h.response({
      status: "fail",
      message: "Gagal memperbarui buku. Id tidak ditemukan",
    });
    response.code(404);
    return response;
  }
};

const deleteBookHandler = (request, h) => {
  // hapus data buku
  const { bookId } = request.params;

  const index = books.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    books.splice(index, 1);
    const response = h.response({
      status: "success",
      message: "Buku berhasil dihapus",
    });
    response.code(200);
    return response;
  }
  const response = h.response({
    status: "fail",
    message: "Buku gagal dihapus. Id tidak ditemukan",
    index: index,
  });
  response.code(404);
  return response;
};
function getAllUnfinishedBooks(request, h) {
  // Get All Unfinished Books
}

module.exports = {
  testing,
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  editBookHandler,
  deleteBookHandler,
};
