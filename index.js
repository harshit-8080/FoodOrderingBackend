const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const config = require("./configs/index");

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


app.listen(3000,() => {

    console.log("server started at 3000");
})