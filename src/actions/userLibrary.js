'use server';
import clientPromise from '@/lib/mongodb';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { ObjectId } from 'mongodb';
import { revalidatePath } from 'next/cache';

const DB_NAME = 'online_book_library';
const LOAN_DAYS = 14;

const getUserId = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  return session?.user?.id || null;
};

const getDb = async () => {
  const client = await clientPromise;
  return client.db(DB_NAME);
};

export async function toggleWishlist(bookId) {
  const userId = await getUserId();
  if (!userId) {
    return { success: false, message: 'Please log in first.' };
  }
  if (!ObjectId.isValid(bookId)) {
    return { success: false, message: 'Invalid book.' };
  }

  const db = await getDb();
  const wishlist = db.collection('wishlist');

  const existing = await wishlist.findOne({ userId, bookId });
  if (existing) {
    await wishlist.deleteOne({ _id: existing._id });
    return { success: true, added: false, message: 'Removed from wishlist.' };
  }

  const book = await db
    .collection('bookdb')
    .findOne({ _id: new ObjectId(bookId) });
  if (!book) {
    return { success: false, message: 'Book not found.' };
  }

  await wishlist.insertOne({
    userId,
    bookId,
    title: book.title,
    author: book.author,
    category: book.category,
    image_url: book.image_url,
    createdAt: new Date(),
  });

  return { success: true, added: true, message: 'Added to wishlist!' };
}

export async function isBookInWishlist(bookId) {
  const userId = await getUserId();
  if (!userId) return false;

  const db = await getDb();
  const found = await db.collection('wishlist').findOne({ userId, bookId });
  return !!found;
}

export async function getMyBorrows() {
  const userId = await getUserId();
  if (!userId) return [];

  const db = await getDb();
  const items = await db
    .collection('borrows')
    .find({ userId })
    .sort({ borrowedAt: -1 })
    .toArray();

  return items.map((i) => {
    // পুরনো record-এ dueDate না থাকলে ১৪ দিন ধরে নেবে
    const dueDate =
      i.dueDate ||
      new Date(i.borrowedAt.getTime() + LOAN_DAYS * 24 * 60 * 60 * 1000);

    return {
      _id: i._id.toString(),
      bookId: i.bookId,
      title: i.title,
      author: i.author,
      image_url: i.image_url,
      qty: i.qty,
      borrowedAt: i.borrowedAt.toISOString(),
      dueDate: dueDate.toISOString(),
      status: i.status || 'borrowed',
      returnedAt: i.returnedAt ? i.returnedAt.toISOString() : null,
    };
  });
}

export async function getMyWishlist() {
  const userId = await getUserId();
  if (!userId) return [];

  const db = await getDb();
  const items = await db
    .collection('wishlist')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();

  return items.map((i) => ({
    _id: i._id.toString(),
    bookId: i.bookId,
    title: i.title,
    author: i.author,
    category: i.category,
    image_url: i.image_url,
  }));
}

// বই ফেরত দাও
export async function returnBook(borrowId) {
  const userId = await getUserId();
  if (!userId) {
    return { success: false, message: 'Please log in first.' };
  }
  if (!ObjectId.isValid(borrowId)) {
    return { success: false, message: 'Invalid request.' };
  }

  const db = await getDb();

  // শুধু নিজের record, আর আগে ফেরত না দেওয়া হলে
  const record = await db.collection('borrows').findOneAndUpdate(
    { _id: new ObjectId(borrowId), userId, status: { $ne: 'returned' } },
    { $set: { status: 'returned', returnedAt: new Date() } },
    { returnDocument: 'after' }
  );

  if (!record) {
    return { success: false, message: 'Already returned or not found.' };
  }

  // copies আবার বাড়াও
  await db
    .collection('bookdb')
    .updateOne(
      { _id: new ObjectId(record.bookId) },
      { $inc: { available_quantity: record.qty } }
    );

  revalidatePath(`/book-details/${record.bookId}`);
  revalidatePath('/all-books');
  return { success: true, message: 'Book returned. Thank you!' };
}