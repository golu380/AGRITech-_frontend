require('dotenv').config();

const PORT = process.env.PORT
const DB_URI = process.env.DB_URI
const JWT_SECRET = process.env.JWT_SECRET
const SALT = process.env.SALT
const DEBUG_MODE = process.env.DEBUG_MODE

module.exports = {PORT, DB_URI, JWT_SECRET,SALT,DEBUG_MODE};
