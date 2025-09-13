import bcrypt from 'bcrypt';
import { UserCollections } from '../db/models/user.js';
import createHttpError from 'http-errors';
import { SessionCollection } from '../db/models/session.js';
import { FIFTEEN_MINUTES, THIRTY_DAY } from '../constants/index.js';
import { randomBytes } from 'crypto';


export const registerUser = async (payload) => {
    const user = await UserCollections.findOne({
        email: payload.email
    });
    if (user) throw createHttpError(409, 'Email in use');

    const encryptedPwd = await bcrypt.hash(payload.password, 10);
    return await UserCollections.create({
        ...payload,
        password: encryptedPwd
    });
};

export const loginUser = async (payload) => {
    const user = await UserCollections.findOne({
        email: payload.email
    });
    if (!user) throw createHttpError(401, 'Email is not found!');
    const isEqual = await bcrypt.compare(payload.password, user.password);
    if (!isEqual) {
        throw createHttpError(401, 'Unauthorized');
    }
    await SessionCollection.deleteOne({
userId: user._id
    });

    const accessToken = randomBytes(30).toString('base64');
    const refreshToken = randomBytes(30).toString('base64');
    
    return await SessionCollection.create({
        userId: user._id,
        accessToken,
        refreshToken,
        accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY)
    });
};

    const createSession = () => {
        const accessToken = randomBytes(30).toString('base64');
        const refreshToken = randomBytes(30).toString('base64');
        return {
            accessToken,
            refreshToken,
accessTokenValidUntil: new Date(Date.now() + FIFTEEN_MINUTES),
        refreshTokenValidUntil: new Date(Date.now() + THIRTY_DAY)        };
};

export const refreshUser = async ({ sessionId, refreshToken }) => {
    const session = await SessionCollection.findOne({
        _id: sessionId,
        refreshToken
    });
    if (!session) {
        throw createHttpError(401, 'Session not found');
    }

    const isSessionTokenExpired =
        new Date() > new Date(session.refreshTokenValidUntil);
    if (isSessionTokenExpired) {
        throw createHttpError(401, 'Session token expired');
    }

    const newSession = createSession();
    await SessionCollection.deleteOne({
        userId: session.userId,
        refreshToken
    });
        return await SessionCollection.create({
        userId: session.userId,
        ...newSession
    });
};
    
export const logoutUser = async (sessionId) => {
   return await SessionCollection.deleteOne({ _id: sessionId });
};