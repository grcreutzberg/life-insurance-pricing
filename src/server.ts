import express from 'express';
import * as dotenv from 'dotenv';
dotenv.config()
import mongoose from 'mongoose'

import userRoutes from './routes/user';
import authRoutes from './routes/auth';

const MONGO = process.env.MONGO || 'mongodb://root:root@localhost:27017/?authMechanism=DEFAULT';
const HOST = process.env.HOST || 'https://localhost';
const PORT = process.env.PORT || 8000;
const LOGMSG = '💚 Waner-On Life Insurance Pricing:';

mongoose.connect(MONGO, {})
  .then(() => console.log(`${LOGMSG} MongoDB connection established successfully`))
  .catch(err => console.log(`${LOGMSG} Failed to connect to MongoDB: ${err}`));

async function startup() {
  const app = express();
  app.use(express.json());
  app.use('/users', userRoutes);
  app.use('/auth', authRoutes);

  await app.listen(PORT, () => {
    console.log(`${LOGMSG} Server is running at ${HOST}:${PORT}`);
  });
}
startup();
