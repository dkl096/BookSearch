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
        <ul>
            {books.map((book) => (
                <li key={book.id}>
                    <div>
                    <img src={book.volumeInfo.imageLinks?.smallThumbnail} alt={book.volumeInfo.title} />
                    </div>
                    <div>
                    <h3>{book.volumeInfo.title}</h3>
                    <p>{book.volumeInfo.authors?.join(', ')}</p>
                    </div>
                </li>
            ))}
        </ul>
    );
}