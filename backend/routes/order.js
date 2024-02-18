const orderModel=require("../model/orderModel");
const productModel=require("../model/product");
var express = require('express');
var router = express.Router();
const { authorizeRole } = require('../middleware/authorizeRole');

const passport=require("passport");

require("../middleware/passport");

router.post("/newOrder", passport.authenticate("jwt",{session:false}) ,async function(req,res){
    const {
    shippingInfo,
    orderItems,
    paymentinfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice
    }=req.body;
   
    const order=await orderModel.create({
        shippingInfo,
    orderItems,
    paymentinfo,
    itemsPrice,
    shippingPrice,
    taxPrice,
    totalPrice,
    paidAt:Date.now(),
    user:req.user
    })

    res.status(200).json({
        success:true,
        order
    });
})

router.get("/myOrders", passport.authenticate("jwt",{session:false}),async function(req,res){
    console.log(req.user._id);
    const order=await orderModel.find({user:req.user._id});
    console.log(order);
    if(!order){
        const err=new Error("No order with this id");
        next(err);
    }

    res.status(200).json({
     success:true,
     order
    })
})

router.get("/getSingleOrder/:id", passport.authenticate("jwt",{session:false}),async function(req,res)
{

    const order=await orderModel.findOne({_id:req.params.id}).populate("user","name email");

    if(!order)
    {
        const err=new Error("No such order");
        return next(err);
    }

    res.status(200).json({
        success:true,
        order
    })




})


// Admin Routes
router.get("/admin/getAllOrders",passport.authenticate("jwt",{session:false}),authorizeRole("admin"),async function(req,res){
     
    const order=await orderModel.find();
    let total=0

    order.forEach((order)=>{
        total+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        total,
        order
    })
})


router.put("/admin/updateStatus/:id",passport.authenticate("jwt",{session:false}),authorizeRole("admin"),async function(req,res,next){
     
    const order=await orderModel.findOne({_id:req.params.id});
    if(order.orderStatus==="Delivered"){
        const err=new Error("This product is alredy delivered");
        return  next(err);
    }


    order.orderItems.forEach(async(order)=>{
        console.log(order.product +" "+order.quantity)
       await updateStock(order.product,order.quantity);
    })

    order.orderStatus=req.body.status;

    if(req.body.status==="Delivered"){
        order.deliveredAt=Date.now();
    }
     
    await order.save();
    res.status(200).json({
        success:true,
    })
})


router.delete("/admin/delete/:id",passport.authenticate("jwt",{session:false}),authorizeRole("admin"),async function(req,res,next){
     
    const order=await orderModel.findOneAndDelete({_id:req.params.id});

    if(!order){
      const err=new Error("There is no such order");
      return next(err);
    }
 res.status(200).json({
    success:true,
    
})
})

async function updateStock(productId,quantity){
   const product=await productModel.findOne({_id:productId});
   product.stock=product.stock-quantity;

   await product.save();

}
module.exports = router;