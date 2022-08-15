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