const { payments, Payments } = require("../models/payments");
const { users, Users } = require("../models/users");
const rzpCreateOrder=require("../services/razorpay");


let createOrder = async (req, res, next) => {
  try {
    
     let result =rzpCreateOrder();

     let order = await result.rzp.orders.create(result.details);

    return res.status(201).json({
      status: "succes",
      order_id: order.id,
      key_id: result.rzp.key_id,
    });
  } catch (err) {
    console.log(err)
    return res.status(404).json({
      status: "failed",
      err,
    });
  }
};


let paymentDetails = async (req, res, next) => {
  try {
    let userEmail = req.userDetails.userEmail;
    let payment = new Payments(
      req.body.razorpay_payment_id,
      req.body.razorpay_order_id,
      req.body.razorpay_signature
    );

    let result = await payment.insertIntoDatabase(userEmail);

    return res.json({
      status: "successfull",
    });
  } catch (err) {
    return res.json({
      status: "failed",
      err: err,
    });
  }
};




module.exports={
  createOrder,
  paymentDetails  
}