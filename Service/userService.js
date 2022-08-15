const userModel=require('../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
module.exports.register = async function(userDetails){
    try{
        let data=await userModel.create(userDetails);
        if(data){
            return data;
        }else{
            throw {message: "Could Not Register" };
        }
    }
    catch(error){
        console.log(error);
        throw{ message: error.message };
    }
};

module.exports.login = async function(userDetails){
    try{
        let data=await userModel.findOne({email:userDetails.email});
        if(data){
            let auth = await bcrypt.compare(userDetails.password,data.password);
            let id=data._id;
            if(auth){
                let jwtToken =jwt.sign({ id }, process.env.JWT_SECRET);
                return {userId: userDetails._id ,emailId:data.email, jwtToken};
              }
              throw {message: "Incorrect Password "};
        }else{
            throw {message: "Email Not Registered" };
        }
    }
    catch(error){
        console.log(error);
        throw{ message: error.message };
    }
};

module.exports.update=async function(data,user){
    try{
    let userData = await userModel.findOne({_id:user});
    if(!userData){
        throw {message:"User not registered"};
    }
    let updatedData = await userModel.findOneAndUpdate({_id:user},data,{new:true});
    return updatedData;
    }
    catch(error){
        console.log(error);
        throw {message:error.message};
    }
}