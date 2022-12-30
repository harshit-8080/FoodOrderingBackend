exports.generateOTP = () => {

    const otp = Math.floor(10000 + Math.random() * 900000)
    return otp;
}

exports.expiry_time = () => {

    const expiry_time = new Date();

    return expiry_time.setTime(new Date().getTime() + (30 * 60 * 1000))
    
}