const mongoose = require("mongoose");


const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  image: {
    public_id: { type: String, required: true },
    url: { type: String, required: true },
  },
  description: { type: String, required: true },
  price: { type: Number, required: true,min:4 },
  stock: { type: Number, required: true,default:1  },
  category: { type: String, required: true },
  reviews: [{
    
    userId:{ type:mongoose.Schema.Types.ObjectId,
        ref:"user"},
    username: { type: String, required: true },
    comments: { type: String, required: true },
    rating: { type: Number, required: true },
  }],
  ratings:{
    type:Number,
    default:0
  },
  user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"user"
  },

  numOfReviews: { type: Number, default: 0 },
});

module.exports = mongoose.model("product", productSchema);
