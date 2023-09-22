const express = require("express");
const bodyParser = require("body-parser");
const { PORT, appPasscode } = require("./configs/sever.config");
const dbConnection = require("./configs/db.config");
const nodemailer = require("nodemailer");

const {
  AdminRouter,
  VendorRouter,
  ShoppingRouter,
  UserRouter,
  OrderRouter,
  CartRouter,
  TransactionRouter,
} = require("./routes/index");

const app = express();

const startserver = async () => {
  // using body-parser
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: true }));

  // db connection
  await dbConnection();

  // using routes
  app.use("/admin", AdminRouter);
  app.use("/vendor", VendorRouter);
  app.use("/shopping", ShoppingRouter);
  app.use("/user", UserRouter);
  app.use("/order", OrderRouter);
  app.use("/cart", CartRouter);
  app.use("/transaction", TransactionRouter);

  // Create a transporter object using SMTP
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "harshit.new71@gmail.com", // Your Gmail email address
      pass: appPasscode, // Your Gmail password or App Password
    },
  });

  const food = {
    name: "Biryani",
  };
  // Email data
  const mailOptions = {
    from: "harshit.new71@gmail.com", // Sender email address
    to: "harshitrajlnctcse@gmail.com", // Recipient email address
    subject: "Your Order Booked Successfully",
    text: `Your ${food.name} is on the way`,
  };

  app.get("/send/mail", async (req, res) => {
    try {
      // Send the email
      await transporter.sendMail(mailOptions);
      return res.json({ msg: "Mail Sent" });
    } catch (error) {
      return res.json({ Error: error });
    }
  });

  app.listen(PORT, () => {
    console.clear();
    console.log(`app listen at ${PORT}`);
  });
};

startserver();
