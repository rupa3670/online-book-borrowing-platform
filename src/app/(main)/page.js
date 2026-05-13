import getAllBooksData from "@/actions/getBooksData";
import Banner from "@/components/shared/Banner";
import Categories from "@/components/shared/Categories";
import FeaturedBooks from "@/components/shared/FeaturedBooks";
import MarqueeSection from "@/components/shared/Marquee";
import Review from "@/components/shared/Review";

import Image from "next/image";

export default async function Home() {
  const data= await getAllBooksData()

  return (
    <>
    <MarqueeSection books={data}/>
    <Banner/>
  
   <FeaturedBooks books={data}/>
   
   <Categories/>
   
    <Review/>
    </>
    
  );
}
