const {OrderModel,userModel,foodModel} = require("../models/index");
const userServices = require("../services/user.service");

exports.createOrder = async (req, res) => {

    try {
           
        const user = await userServices.getUserByEmail(req.email);
        if(user){

            const items = req.body.items;
            // console.log(items);

            const foods = items.map((i)=>{
                return i.food;
            });
            // console.log(foods);

            const result = await foodModel.find({_id:{$in:foods}});

            let totalAmount = 0;

            for(let i = 0; i<items.length; i++){
                totalAmount = totalAmount+ result[i].price * items[i].units
            }

            const order = {
                totalAmount,
                vendorId:result[0].vendorId,
                items:items,
                orderDate:new Date(),
                orderStatus:"waiting",
                remarks:'',
                deliveryID:''

            }

            const response = await OrderModel.create(order);
            user.orders.push(response);
            await user.save();

            return res.json({

                "response":response,
                "user":user
            })
        }   
        else{
            throw "InValid User"
        }

    } catch (error) {
        
        console.log(error);
        return res.json({
            "msg":"internal server error"
        })
    }
}

exports.getAllOrders = async (req, res) => {
    
    try {
        
        const users = await userModel.findOne({email:req.email}).populate("orders");
        

        return res.json({
            "response":users
        })
        
    } catch (error) {

        console.log(error);
        return res.json({
            "msg":"internal server error",
            "error":error
        })
    }

}

exports.getOrder = async (req, res) => {
    
    try {
        
        const order = await OrderModel.findById(req.params.orderId)
        .populate("items.food");

        return res.json({
            "response":order
        })

    } catch (error) {

        console.log(error);
        return res.json({
            "msg":"internal server error",
            "error":error
        })
    }

}
