const multer = require('multer');
const path = require('path');

const basePath = path.resolve(__dirname, '..'); // Go up one level from __dirname
const imagePath = path.join(basePath, 'public/applicantResume');
const profilePicPath = path.join(basePath, 'public/profilePictures');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isProfilePic = file.fieldname === 'profilePic';
    const uploadPath = isProfilePic ? profilePicPath : imagePath;
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const filename = Date.now() + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({ storage: storage });

const uploadFields = upload.fields([
  { name: 'applicant_resume', maxCount: 1 },
  { name: 'profilePic', maxCount: 1 }
]);

module.exports = {
  uploadFields
};