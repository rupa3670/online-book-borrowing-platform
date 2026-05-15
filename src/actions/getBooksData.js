"use server"

export const getAllBooksData = async() => {
const res = await fetch("https://online-book-borrowing-platform-six.vercel.app/books.json");

  const data= await res.json()
  return data;

};

export const getBookData = async(id) => {
const res = await fetch("https://online-book-borrowing-platform-six.vercel.app/books.json");

  const data= await res.json()
  const foundBookData= data.find((bookData)=>
bookData.id.toString() === id.toString());
  return foundBookData;

};


export default getAllBooksData;