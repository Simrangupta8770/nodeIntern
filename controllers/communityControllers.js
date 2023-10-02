const asyncHandler = require("express-async-handler");
const generateToken = require("../config/generateToken");
const User = require("../models/userModel");
const Community = require("../models/communityModel");
const Member = require("../models/memberModel");
const Role = require("../models/roleModel");

const createCommunity = asyncHandler(async (req,res) => {

    const { name } = req.body;
    if (!name) {
        req.status(400);
        throw new Error("Please Enter all the details");
    }
    const user = await User.findById({ _id: req.user._id });
    const role=await Role.findOne({ name: "Community Admin"});
    // console.log(req.user);
    const community = await Community.create({
        name,
        slug: name.toLowerCase(),
        owner: user.id,
        created_at: Date.now(),
        updated_at: Date.now(),
    });
    const member = await Member.create({
        us : user.id,
        community : community.id,
        role : role.id,
    });
    if (community) {
        res.status(201).json(
            {
                status:true,
                content: {
                    data: {
                        _id: community._id,
                        name: community.name,
                        slug: community.slug,
                        owner:community.owner,
                        created_at: community.created_at,
                        updated_at: community.updated_at,
                    },
                   
                }
        });
    } else {
        throw new Error("Failed to create user");
    }
});

const getAllCommunity = asyncHandler(async (req, res) => {

    const allData = await Community.find();
    // console.log(allData);
    const itemsPerPage = 10;
    const { page } = req.query; 
    const currentPage = parseInt(page) || 1; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    console.log(allData[0].owner.id);
    
    const pageData = allData.slice(startIndex, endIndex);
    const formattedPageData =await Promise.all(pageData.map(async(item) => {
        const user = await User.findById(item.owner, 'name');
        // console.log(name);
        return {
        
            _id: item._id,
            name: item.name,
            slug: item.slug,
            owner: {
                _id: item.owner,
                name:user.name
            },
            created_at: item.created_at,
            updated_at: item.updated_at
        };
            
    }));
    // Calculate metadata
    const total = allData.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    if (allData) {
        res.status(201).json(
            {
                status:true,
                meta: {
                    total,
                    pages:totalPages,
                    page: 1
                },
                content: {
                    data: formattedPageData
                    
                   
                }
        });
    } else {
        throw new Error("Failed to create user");
    }
});
const communityMembers = asyncHandler(async (req, res) => {
    // const {commSlug } = req.body;
    const commSlug = req.params.commSlug;

    if (!commSlug) {
     
      return res.sendStatus(400);
    }
  
    var community = await Community.findOne({slug: commSlug});
    if (!community) {
        throw new Error("Community Not found");
    }
    const allData = await Member.find({community : community._id});
    const itemsPerPage = 10;
    const { page } = req.query; 
    const currentPage = parseInt(page) || 1; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    
    const pageData = allData.slice(startIndex, endIndex);
    const formattedPageData =await Promise.all(pageData.map(async(item) => {
        const user = await User.findById(item.us, 'name');
        const role = await Role.findById(item.role, 'name');
        // console.log(name);
        return {
        
            _id: item._id,
            community: item.community,
            user: {
                _id: user._id,
                name:user.name
            },
            role: {
                _id: role._id,
                name:role.name
            },
            created_at: item.created_at,
        };
            
    }));
    // Calculate metadata
    const total = allData.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    if (allData) {
        res.status(201).json(
            {
                status:true,
                meta: {
                    total,
                    pages:totalPages,
                    page: 1
                },
                content: {
                    data: formattedPageData
                    
                   
                }
        });
    } else {
        throw new Error("Failed to create user");
    }
  });
  const communityOwned = asyncHandler(async (req, res) => {
    
  
    const user = await User.findById({ _id: req.user._id });
    const allData = await Community.find({ owner: user._id });
      
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
                status:true,
                meta: {
                    total,
                    pages:totalPages,
                    page: 1
                },
                content: {
                    data: pageData
                    
                   
                }
        });
    } else {
        throw new Error("No community owned");
    }
  });
  
  const communityJoined = asyncHandler(async (req, res) => {
    
  
    const user = await User.findById({ _id: req.user._id });
    const allData = await Member.find({us : user._id});
      
    const itemsPerPage = 10;
    const { page } = req.query; 
    const currentPage = parseInt(page) || 1; 
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = currentPage * itemsPerPage;
    
    const pageData = allData.slice(startIndex, endIndex);
    const formattedPageData =await Promise.all(pageData.map(async(item) => {
        const comm=await Community.findById({_id: item.community})
        const u = await User.findById(comm.owner, 'name');
        console.log(comm);
        return {
        
            _id: comm._id,
            name: comm.name,
            slug: comm.slug,
            owner: {
                _id: comm.owner,
                name:u.name,
            },
            created_at: comm.created_at,
            updated_at: comm.updated_at
        };
            
    }));
    const total = allData.length;
    const totalPages = Math.ceil(total / itemsPerPage);
    if (allData) {
        res.status(201).json(
            {
                status:true,
                meta: {
                    total,
                    pages:totalPages,
                    page: 1
                },
                content: {
                    data: formattedPageData
                    
                   
                }
        });
    } else {
        throw new Error("No community joined");
    }
  });
  


module.exports = {createCommunity,getAllCommunity,communityMembers,communityOwned,communityJoined};