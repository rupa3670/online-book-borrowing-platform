"use client"
import { usePathname, useSearchParams,useRouter } from "next/navigation";


const SearchBar = () => {
    const searchParams=useSearchParams();
    const pathname=usePathname();
    const router=useRouter();
    //const{replace}=useRouter();

    const handleSearch=(term)=>{
        const params=new URLSearchParams(searchParams);
        if(term){
            params.set("query",term);

        }
        else{
            params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`);
    }
    return (
       <div className="flex justify-center">
         <label className="input">
  <svg className="h-[1em] opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
    <g
      strokeLinejoin="round"
      strokeLinecap="round"
      strokeWidth="2.5"
      fill="none"
      stroke="currentColor"
    >
      <circle cx="11" cy="11" r="8"></circle>
      <path d="m21 21-4.3-4.3"></path>
    </g>
  </svg>
  <input type="search" 
  className="grow"
  placeholder="Search by book title.." 
  defaultValue={searchParams.get("query")?.toString()}
  onChange={(e)=>handleSearch(e.target.value)}
  />
</label>
       </div>
    );
};

export default SearchBar;