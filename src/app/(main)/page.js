import getAllBooksData from "@/actions/getBooksData";
import Banner from "@/components/shared/Banner";
import Image from "next/image";

export default async function Home() {
  const data= await getAllBooksData()

  return (
    <>
    <Banner/>
    <div >
      {data.map(d=>{
        return(
          <p key={d.id}>{d.title}</p>
        )
      })}
    </div>
    </>
    
  );
}
