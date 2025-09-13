import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import { getEnvVar } from './utils/getEnvVar.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { errorHandler } from './middlewares/errorHandler.js';
import authRouter from './routes/auth.js';
import shopRouter from './routes/shop.js';
import addAndRemoveFavorites from './routes/addAndDeleteFromFavorites.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';


dotenv.config();

const PORT = Number(getEnvVar('PORT', '4561'));

export const setupServer = () => {
    const app = express();
    
        app.use(express.json());
    app.use(cors({
        origin: "*"
    }));
    app.use(cookieParser());
    app.use('/auth', authRouter);
    app.use('/shops', shopRouter);
    app.use('/users', addAndRemoveFavorites);
    app.use('/api-docs', swaggerDocs());
    app.use(notFoundHandler);
    app.use(errorHandler);
        app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};