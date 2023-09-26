const multer = require('multer');
const shortid = require('shortid');
const path = require('path');

const multerConfig = {
    storage: fileStorage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, path.join(__dirname, '../backend/uploads/'));
        },
        filename: (req, file, cb) => {
            const extension = file.mimetype.split('/')[1];
            cb(null, `${shortid.generate()}.${extension}`);
        }
    }),
    fileFilter(req, file, cb) {
        if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
            cb(null, true);
        } else {
            cb(new Error('Formato de imagen no válido'));
        }
    },
}

module.exports = multerConfig;