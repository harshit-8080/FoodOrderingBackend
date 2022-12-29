const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./configs/index");
const {PORT}  = require("./configs/sever.config");

const {AdminRouter,VendorRouter} = require("./routes/index");

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/admin",AdminRouter);
app.use("/vendor",VendorRouter);


mongoose.connect(config.MONGO_URI).then((result) => {
    console.log("db connected");
}).catch((err)=>{
    console.log("db connection failed");
})


app.listen(PORT,() => {

    console.clear();
    console.log(`app listen at ${PORT}`);
    
})