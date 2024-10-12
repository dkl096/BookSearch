'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import dynamic from "next/dynamic";
import SearchBar from "./components/SearchBar";
import { Book } from "../interfaces/Book";


const BookList = dynamic(() => import('./components/BookList'), {
  loading: () => <p>Loading...</p>,
  ssr: false
});

export default function Home() {
  const [books, setBooks] = useState<Book[]>([]);
  const [page, setPage] = useState<number>(1);
  const [query, setQuery] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const searchBooksByQuery = async (query: string, page=1) => {
    try{
      const response = await axios.get<{ items: Book[] }>(
        `/api/books/search?q=${query}&page=${page}`
      );
      const newBooks = response.data.items || [];
      setBooks((prevBooks) => (page === 1 ? newBooks : [...prevBooks, ...newBooks]));
      setHasMore(newBooks.length > 0);
    } catch (error){
      setErrorMessage('Error fetching books. Please try again.');
      setBooks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (query: string) => {
    setQuery(query);
    setPage(1);
    searchBooksByQuery(query, 1);
  };

  // Infinite scroll
  const handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 100 &&
      !loading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  useEffect(() => {
    if (query) {
      searchBooksByQuery(query, page);
    }
  }, [page]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore]);

  return (
    <div>
      <h1>BookSearch</h1>
      <SearchBar onSearch={handleSearch} />
      <BookList books={books} />
      {loading && <p>Loading...</p>}
      {errorMessage && <div className="error-popup">{errorMessage}</div>}
    </div>
  );
}
