import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
  },
  passwordHash: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['user', 'organizer', 'staff', 'admin'],
    default: 'user'},
}, { timestamps: true });

userSchema.statics.hashPassword = async function (pasword){
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(pasword, salt)
}

userSchema.methods.checkPassword = async function (pasword){
    return bcrypt.compare(pasword, this.passwordHash)
}

export const User = mongoose.model('User', userSchema)