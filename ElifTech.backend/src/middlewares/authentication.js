import createHttpError from "http-errors";
import { SessionCollection } from "../db/models/session";
import { UserCollections } from "../db/models/user";

export const authentication = async (req, res, next) => {
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        next(createHttpError(401, 'Provide please authorization header'));
    }

    const bearer = authHeader.split(' ')[0];
    const token = authHeader.split(' ')[1];

    if (bearer !== 'Bearer' || !token) {
        next(createHttpError(401, 'Auth header should be of type Bearer'));
        return;
    }

    const session = await SessionCollection.findOne({ accessToken: token });
    if (!session) {
        next(createHttpError(401, 'Session not found'));
        return;
    }

    const isAccessTokenExpired = new Date() > new Date(session.accessTokenValidUntil);
    if (isAccessTokenExpired) {
        next(createHttpError(401, 'Access token expired'));
    }
    
    const user = await UserCollections.findById(session.userId);
    if (!user) {
        next(createHttpError(401));
        return;
    }
    req.user = user;
    next();
};