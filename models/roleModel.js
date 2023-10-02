const mongoose = require('mongoose')
const roleSchema = mongoose.Schema({
   
    name: { type: String, required: true ,minLength :2},
   
        created_at:{type: Date},
        updated_at:{type: Date},
    
},{
    timeStamps: true
}
    
);

const Role = mongoose.model("Role", roleSchema);
module.exports = Role;
