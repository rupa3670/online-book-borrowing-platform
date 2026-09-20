'use server';
import clientPromise from '@/lib/mongodb'; // change to your own db import
import { revalidatePath } from 'next/cache';

export async function borrowBook(bookId, qty) {
  const client = await clientPromise;
  const db = client.db(); // add your db name if needed
  const books = db.collection('books'); // use your collection name

  // Only reduce if enough copies are left
  const result = await books.findOneAndUpdate(
    { id: Number(bookId), available_quantity: { $gte: qty } },
    { $inc: { available_quantity: -qty } },
    { returnDocument: 'after' }
  );

  if (!result) {
    return { success: false, message: 'Not enough copies available.' };
  }

  revalidatePath(`/book-details/${bookId}`);
  return { success: true, message: 'Book borrowed successfully!' };
}