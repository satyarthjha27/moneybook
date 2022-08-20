const tm = require('../models/transactionModel');

module.exports.create=async function(transactiondetails){
    try{
        let data = await tm.create(transactiondetails);
        return data;
    }
    catch(error){
        console.log(error);
        throw {message:error.message};
    }
};

module.exports.delete=async function(id){
    try{
        let data = await tm.findByIdAndDelete({_id:id});
        if(data){
            return data;
        }
        throw {message:"Transaction Not Found"};
    }
    catch(error){
        console.log(error);
        throw {message:error.message};
    }
};

module.exports.update=async function(data,id){
    try{
    let transacrionData = await userModel.findOne({_id:id});
    if(!userData){
        throw {message:"Transaction not registered"};
    }
    let updatedData = await userModel.findOneAndUpdate({_id:id},data,{new:true});
    return updatedData;
    }
    catch(error){
        console.log(error);
        throw {message:error.message};
    }
}

module.exports.getTransaction = async function(bookId){
    try{
        let data= await tm.find({bookId}).sort({'createdAt':-1});
        if(data){
            return data;
        }
        throw{message:"Book Not Found"};
    }
    catch(error){
        console.log(error);
        throw{message:error.message};
    }
}