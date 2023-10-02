const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Community = require("../models/communityModel");
const Role = require("../models/roleModel");
const Member = require("../models/memberModel");


const addMember = asyncHandler(async (req,res) => {

    const { us,community,role } = req.body;
    const comm = await Community.findById(community, 'name');
    if(!comm){
        throw new Error("Please Enter valid Community");
    }
    const mem = await Member.findOne({ us:req.user._id });
    if(!mem){
        throw new Error("Member doesn't exist");
    }
    const r =await Role.findById(mem.role,'name');
    const c =await Community.findById(mem.community,'name');
    console.log(parseInt(c._id) -  parseInt(comm._id)==0);
    if (r.name != 'Community Admin' ||  ((parseInt(c._id) -  parseInt(comm._id))!=0)){
        throw new Error("Permission denied");
    }
    const member = await Member.create({
        us,
        community,
        role,

    });
    await Community.findByIdAndUpdate(c.id, { updated_at: Date.now() });
    if (member) {
        res.status(201).json(
            {
                status:true,
                content: {
                    data: {
                        _id: member._id,
                        us:member.us,
                        community:member.community,
                        role:member.role,
                        created_at: Date.now(),
                       
                    },
                   
                }
        });
    } else {
        throw new Error("Failed to create user");
    }
});

const deleteMember = asyncHandler(async (req,res) => {

    const mem = req.params.mem;
    const user = req.user._id;
    const u=await Member.findOne({us : user});
    const role = await Role.findById({ _id: u.role });
    const member = await Member.findById({ _id: mem });
    if (!member) {
        throw new Error("member not found");
    }
    console.log(member);
    if (role.name != "Community Admin") {
        throw new Error("Not authorized to delete member");
    }
    const result=await Member.deleteOne({ _id: mem });
    if (result) {
        res.status(201).json(
            {
                status: true,
            }
    )
    } else {
        throw new Error("Failed to delete member");
    }
    
});

module.exports = {addMember,deleteMember};