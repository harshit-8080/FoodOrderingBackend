require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI

module.exports = {
    JWT_SECRET,
    PORT,
    MONGO_URI
}