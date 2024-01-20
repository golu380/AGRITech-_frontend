const express = require('express');
const path = require('path');
const multer = require('multer')


const router = express.Router();
const Authentication = require('../controllers/Authentication')
const SupplierController = require('../controllers/supplierController')


router.post('/register',Authentication.register);
router.post('/login',Authentication.login);


router.post('/api/supplier',SupplierController.createSupplierController)
const NodeGeocoder = require('node-geocoder');



const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/'); // Save files to the 'uploads' directory
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
  });
  
  // File type validation
  const fileFilter = function (req, file, cb) {
    const allowedFileTypes = /jpeg|jpg|png/; // Allowed file types (modify as needed)
    const extension = allowedFileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimeType = allowedFileTypes.test(file.mimetype);
  
    if (extension && mimeType) {
      return cb(null, true);
    } else {
      return cb(new Error('Invalid file type. Allowed types: jpeg, jpg, png'), false);
    }
  };
  
  const upload = multer({
    storage: storage,
    fileFilter: fileFilter
  });
  
  // Define the file upload endpoint
  router.post('/api/upload', upload.single('image'), (req, res) => {
    console.log(req.file);
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      console.log(req.path);

      const filePath = path.join(__dirname, 'uploads', req.file.filename);
      res.json({ path: filePath });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });


// const storage = multer.memoryStorage(); // You can configure storage as needed
// const upload = multer({ storage: storage });

// router.post('/api/upload', upload.single('file'), (req, res) => {
//     // Access the uploaded file through req.file
//     console.log(req.file);
//     res.send('File uploaded!');
//   });

module.exports = router;