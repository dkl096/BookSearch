import Link from 'next/link';
import { Book } from '../../interfaces/Book';

/**
 * Function:
 * A component to render the search result as a list of books
 * Parameters:
 * List of Books object received from Google Books API
 * 
 * Output:
 * A list of books with title, author and image, packaged into a clickable card.
 * The card is linked to the books detail page.
 */

interface BookListProps {
  books: Book[];
}

export default function BookList({books}: BookListProps){
    if (!books || books.length === 0){
        return <p className="text-center mt-8">No books found.</p>;
    }
    return (
        <div className="p-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 justify-center">
            {books.map((book) => (
                <Link key={book.id} href={{
                    pathname: `/book/${book.id}`,
                    query: {query: book.volumeInfo.title}
                    }}>
                    <div className = "max-w-96 max-h-full mx-auto cursor-pointer border p-4 rounded-md shadow-sm hover:shadow-xl transition-shadow duration-300">
                        <img
                            src={book.volumeInfo.imageLinks?.smallThumbnail || 'images/placeholder.png'}
                            alt={book.volumeInfo.title}
                            className="w-full h-48 object-contain mb-4"
                        />
                        <h3 className="text-lg font-semibold mt-2">{book.volumeInfo.title}</h3>
                        <div className="text-sm text-black">{book.volumeInfo.authors?.join(', ')}</div>
                    </div>
                </Link>
            ))}
        </div>
        </div>
        
    );
}