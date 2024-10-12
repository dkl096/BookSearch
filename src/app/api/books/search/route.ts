import { NextResponse } from "next/server";
import axios from "axios";

const GOOGLE_BOOKS_BASE_URL = "https://www.googleapis.com/books/v1/volumes";

/**
 * This code handles API routing for searching books in Google Books API
 * @param {Request} request - HTTP request object
 * @returns {Promise<NextResponse>} - 
 * 
 * @example
 * // Successful response
 * // Request: GET /api/books/search?q=javascript&page=1
 * // Response: JSON containing Google Books API response
 */

export async function GET(request:Request){
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('q') || "";
    const page = parseInt(searchParams.get('page') || "1", 10);
    const startIndex = (page - 1) * 10;

    if (!query) {
        return NextResponse.json({error: 'Query parameter is missing'}, {status: 400});
    }

    try {
         const response = await axios.get(GOOGLE_BOOKS_BASE_URL, {
            params: {
                q: query,
                startIndex,
                maxResults: 10,
                key: process.env.GOOGLE_BOOKS_API_KEY,
            },
         });
         return NextResponse.json(response.data);

    } catch (error){
        return NextResponse.json({error: (error as Error).message}, {status: 500});
    }
    
}