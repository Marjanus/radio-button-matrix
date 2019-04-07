const multer = require('multer');

const SUPPORTED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/svg+xml'];

const storage = multer.diskStorage({
    destination: './uploads',
    filename: (req, file, cb) => {
        cb(null, `${new Date().toISOString().replace(/:/g, '-')}-${file.originalname}`);
    },
});

const imageFilter = (req, file, cb) => {
    if (!SUPPORTED_MIME_TYPES.includes(file.mimetype)) {
        return cb(null, false);
    }

    return cb(null, true);
};

const upload = multer({
    storage,
    fileFilter: imageFilter,
});

module.exports = upload;
