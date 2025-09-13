import { Schema, model } from 'mongoose';

const userModel = new Schema({
    name: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, 'Please enter a valid email address'],
        unique: true,
        required: true
    },
    favorites: [{
        type: Schema.Types.ObjectId,
        ref: "flowers",
        required: false
    }]
},
    {
        timestamps: true
        
});

export const UserCollections = model('users', userModel, 'usersInDB');