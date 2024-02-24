const mongoose = require("mongoose");
const validator=require("validator");

// console.log(process.env.MONGO_URI);
// mongoose.connect("mongodb://localhost:27017")
//   .then(() => {
//     console.log("Connection Sucessful!");
//   })
//   .catch(() => {
//     console.log("Something went wrong");
//   });

mongoose.connect("mongodb+srv://mandarumare2003:Mandar123@cluster0.oavp6ko.mongodb.net/multivendoreccomerce?retryWrites=true&w=majority")
  .then(() => {
    console.log("Connection Sucessful!");
  })
  .catch(() => {
    console.log("Something went wrong");
  });

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Please enter your name!"],
  },
  password: {
    type: String,
    minLength: [4, "Password should be greater than 4 characters"],
   
  },
 
 email:{
    type:String,
    // required:[true,"Please enter your email"],
    unique:true,
    // validate:[validator.isEmail,"Please enter a valid email"]
 },

 avatar:{
    public_id: { type: String, required: true },
    url: { type: String, required: true }
  
 },
 role:{
    type:String,
    default:"user"
 },
 address: {
  type: String,
  
},
city: {
  type: String,
  
},
country: {
  type: String,
  
},
postalCode: {
  type: String,
  
},
});



module.exports = mongoose.model("user", userSchema);
