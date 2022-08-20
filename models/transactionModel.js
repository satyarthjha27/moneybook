const mongoose = require('mongoose');
const Schema=mongoose.mongoose.Schema;

const transactionSchema = new Schema({
    details:{
        type:String,
        require:true
    },
    amount:{
        type:Number,
        require:true,
        default:0
    },
    types:{
        type:String,
        require:true,
        enum:["cashIn","cashOut"]
    },
    category:{
        type:String,
        // require:true
    },
    mode:{
        type:String,
        // require:true
    },
    image:{
        type:String,
        // require:true
    },
    bookId:{
        type:String
    },
    dateAndTime:{
        type:String
    }
    
},{timestamps:true});

module.exports = mongoose.model("Transaction",transactionSchema);