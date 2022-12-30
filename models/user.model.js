const mongoose = require("mongoose");
const {Schema}  = require("mongoose");

const userSchema = new Schema ({

    firstName:{
        type:String,
        required:true
    },
    lastName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    },
    verifed:{
        type:Boolean,
        required:true
    },
    otp:{
        type:Number,
        required:true
    },
    otp_expiry:{
        type:Date,
        required:true
    },
    salt:{
        type:String,
        required:true
    }

},{
    toJSON:{
        transform(doc,ret){
            delete ret.password,
            delete ret.salt,
            delete ret.createdAt,
            delete ret.updatedAt,
            delete ret.__v
        }
    }
})

const User = mongoose.model("User", userSchema);

module.exports = User;