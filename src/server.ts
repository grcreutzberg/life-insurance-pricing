import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose';
import { startup } from '../seed/startup';
import Factor from './controllers/factor';
import Occupations from './controllers/occupations';

import userRoutes from './routes/user';
import authRoutes from './routes/auth';
import coverageRoutes from './routes/coverage';
import quoteRoutes from './routes/quote';

const MONGO = process.env.MONGO || 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
const HOST = process.env.HOST || 'https://localhost';
const PORT = process.env.PORT || 3030;
const LOGMSG = '💚 Waner-On Life Insurance Pricing:';

mongoose.connect(MONGO, {})
  .then(() => console.log(`${LOGMSG} MongoDB connection established successfully`))
  .catch(err => console.log(`${LOGMSG} Failed to connect to MongoDB: ${err}`));

async function start() {
  await startup();
}

start();

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.use('/auth', authRoutes);
app.use('/coverage', coverageRoutes);
app.use('/quote', quoteRoutes);

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`${LOGMSG} Server is running at ${HOST}:${PORT}`);
  });
}

export { app };