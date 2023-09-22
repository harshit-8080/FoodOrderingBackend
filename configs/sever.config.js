require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
const TWILIO_ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const TWILIO_AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const mySecretNunmber = process.env.mySecretNunmber;
const appPasscode = process.env.appPasscode;

module.exports = {
  JWT_SECRET,
  PORT,
  MONGO_URI,
  TWILIO_ACCOUNT_SID,
  TWILIO_AUTH_TOKEN,
  mySecretNunmber,
  appPasscode,
};
