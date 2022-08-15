const userService= require('../Service/userService');

module.exports.register = function(req,res){
    let data=req.body;
    let email=data.email;
    let password = data.password;
    let phone=data.phone;
    let name=data.name;
    if(!email || !password || !name || !phone){
        return res.status(400).send({ message: "api-400-all-field-mandatory" });
    }
    let userDetails = {email,name,phone,password};
    userService.register(userDetails)
    .then((data)=>{
        return res.status(201).send({message:"Successfully Registered", data:data});
    })
    .catch((error)=>{
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};

module.exports.login = function(req,res){
    let data=req.body;
    let email=data.email;
    let password = data.password;
    if(!email || !password){
        return res.status(400).send({ message: "api-400-all-field-mandatory" });
    }
    let userDetails = {email,password};
    userService.login(userDetails)
    .then((data)=>{
        return res.status(200).send({message:"Successfully Login", data:data});
    })
    .catch((error) => {
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};

module.exports.userUpdate = function(req,res){
    let data=req.body;
    let user=req.userId;
    userService.update(data,user)
    .then((details)=>{
        return res.status(200).send({message:"Successfully Updated", data:details});
    })
    .catch((error) => {
        return res.status(400).send({message: "api-400-bad-request", error:error.message });
    })
};
