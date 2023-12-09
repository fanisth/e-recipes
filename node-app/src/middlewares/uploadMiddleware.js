/* eslint-disable import/no-extraneous-dependencies,consistent-return */
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

const uploadMiddleware = (req, res, next) => {
  upload.single('file')(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    const { file } = req;
    let error = null;

    const allowedTypes = ['image/jpeg', 'image/png'];
    const maxSize = 5 * 1024 * 1024; // 5MB

    if (!allowedTypes.includes(file.mimetype)) {
      error = { error: 'Invalid file type' };
    }

    if (file.size > maxSize) {
      error = { error: 'File too large' };
    }

    if (error) {
      fs.unlinkSync(file.path);
      return res.status(400).json(error);
    }

    // Use Sharp to resize the image
    const thumbnailPath = `uploads/thumbnail-${file.filename}`;
    file.path = `uploads/${file.filename}`;
    await sharp(file.path)
      .resize({ width: 200, height: 200 })
      .toFile(thumbnailPath);

    // Attach files and thumbnail path to the request object
    req.file = file;
    req.thumbnailPath = thumbnailPath;

    // Proceed to the next middleware or route handler
    next();
  });
};

module.exports = uploadMiddleware;
