"use server";
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

const getCollection = async () => {
  const client = await clientPromise;
  return client.db('online_book_library').collection('bookdb');
};

export const getAllBooksData = async () => {
  const col = await getCollection();
  const books = await col.find({}).toArray();
  
  return books.map((b) => ({ ...b, _id: b._id.toString() }));
};

export const getBookData = async (id) => {
  if (!ObjectId.isValid(id)) return null;
  const col = await getCollection();
  const book = await col.findOne({ _id: new ObjectId(id) });
  if (!book) return null;
  return { ...book, _id: book._id.toString() };
};

export default getAllBooksData;