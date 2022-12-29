const {vendorModel,foodModel} = require("../models/index");
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

exports.addFood = async (req,res) => {

    try {
      
        const vendor = await vendorServices.getVendorByEmail(req.email);
        if(vendor){

            const food = {
                vendorId:vendor._id,
                name:req.body.name,
                price:req.body.price,
                description:req.body.description,
                foodType:req.body.foodType,
                cookingTime:req.body.cookingTime,
                rating:req.body.rating,
                images:req.body.images
            }
            
            const resposne = await foodModel.create(food);
            vendor.food = vendor.foods.push(resposne);
            await vendor.save();

            return res.json({
                "msg":resposne
            })

        }
        else{

            throw "Vendor Invalid"
        }
        

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.getFood = async (req,res) => {

    try {
      
        const vendor = await vendorServices.getVendorByEmail(req.email);
        if(vendor){

            const resposne = await foodModel.find({vendorId:vendor._id})
            return res.json({
                "msg":resposne
            })

        }
        else{

            throw "Vendor Invalid"
        }
        

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.test = async (req,res) => {

    try {
      
        console.log(req.images);
        console.log(req.file);
        // console.log(req);
        return res.json({
            "response":req.files
        })

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}