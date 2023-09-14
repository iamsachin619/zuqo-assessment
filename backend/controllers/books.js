const mongoose = require("mongoose");
const BookModel = require("../models/bookModel");



async function getBooks(req, res) {
  
  try {
    const { search, page, pageSize } = req.query;

    let query = {};

    // Apply search filter if provided
    if (search) {
      query = {
        $or: [
          { title: { $regex: search, $options: 'i' } },
          { author: { $regex: search, $options: 'i' } },
        ],
      };
    }

    // Calculate pagination options
    const currentPage = parseInt(page) || 1;
    const perPage = parseInt(pageSize) || 10;
    const skip = (currentPage - 1) * perPage;

    const totalBooks = await BookModel.countDocuments(query);
    const books = await BookModel.find(query)
      .skip(skip)
      .limit(perPage)
      .exec();

    res.json({
      books,
      currentPage,
      totalPages: Math.ceil(totalBooks / perPage),
      totalBooks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteBook(req, res){
  try {
    const bookId = req.params.id;

    const deletedBook = await Book.findByIdAndRemove(bookId);

    if (!deletedBook) {
      return res.status(404).json({ error: 'Book not found' });
    }

    res.json({ message: 'Book deleted successfully', deletedBook });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}



module.exports = {
  getBooks,
  deleteBook
};
