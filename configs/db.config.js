const mongoose = require("mongoose");
const {MONGO_URI} = require("./sever.config");


const dbConnection = async() => {

    await mongoose.connect(MONGO_URI).then((result) => {
        console.log("db connected");
    }).catch((err)=>{
        console.log("db connection failed");
    })
}


module.exports = dbConnection;