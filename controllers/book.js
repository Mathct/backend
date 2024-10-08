const Book = require('../models/book');
const fs = require('fs');


exports.getAllBooks = (req, res, next) => {
    Book.find()
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));
  };

exports.getOneBook = (req, res, next) => {
Book.findOne({_id: req.params.id})
    .then((book) => {res.status(200).json(book)})
    .catch(error => res.status(404).json({ error }));
};

exports.getBestBooks = (req, res, next) => {
    Book.find().sort({ averageRating: -1 }).limit(3)
      .then(books => res.status(200).json(books))
      .catch(error => res.status(400).json({ error }));

  };

exports.deleteBook = (req, res, next) => {
    Book.findOne({ _id: req.params.id })
        .then(book => {
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message: 'Unauthorized request' });
            } else {
                const filename = book.imageUrl.split('/images/')[1];
                
                fs.unlink(`images/${filename}`, () => {
                    Book.deleteOne({ _id: req.params.id })
                        .then(() => { res.status(200).json({ message: 'Livre supprimé !' }) })
                        .catch((error) => {res.status(400).json({error: error})});
                });
            }
        })
        .catch( error => {res.status(404).json({ error })});
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



exports.modifyBook = (req, res, next) => {
    const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}` 
    } : { ...req.body };
    
    delete bookObject._userId;
    
    Book.findOne({_id: req.params.id})
        .then((book) => {
            // updating book only if creator of the book's card
            if (book.userId != req.auth.userId) {
                res.status(403).json({ message : 'Unauthorized request' });
            } else {
                //  Separation of existing image file name
                const filename = book.imageUrl.split('/images/')[1];
                // If the image has been modified, the old one is deleted.
                req.file && fs.unlink(`images/${filename}`, (err => {
                        if (err) console.log(err);
                    })
                );
                // updating the book
                Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id })
                    .then(() => res.status(200).json({ message: 'Livre mis à jour!' }))
                    .catch(error => res.status(400).json({ error }));
            }
        })
        .catch(error => res.status(404).json({ error }));
};



exports.addBookRating = (req, res, next) => {
    Book.findOne({_id: req.params.id})
      .then(book => {
          
        const userId = req.auth.userId;
        const userRating = req.body.rating;
        const existingRating = book.ratings.find(rating => rating.userId === userId);
  
        if (existingRating) {
          return res.status(400).json({ message: 'Vous avez déjà noté ce livre' });
        } 
  
        book.ratings.push({ userId: userId, grade: userRating });
  
        const totalRatings = book.ratings.length;
        const sumRatings = book.ratings.reduce((sum, rating) => sum + rating.grade, 0);
        book.averageRating = parseFloat(sumRatings / totalRatings).toFixed(2);
        
  
        book.save()
          .then(savedBook => res.status(200).json(savedBook))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
  };
