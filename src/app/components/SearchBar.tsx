import {FormEvent, useState} from 'react';

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
        <div>
            <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Enter book title or author"
            />
            <button type="submit">Search</button>
        </form>
        </div>
        
    )
}