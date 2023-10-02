const mongoose = require('mongoose')
const memberSchema = mongoose.Schema({
   
    
    us: { type: mongoose.Schema.Types.ObjectId,required:true,ref: "User", },
    community: { type: mongoose.Schema.Types.ObjectId,required:true,ref: "Community", },
    role: { type: mongoose.Schema.Types.ObjectId,required:true,ref: "Role", },
   
        created_at:{type: Date},
    
},{
    timeStamps: true
}
    
);

const Member = mongoose.model("Member", memberSchema);
module.exports = Member;
