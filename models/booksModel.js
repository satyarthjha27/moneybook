const mongoose = require('mongoose');
const Schema=mongoose.mongoose.Schema;

const booksSchema = new Schema({
    bookName:{
        type:String,
        require:true
    },
    total:{
        type:Number,
        default:0
    },
    cashIn:{
        type:Number,
        default:0
    },
    cashOut:{
        type:Number,
        default:0
    },
    user:[],
    dateAndTime:{
        type:String
    },
    
},{timestamps:true});

module.exports = mongoose.model("Books",booksSchema);