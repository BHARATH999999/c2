const { response } = require("express");
const userModel = require("../model/userModel")
const ObjectId = require('mongoose').Types.ObjectId;

async function getAllUsersController(req,res){
    try{
        let users = await userModel.find();
        res.json(users);
    }catch(err){
        res.send(err.message);
    }
}

async function getUserController(req,res){
    try{
        
        if(!ObjectId.isValid(req.params.userId)){
            res.status(400);
            res.send("Invalid userId");
            return;
        }

        const user = await userModel.findById(req.params.userId);
        console.log(user);

        if(user === null){
            res.status(404);
            res.send("User not found with the given id of " + req.params.userId);
            return;
        }

        res.status(200);
        res.json(user);
    }
    catch(err){
        res.status(404);
        res.send(err.message);
    }
}

async function createUserController(req,res){
    try{
        const user = req.body;
        console.log(user);

        if(!user.hobbies){
            res.status(400);
            res.send("userModel validation failed: hobbies: hobbies is missing");
            return;
        }

        const user1 = await userModel.create(user);
        res.status(201);
        res.send({"message" : "user created", "user" : user1});
    }
    catch(err){
        // console.log(err);
        res.status(400);
        res.send(err.message);
    }
}

async function deleteUserController(req,res){
    try{
        const userId = req.params.userId;

        if(!ObjectId.isValid(userId)){
            res.status(400);
            res.send("Invalid userId");
            return;
        }

        const user = await userModel.findById(userId);

        if(user === null){
            res.status(404);
            res.send("User not found with the given id of " + req.params.userId);
            return;
        }

        await userModel.findByIdAndDelete(userId);
        res.status(204);
        res.send({'message' : `User with id of ${userId} has been deleted successfully`});
    }
    catch(err){
        res.send(err.message);
    }
}

async function updateUserController(req, res) {
    try{
        const userId = req.params.userId;
        if(!ObjectId.isValid(userId)){
            res.status(400);
            res.send("Invalid userId");
            return;
        }

        // console.log(req.body);
        const user = await userModel.findByIdAndUpdate(userId, req.body);

        if(user === null){
            res.status(404);
            res.send("User not found with the given id of " + req.params.userId);
            return;
        }
        res.status(200);
        res.send(user);
    }
    catch(err){
        res.send(err.message);
    }
}

module.exports = {
    getAllUsersController:getAllUsersController,
    getUserController : getUserController,
    createUserController : createUserController,
    deleteUserController : deleteUserController,
    updateUserController : updateUserController
}