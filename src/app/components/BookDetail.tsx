import { Book } from "../../interfaces/Book";
import {useState, useEffect} from "react";
import { useRouter } from "next/router";

export default function BookDetail() {
    const [book, setBook] = useState<Book | null>(null); // State can either be Book object or null
    const router = useRouter(); 
    const {id} = router.query; // receive book id from the URL

    useEffect(() => {
        const fetchBookDetail = async () => {
            const response = await fetch(`https://www.googleapis.com/books/v1/volumes/${id}`);
            const data = await response.json();
            setBook(data);
        };

        if (id) {
            fetchBookDetail();
        }}, [id]);

    if (!book) return <p>Loading...</p>;

     return (
            <div>
                <h1>{book.bookInfo.title}</h1>
                <p>Author: {book.bookInfo.authors?.join(', ')}</p>
                {
                    book.bookInfo.imageLinks?.thumbnail && (<img src={book.bookInfo.imageLinks.thumbnail} alt={book.bookInfo.title} />)
                }
            </div>
    );

}