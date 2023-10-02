const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const userSchema = mongoose.Schema({
    name: { type: String, required: true,minLength:2 },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true,minLength:2 },
    
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    created_at:{type: Date},
    
},{
    timeStamps: true
}
    
);
userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}
userSchema.pre('save', async function (next) {
    if (!this.isModified) {
        next()
    }
    const salt=await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})
const User = mongoose.model("User", userSchema);
module.exports = User;
