'use client';

import { useEffect, useState } from "react";
import axios from "axios";
import {Book} from "../../../interfaces/Book";

/**
 * 
 * @param param0 
 * @returns 
 */

const BookDetails = ({params}: {params: {id: string}}) => { 
    const [book, setBook] = useState<Book | null>(null);
    const [error] = useState<string | null>(null);

    useEffect(() => {
        const fetchBookDetail = async () => {
            try {
                const response = await axios.get(`https://www.googleapis.com/books/v1/volumes/${params.id}`);
                setBook(response.data);
            } catch (error) {
                console.error("Error fetching book details", error);
            }
        };
        fetchBookDetail();
    }, [params.id]);

    if (error) {
        return <div>{error}</div>
    }

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div>
        <h1 className="text-2xl font-bold mb-4">{book?.volumeInfo.title}</h1>
        <img
          src={book?.volumeInfo.imageLinks?.thumbnail || '/placeholder.png'}
          alt={book?.volumeInfo.title}
          className="h-96 w-auto mb-4"
        />
        <h2 className="text-xl font-semibold mb-2">Authors: {book?.volumeInfo.authors?.join(', ')}</h2>
        <div
          className="text-gray-700"
          dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || '' }}
        />
      </div>
    );
};

export default BookDetails;