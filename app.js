const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://user:user123@mathct.zkqty.mongodb.net/?retryWrites=true&w=majority&appName=mathct',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });


app.use('/api/books', (req, res, next) => {
  const books = [
    {
        _id: 'oeihfzeoi',
        userId: 'qsomihvqios',
        title: 'Mon premier livre',
        author: 'Mon premier auteur',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        year: 2020,
        genre: 'Policier',
        ratings : [
            {
            userId : 'qsomihvqios',
            grade : 2,
            }
            ],
        averageRating : 3,
    
      
    },
    {
        _id: 'oeihfzeomoihi',
        userId: 'qsomihvqios',
        title: 'Mon second livre',
        author: 'Mon second auteur',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        year: 2024,
        genre: 'Historique',
        ratings : [
            {
            userId : 'qsomihvqios',
            grade : 3,
            }
            ],
        averageRating : 4,
      
    },
  ];
  res.status(200).json(books);
});

module.exports = app;