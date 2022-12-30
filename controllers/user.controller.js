const {userModel} = require("../models/index");
const passwordHelper = require("../utils/passwordHelper");
const tokenHelper = require("../utils/tokenHelper");
const otpHelper = require("../utils/otpHelper");
const userServices = require("../services/user.service");

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

            await otpHelper.sendOTP(user.otp);
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
    
    try {
        
        const user = {
            email:req.body.email,
            password:req.body.password
        }

        const checkUser = await userServices.getUserByEmail(user.email);
        if(checkUser){

            const checkPassword = passwordHelper.decodePassword(user.password,checkUser.password);
            if(checkPassword){

                const token = tokenHelper.createToken(checkUser.email);

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

exports.verifyUser = async (req, res) => {

    try {
        
        const checkUser = await userServices.getUserByEmail(req.email);
        if(checkUser){

            if(!checkUser.verifed){
                
                const otp = req.body.otp;
                if(parseInt(otp) == checkUser.otp && new Date() < checkUser.otp_expiry){

                    checkUser.verifed = true;
                    await checkUser.save();

                    return res.json({
                        "response":"User verified",
                        "user":checkUser
                    })
                }else{
                    return res.json({
                        "response":"otp wrong or expired"
                    })
                }

            }else{
                return res.json({
                    "response":"User already verified "
                })
            }
        }   
        else{
            return res.json({
                "response":"Invalid User"
            })
        }
    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.requestOtp = async (req, res) => {

    try {
        
        const user = await userServices.getUserByEmail(req.email);
        if(user){

            if(user.verifed){
                return res.json({
                    "response":'user already verifed'
                })
            }
            else{

                const otp = otpHelper.generateOTP();
                const otp_expiry = otpHelper.expiry_time();

                user.otp = otp;
                user.otp_expiry = otp_expiry;
                await otpHelper.sendOTP(otp);
                await user.save();

                return res.json({
                    "response":"otp sent"
                })

            }
        }
        else{

            return res.json({
                "response":'invalid user'
            })
        }


    } catch (error) {
        
        console.log(error);

        return res.json({
            "msg":'internal server error'
        })
    }
}

exports.getUser = async (req, res) => {

    try {
        
        const user  = await userModel.findOne({email:req.email})
        .select({ "otp":0,"otp_expiry":0});
        // .select({ "_id": 1, "firstName": 1,"email":1,"lastName":1,"verifed":1,"phone":1,"address":1});

        if(user){
            return res.json({
                "response":user
            })
        }
        else{
            return res.json({
                "msg":"No User Found"
            })
        }
    } catch (error) {
        
        console.log(error);
        return res.json({
            "msg":"internal server error"
        })
    }
}

exports.updateProfile = async (req, res) => {

    try {
        
        const user = await userServices.getUserByEmail(req.email);
        if(user){

            user.firstName = req.body.firstName || user.firstName,
            user.lastName = req.body.lastName || user.lastName,
            user.phone = req.body.phone || user.phone,
            user.email = req.body.email || user.email
            user.phone = req.body.phone || user.phone
            user.address = req.body.address || user.address
            
            const response = await user.save();

            return res.json({
                "response":response
            })
        }
        else{
            return res.json({
                "msg":"No User Found"
            })
        }
    } catch (error) {
        
        console.log(error);
        return res.json({
            "msg":"internal server error"
        })
    }
}