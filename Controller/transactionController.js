const booksModel = require('../models/booksModel');
const ts = require('../Service/transactionSercive');

module.exports.create = async function(req,res){
    let data=req.body;
    let details=data.details;
    let amount = data.amount;
    let types=data.types;
    if(!details || !amount || !types){
        return res.status(400).send({ message: "api-400-all-field-mandatory" });
    }
    ts.create(data)
    .then(async (d)=>{
        // console.log(d);
        if(d.types=="cashIn"){
            let bookData = await booksModel.findById(d.bookId);
            let total=bookData.total+d.amount;
            let cashIn=bookData.cashIn+d.amount;
            await booksModel.findOneAndUpdate({_id:d.bookId},{total,cashIn},{new:true});
        }else if(d.types=="cashOut"){
            let bookData = await booksModel.findById(d.bookId);
            let total=bookData.total-d.amount;
            let cashOut=bookData.cashOut+d.amount;
            await booksModel.findOneAndUpdate({_id:d.bookId},{total,cashOut},{new:true});
        }
        else{
            return res.status(400).send({message: "api-400-types-not-found"});
        }
        return res.status(201).send({message:"Successfully Created", data:d});
    })
    .catch((error) => {
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};

module.exports.delete = function(req,res){
    let id=req.body.id;
    ts.delete(id)
    .then(async (d)=>{
        if(d.types=="cashIn"){
            let bookData = await booksModel.findById(d.bookId);
            let total=bookData.total-d.amount;
            let cashIn=bookData.cashIn-d.amount;
            await booksModel.findOneAndUpdate({_id:d.bookId},{total,cashIn},{new:true});
        }else if(d.types=="cashOut"){
            let bookData = await booksModel.findById(d.bookId);
            let total=bookData.total+d.amount;
            let cashOut=bookData.cashOut-d.amount;
            await booksModel.findOneAndUpdate({_id:d.bookId},{total,cashOut},{new:true});
        }
        else{
            return res.status(400).send({message: "api-400-types-not-found"});
        }
        return res.status(200).send({message:"Successfully Deleted", data:d});
    })
    .catch((error) => {
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};

module.exports.update = function(req,res){
    let data=req.body.updateData;
    let id=req.body.id;
    ts.update(data,id)
    .then(async(d)=>{
        if(d.types=="cashIn"){
            let bookData = await booksModel.findById(d.bookId);
            let total=bookData.total+d.amount;
            let cashIn=bookData.cashIn+d.amount;
            await booksModel.findOneAndUpdate({_id:d.bookId},{total,cashIn},{new:true});
        }else if(d.types=="cashOut"){
            let bookData = await booksModel.findById(d.bookId);
            let total=bookData.total-d.amount;
            let cashOut=bookData.cashOut+d.amount;
            await booksModel.findOneAndUpdate({_id:d.bookId},{total,cashOut},{new:true});
        }
        else{
            return res.status(400).send({message: "api-400-types-not-found"});
        }
        return res.status(200).send({message:"Successfully Updated", data:d});
    })
    .catch((error) => {
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};

module.exports.getTransaction = function(req,res){
    let bookId = req.query.bookId;
    ts.getTransaction(bookId)
    .then((data) =>{
        return res.status(200).send({message: "api-200", data});
    })
    .catch((error) => {
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};