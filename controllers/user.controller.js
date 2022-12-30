const {userModel} = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
const tokenHelper = require("../utils/tokenHelper");
const otpHelper = require("../utils/otpHelper");

exports.signUpUser = async (req, res) => {

    try {
        
        const user = {
            firstName:req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            address: req.body.address,
            phone: req.body.phone,
            verifed: false
        }

        const checkUser = await userModel.findOne({email:user.email})

        if(checkUser){
            return res.json({
                "response":"User is already on the app"
            })
        }

        user.otp = otpHelper.generateOTP();
        user.otp_expiry = otpHelper.expiry_time(); 
        const salt =  passwordHelper.generateSalt();
        user.salt = salt;
        user.password =  passwordHelper.hashPassword(user.password,salt);


        const response = await userModel.create(user);
        if(response){

            await otpHelper.sendOTP();
            const token = tokenHelper.createToken(user.email);
            return res.json({
                "success":true,
                "response":response,
                "otp":'success',
                "token":token
    
            })
        }else{
            throw "something went wrong"
        }
        

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }


}

exports.loginUser = async (req, res) => {
    
}

exports.getAllUsers = async (req, res) => {

    try {

        const users = await userModel.find();
        return res.json({
            "success":true,
            "response":users
        })

    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })

    }
}
