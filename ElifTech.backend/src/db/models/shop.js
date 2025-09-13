import { model, Schema } from 'mongoose';

const shopModel = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
});

export const shopCollection = model('shops', shopModel, 'shopsInDB');