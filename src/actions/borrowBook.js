'use server';
import clientPromise from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const LOAN_DAYS = 14;

export async function borrowBook(bookId, qty) {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) {
    return { success: false, message: 'Please log in first.' };
  }

  if (!ObjectId.isValid(bookId) || !Number.isInteger(qty) || qty < 1) {
    return { success: false, message: 'Invalid request.' };
  }

  const client = await clientPromise;
  const db = client.db('online_book_library');

  const book = await db.collection('bookdb').findOneAndUpdate(
    { _id: new ObjectId(bookId), available_quantity: { $gte: qty } },
    { $inc: { available_quantity: -qty } },
    { returnDocument: 'after' }
  );

  if (!book) {
    return { success: false, message: 'Not enough copies available.' };
  }

  const borrowedAt = new Date();
  const dueDate = new Date(borrowedAt.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000);

  await db.collection('borrows').insertOne({
    userId: session.user.id,
    bookId,
    title: book.title,
    author: book.author,
    image_url: book.image_url,
    qty,
    borrowedAt,
    dueDate,
    status: 'borrowed',
  });

  revalidatePath(`/book-details/${bookId}`);
  revalidatePath('/all-books');
  return {
    success: true,
    message: `Book borrowed! Please return within ${LOAN_DAYS} days.`,
  };
}