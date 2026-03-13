import express from 'express';
import dotenv from 'dotenv';
import pino from 'pino-http';
import cors from 'cors';
import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';
import { errors } from 'celebrate';

dotenv.config();
const PORT = process.env.PORT || 3000;

const app = express();
app.use(logger);
app.use(pino());
app.use(express.json(
  {type: ['application/json', 'application/vnd.api+json'],}
));
app.use(cors());

app.use(notesRoutes);


// 404 — якщо маршрут не знайдено
app.use(notFoundHandler);

app.use(errors());

// Error — якщо під час запиту виникла помилка
app.use(errorHandler);

await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
