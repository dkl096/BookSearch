import { NextResponse } from "next/server";
import axios from "axios";

/**
 * Function:
 * This code handles API routing for searching books in Google Books API
 * 
 * Parameters:
 * Request object
 * 
 * Returns:
 * JSON response containing search result from google api
 * 
 * Example:
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
         const response = await axios.get("https://www.googleapis.com/books/v1/volumes", {
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