const {vendorModel,foodModel} = require("../models/index");
const vendorServices = require("../services/vendors.service");

exports.searchByPincode = async (req, res) => {

    try {
        
       const vendors = await vendorModel.find({pincode:req.params.pincode})
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

exports.searchByVendorId = async (req, res) => {
    
    try {
        
        const vendors = await vendorServices.getVendorByID(req.params.vendorId);
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