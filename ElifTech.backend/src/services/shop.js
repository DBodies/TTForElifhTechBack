import createHttpError from "http-errors";
import { shopCollection } from "../db/models/shop.js";
import { flowersCollection } from '../db/models/flowers.js';
import { UserCollections } from "../db/models/user.js";
import { orderCollection } from "../db/models/order.js";
import { v4 as uuidv4 } from "uuid";

export const getAllShop = async (name) => {
    const shops = await shopCollection.find(name);
    if (!shops) throw createHttpError(400, 'Shops don`t found');
};
export const flowerServices = {
    async getFlowerByShop(shopId, options = {}) {
        const {
            page = 1,
            limit = 10,
            sortBy = "dataAdded", 
            sortOrder = "desc",   
         onlyFavorites = false,
        } = options;
        const query = { shopId };
        if (onlyFavorites) {
            query.isFavorite = true;
        }
        const skip = (page - 1) * limit;
        const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 };
         const [flowers, total] = await Promise.all([
      flowersCollection.find(query).sort(sort).skip(skip).limit(limit),
      flowersCollection.countDocuments(query),
         ]);
        return {
            data: flowers,
            total,
            page,
            pages: Math.ceil(total / limit)
        };
    }
};
export const userFavorite = {
    async toggleFavorite(userId, flowerId) {
        const user = await UserCollections.findById(userId);
        if (!user) throw createHttpError(401, 'user not found!');

        const flower = await flowersCollection.findById(flowerId);
        if (!flower) throw createHttpError(401, 'flower not found!');
        
        const index = user.favorites.indexOf(flowerId);

        if (index === -1) {
            user.favorites.push(flowerId);
        }
        else {
            user.favorites.splice(index, 1);
        }
        await user.save();
        return user;
    },
    async removeFavorites(userId, flowerId) {
        const user = await UserCollections.findById(userId);
        if (!user) throw createHttpError(401, "User not found");

        user.favorites = user.favorites.filter(
            favId => favId.toString() !== flowerId.toString()
        );
        await user.save();
        return user;
    }
};
export const orderServices = {
    async createOrder(payload) {
        const { userId, items, name, email, phone, deliveryAddress, clientTimezone } = payload;
        
        let totalPrice = 0;
        const orderItems = [];

        for (const item of items) {
            const flower = await flowersCollection.findById(item.flowerId);
            if (!flower) throw createHttpError(401, `Sorry, flower ${item.flowerId} not found`);
            const price = Number(flower.price) * item.quantity;
            totalPrice += price;

            orderItems.push({
                flowerId: flower._id,
                quantity: item.quantity,
                priceAtOrder: Number(flower.price)
            });
            const newOrder = await orderCollection.create({
                orderId: uuidv4(),
                userId,
                items: orderItems,
                totalPrice,
                name,
                email,
                phone,
                deliveryAddress,
                clientTimezone
            });
            return newOrder;
        }
    },
    async getOrderById(orderId) {
        
        const order = await orderCollection.findOne({ orderId }).populate('items.flowerId');
        if (!order) throw createHttpError(401, 'Sorry, oder is not found');
        return order;
        }
};