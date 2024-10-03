import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { readdirSync } from 'fs';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Database connection
mongoose.connect(process.env.DATABASE, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("DB Connected Successfully"))
    .catch((err) => console.log("DB Connection Error =>", err));

// Middleware
app.use(cors({
    credentials: true,
    origin: ['https://task-frontend-csx2.onrender.com'],
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

// Routes autoloading
const routesPath = path.join(__dirname, 'routes');
readdirSync(routesPath).forEach((route) => {
    const routePath = path.join(routesPath, route);
    const router = require(routePath).default;
    app.use('/', router);
});

// Static file serving
app.use(express.static(path.join(__dirname, 'public')));

// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server is running successfully on PORT ${PORT}`));