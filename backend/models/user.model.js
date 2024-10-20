import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    fullname: {
        type: String,
        reuqired: true
    },
    email: {
        type: String,
        reuqired: true,
        unique: true,
    },
    phoneNumber: {
        type: String,
        reuqired: true
    },
    passowrd: {
        type: String,
        reuqired: true
    },
    role: {
        type: String,
        enum: ['student', 'recruiter'],
        reuqired: true
    },
    profile: {
        bio: {type: String},
        skills: [{type: String}],
        resume: {type: String}, // URL to resume file
        resumeOriginalName: { type: String },
        company: { type: mongoose. Schema.Types.ObjectId, ref: 'Company'},
        profilePhoto:{
            type:String,
            default:""
        }
    },
}, {timestamps: true});
export const User = mongoose.model('User', userSchema);