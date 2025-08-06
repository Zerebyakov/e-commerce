import argon2  from "argon2";
import Users from "../models/Users.js";


export const getUsers = async (req,res) => {
    try {
        const response = await Users.findAll();
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const getUserById = async (req,res) => {
    try {
        const response = await Users.findOne({
            where:{
                uuid: req.params.id
            }
        })
        res.status(200).json(response)
    } catch (error) {
        console.log(error.message)
    }
}

export const createUsers = async (req,res) => {
    const {username, email, password, confPassword, role} =req.body;
    if(password !== confPassword) return res.status(400).json({msg:'Password dan Confirm Password tidak sama'})
    const hashPassword = await argon2.hash(password)
    try {
        await Users.create({
            username: username,
            email: email,
            password: hashPassword,
            role:role
        })
        res.status(201).json({msg:'User Created !!'})
    } catch (error) {
        console.log(error.message)
    }
}


export const updateUsers = async (req,res) => {
    const user = await Users.findOne({
        where:{
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg:'User Not Found!!'})
    const {username, email, password, confPassword, role} = req.body;
    let hashPassword;
    if(password === '' || password === null){
        hashPassword = user.password
    } else{
        hashPassword = await argon2.hash(password)
    }
    if(password !== confPassword) return res.status(400).json({msg:'Password dan Confirm Password tidak sesuai!!'})
    try {
        await Users.update({
            username:username,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id
            }
        })
        res.status(200).json({msg:'User Updated!!'})
    } catch (error) {
        console.log(error.message)
    }
    
}

export const deleteUser = async (req,res) => {
    try {
        await Users.destroy({
            where:{
                id: req.params.id
            }
        })
    } catch (error) {
        console.log(error.message)   
    }
    
}