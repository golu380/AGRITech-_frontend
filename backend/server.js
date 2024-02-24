
const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
// import { DB_URI, PORT } from './config/config';
const routes = require('./routes/routes.js')
// const uploadRoutes = require('./controllers/UploadController.js')
const cors = require('cors');
const {DB_URI,PORT} = require('./config/config.js')
const errorHandler = require('./middleware/errorHandler.js')
const app = express();
console.log(DB_URI )


mongoose.connect(DB_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'Database Connection Error'))
db.once('open', () => {
  console.log('Database Connected')
})

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(routes)
// app.use('/api/upload',uploadRoutes);
app.use(errorHandler)
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
})

