import { Schema, model } from 'mongoose';

const flowersModel = new Schema({
    shopId: {
        type: Schema.Types.ObjectId,
        ref: 'shops'
    },
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
    },
    price: {
        type: String,
        required: true
    },
    images: [{
        type: String
    }
    ],
    dataAdded: {
        type: Date,
        default: () => new Date(),
        required: true
    },
    isFavorite: {
        type: Boolean
    },
    available: {
        type: Boolean
    }
});

export const flowersCollection = model('flowers', flowersModel, 'flowersInDB');