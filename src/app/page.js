import getAllBooksData from "@/actions/getBooksData";
import Image from "next/image";

export default async function Home() {
  const data= await getAllBooksData()

  return (
    <div >
      {data.map(d=>{
        return(
          <p key={d.id}>{d.title}</p>
        )
      })}
    </div>
  );
}
