/*
Function:
A component to render the search result as a list of books
*/

import { Book } from '../../interfaces/Book';

interface BookListProps {
  books: Book[];
}

export default function BookList({books}: BookListProps){
    if (!books || books.length === 0){
        return <p>No books found.</p>;
    }

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-">
            {books.map((book) => (
                <div key={book.id}>
                    <div className = "cursor-pointer border p-4 rounded-md shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={book.volumeInfo.imageLinks?.smallThumbnail}
                            alt={book.volumeInfo.title}
                            className="w-full h-48 object-contain mb-4"
                        />
                        <h3 className="text-lg font-semibold mt-2">{book.volumeInfo.title}</h3>
                        <p className="text-sm text-gray-600">{book.volumeInfo.authors?.join(', ')}</p>
                    </div>
                </div>
            ))}
        </div>

        // <ul>
        //     {books.map((book) => (
        //         <li key={book.id}>
        //             <div>
        //             <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt={book.volumeInfo.title} />
        //             </div>
        //             <div>
        //             <h3>{book.volumeInfo.title}</h3>
        //             <p>{book.volumeInfo.authors?.join(', ')}</p>
        //             </div>
        //         </li>
        //     ))}
        // </ul>
    );
}