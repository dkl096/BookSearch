export async function fetchBooks(query: string) {
    try {
        const response = await fetch(`/api/books/search?q=${query}`);
        if (!response.ok) {
            throw new Error('Failed to fetch books data.');
        }
        const data = await response.json();
        return data;
    } catch (error: any) {
        return {
            error: error.message,
            status: 500
        };
    }
}