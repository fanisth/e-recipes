/* eslint-disable import/no-extraneous-dependencies,consistent-return */
const multer = require('multer');
const fs = require('fs');
// SDK initialization
const ImageKit = require('imagekit');

const imagekit = new ImageKit({
  publicKey: 'public_qgv+8znrGNc3MUtvl2/qPPc9VOk=',
  privateKey: 'private_cc0WxP94NgJULOttjJbifRBKf38=',
  urlEndpoint: 'https://ik.imagekit.io/jhzf44xh6',
});

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
  upload.any()(req, res, async (err) => {
    try {
      if (!req?.files.length) {
        return next();
      }
      if (err) {
        return res.status(400).json({ error: err.message });
      }

      const file = req.files[0];
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

      // upload image
      const data = fs.readFileSync(file.path);
      const response = await imagekit.upload({
        file: data,
        fileName: file.filename,
      });
      // Attach files and thumbnail path to the request object
      file.path = response.url;
      req.file = file;
      req.thumbnailPath = response.thumbnailUrl;
      req.fileId = response.fileId;

      // Proceed to the next middleware or route handler
      next();
    } catch (e) {
      return res.status(400).json({ error: 'Error with image upload' });
    }
  });
};

module.exports = uploadMiddleware;
