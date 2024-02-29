const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config()


mongoose.connect("mongodb://127.0.0.1:27017/Project").then(()=>{
    console.log("connection succesfull");
}).catch((e)=>{
    console.log(e);
})

const schema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    phone:
    {type:Number,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    confpassword:{
        type:String,
        require: true
    },
    tokens:[{
    token:{
        type: String,
        required:true
        }
}]

})

schema.methods.generateToken=async function(){
    try {
        const tokenuser =jwt.sign({_id:this._id.toString()},process.env.KEY);
        this.tokens = this.tokens.concat({token:tokenuser})
         await this.save();
        // console.log(tokenuser);
        return tokenuser
    } catch (error) {
        
    }
}



schema.pre("save",async function(next){
    if(this.isModified("password")){
this.password = await bcrypt.hash(this.password,10);
    }
next();
})


const usermodel = mongoose.model("userdetail",schema);
module.exports = usermodel;








