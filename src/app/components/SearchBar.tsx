import {FormEvent, useState} from 'react';

/**
 * Function:
 * A component to render the search bar
 */

interface SearchBarProps {
    onSearch: (query: string) => void;
}

export default function SearchBar({onSearch}: SearchBarProps) {
    const [query, setQuery] = useState('');

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (query) onSearch(query);
    };

    return (
        <div className='bg-slate-700 p-4 sticky top-0'>
            <h1 className="font-semibold text-center text-white m-4 text-5xl">BookSearch</h1>
            <form onSubmit= {handleSubmit} className="max-w-md mx-auto">   
                <label className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                     <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                      </div>
                    <input 
                        type="search"
                        id="default-search"
                        className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        placeholder="Search books, authors..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form>
        </div>
        
    )
}