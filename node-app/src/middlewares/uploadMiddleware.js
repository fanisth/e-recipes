/* eslint-disable import/no-extraneous-dependencies,consistent-return */
const multer = require('multer');
const fs = require('fs');
const sharp = require('sharp');
const { Dropbox } = require('dropbox');

const dbx = new Dropbox({ accessToken: 'sl.BroxC7637PVn_8j53w6Ig8VqrulhTfefl0MqIIwm85UHOHOcDqLDtLZD1KbgabXpP1Ly9xDuuPzheL9LfwFYVLKhgYoOmebH6psPJGqTub38EZsbDCHagpkvOIy6-PoCPQLv7zxy38qP6zE' });

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
    try {
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
      let thumbnailPath = `uploads/thumbnail-${file.filename}`;
      file.path = `uploads/${file.filename}`;
      await sharp(file.path)
        .resize({ width: 200, height: 200 })
        .toFile(thumbnailPath);

      // upload image
      let data = fs.readFileSync(file.path);
      let dbxResponse = await dbx.filesUpload({ contents: data, path: `/${file.filename}` });
      dbxResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: `/${req.file.filename}`,
        settings: { requested_visibility: 'public' },
      });
      file.path = `${dbxResponse.result.url.split('dl')[0]}raw=1`;

      // upload thumbnail
      data = fs.readFileSync(thumbnailPath);
      dbxResponse = await dbx.filesUpload({ contents: data, path: `/thumbnail-${file.filename}` });
      dbxResponse = await dbx.sharingCreateSharedLinkWithSettings({
        path: `/thumbnail-${file.filename}`,
        settings: { requested_visibility: 'public' },
      });
      thumbnailPath = `${dbxResponse.result.url.split('dl')[0]}raw=1`;
      // Attach files and thumbnail path to the request object
      req.file = file;
      req.thumbnailPath = thumbnailPath;

      // Proceed to the next middleware or route handler
      next();
    } catch (e) {
      return res.status(400).json({ error: 'Error with image upload' });
    }
  });
};

module.exports = uploadMiddleware;
