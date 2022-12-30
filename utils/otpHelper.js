const {TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,mySecretNunmber} = require("../configs/sever.config");
const twilio = require("twilio");

exports.generateOTP = () => {

    this.sendOTP();
    const otp = Math.floor(10000 + Math.random() * 900000)
    return otp;
}

exports.expiry_time = () => {

    const expiry_time = new Date();

    return expiry_time.setTime(new Date().getTime() + (30 * 60 * 1000))
    
}

exports.sendOTP = async(otp) => {

    const client = require('twilio')(TWILIO_ACCOUNT_SID, TWILIO_AUTH_TOKEN);

    const message = await client.messages.create({
                        body:`Your OTP ${otp}`,
                        from:`+15642095187`,
                        to:mySecretNunmber
                    })              

}