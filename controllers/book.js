const Book = require('../models/book');


exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
  };




exports.createBook = (req, res, next) => {
const bookObject = JSON.parse(req.body.book);
delete bookObject._id;
delete bookObject._userId;

const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    averageRating: bookObject.ratings[0].grade,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
});

book.save()
    .then(() => { res.status(201).json({message: 'Livre enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
}; 
