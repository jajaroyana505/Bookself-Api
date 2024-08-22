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
};

const getAllBooksHandler = (request, h) => {
  // Ambil semua buku
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
