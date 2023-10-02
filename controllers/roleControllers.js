const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const Community = require("../models/communityModel");
const Role = require("../models/roleModel");

const createRole = asyncHandler(async (req,res) => {

    const { name } = req.body;
    if (!name) {
        req.status(400);
        throw new Error("Please Enter all the details");
    }
    
    const role = await Role.create({
        name,
        created_at: Date.now(),
        updated_at:Date.now()
    });
    if (role) {
        res.status(201).json(
            {
                status:true,
                content: {
                    data: {
                        _id: role._id,
                        name: role.name,
                        created_at: role.created_at,
                        updated_at: role.updated_at,
                    },
                   
                }
        });
    } else {
        throw new Error("Failed to create Role");
    }
});
const allRoles = asyncHandler(async (req,res) => {
    const allData = await Role.find();
    // console.log(allData);
    const itemsPerPage = 10;
    const { page } = req.query; 
    const currentPage = parseInt(page) || 1; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    
    const pageData = allData.slice(startIndex, endIndex);
    const total = allData.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    if (allData) {
        res.status(201).json(
            {
                status: true,
                meta: {
                    total,
                    pages:totalPages,
                    page: 1
                },
                content: {
                    data: pageData,
                   
                }
        });
    } else {
        throw new Error("Failed to create Role");
    }
});


module.exports = { createRole ,allRoles};