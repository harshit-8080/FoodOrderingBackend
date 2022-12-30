const express = require("express");
const bodyParser = require("body-parser");
const {PORT}  = require("./configs/sever.config");
const dbConnection = require("./configs/db.config")

const {AdminRouter,VendorRouter} = require("./routes/index");

const app = express();


const startserver = async()=> {

    // using body-parser
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended:true}));

    // db connection
    await dbConnection();

    // using routes
    app.use("/admin",AdminRouter);
    app.use("/vendor",VendorRouter);


    app.listen(PORT,() => {

        console.clear();
        console.log(`app listen at ${PORT}`);
    
    })

}

startserver();
