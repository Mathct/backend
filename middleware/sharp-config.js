const sharp = require("sharp");

const finalImage = (req, res, next) => {
    if (req.file) {
        
        const filename = `${Date.now()}.webp`;
        const filepath = `images/${filename}`;

        sharp(req.file.buffer)
            .webp({ quality: 80 })
            .resize({ width: 800, height: 800, fit: 'inside' })
            .toFile(filepath, (err, info) => {
                if (err) {
                    return res.status(500).json({ error: "Image processing error" });
                }

                
                // Update req.file to reflect the new image details
                req.file.filename = filename;
                req.file.path = filepath;

                next();
            });
    } else {
        
        next();
    }
};

module.exports = finalImage;