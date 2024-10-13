'use client';

import { useEffect, useState } from "react";
import Link from "next/link";
import axios from "axios";
import {Book} from "../../../interfaces/Book";

/**
 * Function:
 * Displaying a new page with the details of a book
 * 
 * Parameters: id of the book
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
        <div className = "p-4">
            <div className="pb-4">
            <Link href="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
             Back to Search
            </Link>
            </div>
        <div className="border p-4 rounded-md grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* thumnail image */}
            <div className="col-span-1 flex justify-center items-center">
                <img
                src={book?.volumeInfo.imageLinks?.thumbnail || '/images/placeholder.png'}
                alt={book?.volumeInfo.title}
                className="h-96 w-auto m-2 text-center"
                />
            </div>
            {/* title and authors */}
            <div className="col-span-1 md:col-span-2 flex flex-col">
                {/* title */}
                <div className="text-2xl font-bold mb-4">
                    {book?.volumeInfo.title}
                </div>
                {/* authors */}
                <div className="text-xl font-semibold mb-2">
                    Authors: {book?.volumeInfo.authors?.join(', ')}
                </div>
                {/* description */}
                <div
                    className="text-s text-black"
                    dangerouslySetInnerHTML={{ __html: book.volumeInfo.description || '' }}
                />
      </div>
            </div>
        </div>
        
    );
};

export default BookDetails;