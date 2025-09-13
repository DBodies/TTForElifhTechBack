import { model, Schema } from 'mongoose';


const orderModel = new Schema({
    orderId: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "users",
        required: false
    },
items: [{
    flowerId: {
        type: Schema.Types.ObjectId,
        ref: "flowers",
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    priceAtOrder: {
        type: Number,
        required: true
    }
}],
    totalPrice: { type: Number, required: true },
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
    deliveryAddress: {
        type: String,
        required: true
    },
    createdAt: { type: Date, default: () => new Date() }, 
    clientTimezone: { type: String, required: true },  
    status: {
        type: String,
        enum: ["pending", "confirmed", "delivered", "canceled"],
        default: "pending"
    }
});

export const orderCollection = model('orders', orderModel, 'orderInDB');