const {vendorModel} = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
const tokenHelper = require("../utils/tokenHelper");
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

                const token = tokenHelper.createToken(checkVendor.email);

                return res.json({
                    "msg":'Logged In',
                    "token":token
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

exports.getProfile = async (req,res) => {

    try {
        
        const vendor = await vendorServices.getVendorByEmail(req.email);

        return res.json({
            "msg":vendor
        }) 

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.updateProfile = async (req,res) => {

    try {
        
        const vendor = await vendorServices.getVendorByEmail(req.email);
        if(vendor){
            vendor.name = req.body.name || vendor.phone,
            vendor.address = req.body.address || vendor.phone,
            vendor.phone = req.body.phone || vendor.phone,
            vendor.foodType = req.body.foodType || vendor.phone

            const resposne = await vendor.save();

            return res.json({
                "msg":resposne
            })

        }
        else{

            throw "Vendor email Invalid"
        }

       
    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.updateService = async (req,res) => {

    try {
      
        const vendor = await vendorServices.getVendorByEmail(req.email);
        if(vendor){

            vendor.serviceAvailable = !vendor.serviceAvailable

            const resposne = await vendor.save();

            return res.json({
                "msg":resposne
            })

        }
        else{

            throw "Vendor email Invalid"
        }
        

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'2 internal server error'
        })
    }
}