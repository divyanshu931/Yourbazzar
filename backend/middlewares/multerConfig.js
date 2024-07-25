const multer = require('multer');
const path = require('path');

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads/'); // Specify the directory where files should be stored
  },
  filename: function (req, file, cb) {
    // Define how files should be named
    cb(null, Date.now() + '-' + file.originalname);
  }
});

// File filter function to restrict file types if needed
const fileFilter = (req, file, cb) => {
  // Allowed file types
  const allowedTypes = /jpeg|jpg|png|avif/; // Add AVIF format here
  // Check extension
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  // Check mime type
  const mimetype = allowedTypes.test(file.mimetype);
  
  if (extname && mimetype) {
    cb(null, true); // Accept the file
  } else {
    cb(new Error('Only JPEG, JPG, PNG, or AVIF files are allowed'), false); // Reject the file
  }
};

// Multer instance with configuration
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5 // Limit file size to 5MB (adjust as needed)
  }
});

module.exports = upload;
