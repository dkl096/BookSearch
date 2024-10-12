/*
Function:
API route to search books that matches the query from Google Books API
*/

import { NextResponse } from "next/server";
import axios from "axios";

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

        // const response = await fetch(
        //     `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResult=${10}`
        // );
        
        // if (!response.ok){
        //     throw new Error('Failed to fetch data from Google Books API');
        // }
    
        // const books = await response.json();
        // return NextResponse.json(books);

    } catch (error){
        return NextResponse.json({error: (error as Error).message}, {status: 500});
    }
    
}