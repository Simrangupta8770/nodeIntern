const mongoose = require('mongoose')
const communitySchema = mongoose.Schema({
   
    name: { type: String, required: true ,maxLength :128},
    slug: { type: String, required: true,unique:true,maxLength :255},
    owner: { type: mongoose.Schema.Types.ObjectId,
        ref: "User", },
   
        created_at:{type: Date},
        updated_at:{type: Date},
    
},{
    timeStamps: true
}
    
);

const Community = mongoose.model("Community", communitySchema);
module.exports = Community;
