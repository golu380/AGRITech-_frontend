
const path = require('path');
const express = require('express');
const multer = require('multer')
const router = express.Router();


// const storage = multer.diskStorage({
//     destination(req, file, cb) {
//         cb(null, 'uploads/')
//     },
//     filename(req, file, cb) {
//         cb(
//             null,
//             `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`
//         )
//     },
// })

// function checkFileType(file, cb) {
//     const filetypes = /jpg|jpeg|png/
//     const extname = filetypes.test(path.extname(file.originalname).toLowerCase())
//     const mimetype = filetypes.test(file.mimetype)

//     if (extname && mimetype) {
//         return cb(null, true)
//     } else {
//         cb('Images only!')
//     }
// }

// const upload = multer({
//     storage:storage,
//     fileFilter:function(req,file,cb){
//         console.log(file)
//         checkFileType(file,cb);
//     }
// })
// const storage = multer.memoryStorage(); // You can customize storage as needed
// const upload = multer({ storage: storage });
// router.post('/', upload.single('image'), (req, res) => {
//     console.log(req.body)
//     // res.send(`/${req.file.path}`)
// })

// module.exports = router;



