exports.getAllBooks = (req, res, next) => {
    
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



  };