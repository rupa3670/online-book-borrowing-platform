import { MongoClient } from 'mongodb';

const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('Please add MONGO_URI to your .env file');
}

let clientPromise;

if (process.env.NODE_ENV === 'development') {
  if (!global._mongoClientPromise) {
    global._mongoClientPromise = new MongoClient(uri).connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  clientPromise = new MongoClient(uri).connect();
}

export default clientPromise;