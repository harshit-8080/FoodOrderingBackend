const bcrypt = require("bcrypt");

exports.generateSalt = () => {

    const salt = bcrypt.genSaltSync(8);
    return salt;

} 

exports.hashPassword = (password,salt) => {

    const hashedPassword =  bcrypt.hashSync(password,salt);
    return hashedPassword;

} 