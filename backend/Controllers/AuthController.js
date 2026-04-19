const bcrypt = require('bcrypt');
const UserModel = require('../Models/User');
const jwt=require("jsonwebtoken");
const signup=async (req,res)=>{
    try{
        const {name,email,password} =req.body;
        const user = await UserModel.findOne({email});
        if(user){
            return res.status(409)
                .json({
                    message : "User already exists , you can directly login ",
                    success: false
                })
        }
        const userModel = UserModel({name,email,password});
        userModel.password =await bcrypt.hash(password,10);
        await userModel.save();
        const jwtToken =jwt.sign(
            {email:userModel.email,_id:userModel._id},
            process.env.JWT_SECRET
        )
        res.status(201)
            .json({
                message:"Signup Successful",
                success:true,
                jwtToken
            })
    }catch(err){
        res.status(500)
            .json({
                message:"Internal Server Error",
                success:false,
            })
    }
} 
const login=async (req,res)=>{
    try{
        const {email,password} =req.body;
        const user = await UserModel.findOne({email});
        const errMsg="Auth failed email or password is incorrect";
        if(!user){
            return res.status(403)
            .json({
                message : errMsg,
                success: false
            })
        }
        const isPasEqual =await bcrypt.compare(password,user.password);
        if(!isPasEqual){
            return res.status(403)
            .json({
                message : errMsg,
                success: false
            })
        }
        const jwtToken =jwt.sign(
            {email:user.email,_id:user._id},
            process.env.JWT_SECRET
        )
        res.status(200)
            .json({ 
                message:"Login Successful",
                success:true,
                jwtToken,
                email,
                name:user.name,
            })
    }catch(err){
        console.log(err);
        res.status(500)
            .json({
                message:"Internal Server Error",
                success:false,
            })
    }
}

module.exports ={
    signup,
    login,

}