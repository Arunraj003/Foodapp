import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Placing user order from frontend
const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost:5137";
  // const frontend_url = "https://foodappproject-mrx2pnc83-arun-raj-rs-projects.vercel.app/";

  try {
    // Create new order
    const newOrder = new orderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // Save the order to the database
    await newOrder.save();

    // Clear user's cart after order is placed
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

    // Prepare line items for Stripe checkout session
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 100, // Assuming item.price is in USD
      },
      quantity: item.quantity,
    }));

    // Add delivery charges to line items
    line_items.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 200, // Assuming delivery charge is 2 USD
      },
      quantity: 1,
    });

    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // Respond with the session URL
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error placing order" });
  }
};

// Verifying the order payment status
const verifyOrder = async (req, res) => {
  const { orderId, success } = req.query; 

  try {
    if (success === "true") {
      // Mark order as paid
      await orderModel.findByIdAndUpdate(orderId, { payment: true });
      res.json({ success: true, message: "Payment successful" });
    } else {
      // Delete order if payment failed
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "Payment failed, order canceled" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error verifying payment" });
  }
};

// Fetching user orders for frontend
const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error fetching orders" });
  }
};

// listing orders for admin panel
const listOrders = async (req,res)=> {
  try {
    const orders = await orderModel.find({});
    res.json({success:tru,data:orders})
  } catch (error) {
    console.log({success:false,message:"Error"});
  }
}


// api for update order status
const updateStatus = async (req,res) => {
  try {
    await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
    res.json({success:true,message:"Status updated"})
  } catch (error) {
    console.log(error);
    res.json({success:false,message:"Error"});
  }
}

export { placeOrder, verifyOrder, userOrders , listOrders,updateStatus};
