const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },

},{
    timestamps: true
});

userSchema.methods.hashedPassword = async function (loginPassword){
    return bcrypt.compare(loginPassword, this.password);
}

userSchema.pre('save', async function(next) {
    if(!this.isModified){
        // console.log("can not hashed");
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});



module.exports = mongoose.model("User", userSchema);