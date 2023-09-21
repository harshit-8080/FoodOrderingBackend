const mongoose = require("mongoose");
const { Schema } = require("mongoose");

const userSchema = new Schema(
  {
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    verifed: {
      type: Boolean,
      required: true,
    },
    otp: {
      type: Number,
      required: true,
    },
    otp_expiry: {
      type: Date,
      required: true,
    },
    salt: {
      type: String,
      required: true,
    },
    orders: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Order",
      },
    ],
    carts: [
      {
        food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
        unit: { type: Number, required: true },
      },
    ],
  },
  {
    toJSON: {
      transform(doc, ret) {
        delete ret.password,
          delete ret.salt,
          delete ret.createdAt,
          delete ret.updatedAt,
          delete ret.__v,
          delete ret.otp,
          delete ret.otp_expiry;
      },
    },
  }
);

const User = mongoose.model("User", userSchema);

module.exports = User;

/*

Relationships:

orders and carts are arrays within the user schema that define relationships to other MongoDB collections. 

These are examples of using Mongoose's ref option to establish relationships between documents. 

They use mongoose.SchemaTypes.ObjectId to store references to documents in other collections.

Specifically, 

1.  orders is expected to contain references to "Order" documents, 
2.  carts is expected to contain references to "Food" documents.

*/
