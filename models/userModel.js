const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const userSchema = new Schema({
    email:{
        type:String,
        require:true,
        //unique:true
    },
    name:{
        type:String,
        require:true
    },
    password:{
        type:String,
        require:true
    },
    phone:{
        type:String,
        require:true
    },
    status:{
        type: String,
        enum: ["active", "pending"],
        default: "pending",
        required: true,
    },
    books:[],
},{timestamps:true});

userSchema.pre("save", async function (next) {
    let salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

module.exports = mongoose.model("Users",userSchema);
