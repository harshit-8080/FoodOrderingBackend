const {vendorModel} = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
const vendorServices = require("../services/vendors.service");


exports.login = async (req, res) => {

    try {
        
        const vendor = {
            email:req.body.email,
            password:req.body.password
        }

        const checkVendor = await vendorServices.getVendorByEmail(vendor.email);
        if(checkVendor){

            const checkPassword = passwordHelper.decodePassword(vendor.password,checkVendor.password);
            if(checkPassword){
                return res.json({
                    "msg":'Logged In'
                })
            }
            else{
                return res.json({
                    "msg":'Password Invalid'
                })
            }
        }
        else{

            return res.json({
                "msg":'Email Invalid'
            })
        }
                
    
    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }

}