const mongoose = require("mongoose");
const {Schema} = require("mongoose");


const FoodSchema = new Schema({

    vendorId:{
        type:String
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type:String
    },
    price:{
        type:String,
        require:true
    },
    foodType:{
        type:String
    },
    cookingTime:{
        type:String
    },
    rating:{
        type:String
    },
    images:{
        type:[String]
    }

},{
    timestamps:true,
    toJSON:{
        transform(doc,ret){
            delete ret.__v,
            delete ret.createdAt,
            delete ret.updatedAt
        }
    }
})

const Food = mongoose.model("Food",FoodSchema);

module.exports = Food;