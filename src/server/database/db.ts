import { MONGODB_URI } from "$env/static/private";
import mongoose from 'mongoose';

let is_connected = false;

export async function start_mongo() {
  if (!is_connected) {
    try {
      await mongoose.connect(MONGODB_URI);
      is_connected = true;
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB:', error);
    }
  }
}
