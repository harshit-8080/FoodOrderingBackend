const mongoose = require("mongoose");
const {Schema} = require("mongoose");

const TransactionSchema = new Schema({

    userId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    vendorId:{
        type:Schema.Types.ObjectId,
        required:true
    },
    orderId:{
        type:Schema.Types.ObjectId,
        unique:true
    },
    amount:{
        type:String,
        required:true,
    },
    paymentStatus:{
        type:String,
        required:true
    },
    paymentMode:{
        type:String,
        required:true
    }
},{
    toJSON:{
        transform(doc,ret){
            delete ret.createdAt,
            delete ret.updatedAt,
            delete ret.__v
        }
    }
})

const Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;