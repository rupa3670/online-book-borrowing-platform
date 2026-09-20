"use client";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Search } from "lucide-react";

const SearchBar = () => {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const router = useRouter();

    const handleSearch = (term) => {
        const params = new URLSearchParams(searchParams);
        if (term) {
            params.set("query", term);
        } else {
            params.delete("query");
        }
        router.replace(`${pathname}?${params.toString()}`);
    };

    return (
        <div className="flex justify-center w-full max-w-md mx-auto">
           
            <div className="flex items-center w-full bg-white border border-emerald-600/30 rounded-full px-4 py-2.5 shadow-sm focus-within:border-emerald-500 focus-within:shadow-md transition-all duration-300">
                <Search className="h-5 w-5 text-gray-400 shrink-0 mr-2" />
                <input 
                    type="search" 
                    className="w-full bg-transparent text-gray-800 placeholder-gray-400 text-sm font-medium focus:outline-none"
                    placeholder="Search by book title or keywords..." 
                    defaultValue={searchParams.get("query")?.toString()}
                    onChange={(e) => handleSearch(e.target.value)}
                />
            </div>
        </div>
    );
};

export default SearchBar;
