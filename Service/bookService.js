const booksModel = require('../models/booksModel');

module.exports.create=async function(bookName,user){
    try{
        // let find = await booksModel.findOne{}
        const book = new booksModel({
            bookName,user
        })
        let d = await book.save();
        return d.toJSON();
    }
    catch(error){
        console.log(error);
        throw {message:error.message};
    }
};

module.exports.delete=async function(id){
    try{
        let data = booksModel.findByIdAndDelete({_id:id});
        if(data){
            return data;
        }
        throw {message:"Book Not Found"};
    }
    catch(error){
        console.log(error);
        throw {message:error.message};
    }
};

module.exports.getBooks=async function(books){
    try{
        let data = [];
        for(var i=0;i<books.length;i++){
            data.push(await booksModel.findOne({_id:books[i]}).sort({'createdAt':-1}));
        }
        if(data.length>0){
            return data;
        }
        throw{message:"Books Not Found"};
    }
    catch(error){
        console.log(error);
        throw {message:error.message};
    }
};