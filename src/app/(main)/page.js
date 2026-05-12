import getAllBooksData from "@/actions/getBooksData";
import Banner from "@/components/shared/Banner";
import MarqueeSection from "@/components/shared/Marquee";
import Image from "next/image";

export default async function Home() {
  const data= await getAllBooksData()

  return (
    <>
     <MarqueeSection books={data}/>
    <Banner/>
   
    </>
    
  );
}
