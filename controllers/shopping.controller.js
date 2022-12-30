const {vendorModel,foodModel} = require("../models/index");
const vendorServices = require("../services/vendors.service");

exports.getVendor = async (req, res) => {

    try {
        
        const vendors = await vendorModel.findOne({_id:req.params.vendorId}) 
        if(vendors){
 
             return res.json({
                 "sucess":true,
                 "response":vendors
             })
        }
        else{
 
             return res.json({
                 "sucess":true,
                 "response":"No vendor found"
             })
        }
 
     } catch (error) {
         
         console.log(error);
 
         return res.json({
             "msg":'internal server error'
         })
 
     }
}

exports.searchFoodInYourArea = async (req, res) => {

    try {
        
       const vendors = await vendorModel.find({pincode:req.params.pincode,serviceAvailable:true})
       .sort([['rating','descending']])
       .populate('foods')

       if(vendors){

            return res.json({
                "sucess":true,
                "response":vendors
            })
       }
       else{

            return res.json({
                "sucess":true,
                "response":"No vendor found for given pincode"
            })
       }

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })

    }
}

exports.searchFoodByVendorId = async (req, res) => {
    
    try {
        
        const vendors = await vendorModel.findOne({_id:req.params.vendorId})
        .populate("foods");

        if(vendors){
 
             return res.json({
                 "sucess":true,
                 "response":vendors.foods
             })
        }
        else{
 
             return res.json({
                 "sucess":true,
                 "response":"No vendor found for given pincode"
             })
        }
 
     } catch (error) {
         
         console.log(error);
 
         return res.json({
             "msg":'internal server error'
         })
 
     }

}

exports.getTopVendors = async (req, res) => {

    try {
        
        const vendors = await vendorModel.find({pincode:req.params.pincode,serviceAvailable:false})
        .sort([['rating','descending']])
        .limit(3)
 
        if(vendors){
 
             return res.json({
                 "sucess":true,
                 "response":vendors
             })
        }
        else{
 
             return res.json({
                 "sucess":true,
                 "response":"No vendor found for given pincode"
             })
        }
 
     } catch (error) {
         
         console.log(error);
 
         return res.json({
             "msg":'internal server error'
         })
 
     }

}