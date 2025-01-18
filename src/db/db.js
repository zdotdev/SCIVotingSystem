import { MONGODB_URI } from "$env/static/private";
import mongoose from 'mongoose';

let isConnected = false;

export async function start_mongo() {
  if (!isConnected) {
    try {
      await mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      isConnected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}
