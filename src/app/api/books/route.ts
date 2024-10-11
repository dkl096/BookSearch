import { NextResponse } from "next/server";

export async function GET(request:Request){
    const {searchParams} = new URL(request.url);
    const query = searchParams.get('query');

    if (!query) {
        return NextResponse.redirect('/api/books?query=nextjs');
    }
}