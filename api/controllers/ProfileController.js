const User = require('../models/UserModel');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.getProfile = async (req, res) => {
    try {
        if (!req.body) {
            res.status(400).send({
                message: "Body can not be empty!"
            });
        }
        const user = new User({
            mobile:req.userData.mobile
        });
        const [users] = await User.checkUser(user);
        if(users.length) {
            res.status(200).json({
                error:true,
                data:users[0],
            })
        } else {
            res.status(500).json({
                error:true,
                message:"User not available",
            })
        }
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};

exports.updateProfile = (req, res) => {
    try {
        bcrypt.hash(req.body.password, 10, async (err, hash) => {
            if (err) {
              return res.status(500).json({
                error: err
              });
            } else {
                const user = new User({
                    username:req.body.username,
                    password:hash,
                    email:req.body.email,
                    mobile:req.userData.mobile,
                });
                const users = await User.updateUser(user);
                if(users[0].affectedRows) {
                    res.status(201).json({
                        error:false,
                        data:"User updated successfully",
                    })
                } else {
                    res.status(400).json({
                        error:true,
                        message:"something went wrong!!!",
                    })
                }
            }
        });
    } catch (error) {
        res.status(400).json({
            error:true,
            message:error.message,
        })
    }
};