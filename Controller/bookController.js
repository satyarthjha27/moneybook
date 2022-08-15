const bookService = require('../Service/bookService');
const userModel = require('../models/userModel');
const booksModel = require('../models/booksModel');

module.exports.create = async function(req,res){
    let userId=req.userId;
    let data=req.body;
    let bookName = data.bookName;
    if(!userId || !bookName){
        return res.status(400).send({message:"api-400-all-field-mandatory"});
    }
    let user=[];
    user.push(userId);
    // let bookDetails = {bookName,user}
    bookService.create(bookName,user)
    .then(async (data)=>{
        let userData = await userModel.findOne({_id:userId});
        let books=userData.books;
        let id=data._id;
        books.push(JSON.stringify(id).substring(1,25));
        await userModel.findOneAndUpdate({_id:user},{books:books},{new:true});
        return res.status(201).send({message:"Successfully Created", data:data});
    })
    .catch((error) => {
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};