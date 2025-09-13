import createHttpError from "http-errors";
import { shopCollection } from "../db/models/shop.js";
import { flowerServices, userFavorite, orderServices } from "../services/shop.js";


export const getAllShopController = async (req, res, next) => {
    try {
            const shops = await shopCollection.find({}).lean();
    res.status(200).json(shops);
    } catch (err) {
        next(err);
    }
};
export const getShopByNameController = async (req,res,next) => {
    try {
        const { id } = req.params;
        const shop = await shopCollection.findById(id);
        if (!shop) throw createHttpError(404, 'Shop not found');
        res.status(200).json(shop);
    } catch (err) {
        next(err);
    }
};
export const getFlowerByShopController = async (req, res, next) => {
    try {
        const { shopId } = req.params;
        const flowers = await flowerServices.getFlowerByShop(shopId, {
            page: Number(req.query.page) || 1,
            limit: Number(req.query.limit) || 10,
            sortBy: req.query.sortBy || "price",
            sortOrder: req.query.sortOrder || "asc",
            onlyFavorites: req.query.onlyFavorites === "true",
            search: req.query.search || "",
        });
        res.json(flowers);
    } catch (err) {
        next(err);
    }
};
export const toggleFavoriteController = async (req, res, next) => {
    try {
        const { userId, flowerId } = req.params;
        const user = await userFavorite.toggleFavorite(userId, flowerId);
        res.json({ favorites: user.favorites });
    } catch (err) {
        next(err);
    }
};
export const removeFavoriteController = async (req, res, next) => {
    try {
        const { userId, flowerId } = req.params;
        const user = await userFavorite.removeFavorites(userId, flowerId);
        res.json({ favorites: user.favorites });
    } catch (err) {
        next(err);
    }
};
export const orderServicesController = async (req, res, next) => {
    try {
        const order = await orderServices.createOrder(req.body);
        res.status(201).json(order);
    } catch (err) {
        next(err);
    }
};
export const getOrderByIdController = async (req, res, next) => {
    try {
        const { orderId } = req.params;
        const order = await orderServices.getOrderById(orderId);
        res.json(order);
    } catch (err) {
        next(err);
    }
};