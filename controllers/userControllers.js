const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");

const registerUser = asyncHandler(async (req,res) => {

    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        req.status(400);
        throw new Error("Please Enter all the details");
    }
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }
    const user = await User.create({
        name,
        email,
        password,
    });
    if (user) {
        res.status(201).json(
            {
                status:true,
                content: {
                    data: {
                        _id: user.id,
                        name: user.name,
                        email: user.email,
                        created_at: Date.now(),
                    },
                    meta: {
                        token: generateToken(user._id),
                    }
                }
        });
    } else {
        throw new Error("Failed to create user");
    }
});

const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user && (await user.matchPassword(password))) {
        res.json({
           
            status:true,
            content: {
                data: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
                },
                meta: {
                    token: generateToken(user._id),
                }
            }
        })
    } else {
        res.status(401);
        throw new Error("Invalid Email or password");
    }
})
const getMe = asyncHandler(async (req, res) => {
    try {
        const user = await User.findById({ _id: req.user._id });
        // console.log(req.user);
        res.json({
            status: true,
            content: {
                data: {
                    _id: user.id,
                    name: user.name,
                    email: user.email,
                    created_at: user.created_at,
                },
                meta: {
                    token: generateToken(user._id),
                }
            }
        });
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
});
module.exports = { registerUser ,authUser,getMe};