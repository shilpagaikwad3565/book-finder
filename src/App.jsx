import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import BookCard from './components/BookCard';

export default function App() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [numFound, setNumFound] = useState(0);
  const controllerRef = useRef(null);
  const debounceRef = useRef(null);
  const pageSize = 100; // OpenLibrary default per page

  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current);
    if (!query) {
      setResults([]);
      setNumFound(0);
      setError(null);
      setLoading(false);
      return;
    }
    debounceRef.current = setTimeout(() => {
      setPage(1);
      fetchResults(query, 1);
    }, 450);
    return () => clearTimeout(debounceRef.current);
  }, [query]);

  useEffect(() => {
    if (!query) return;
    fetchResults(query, page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  async function fetchResults(q, p = 1) {
    if (controllerRef.current) controllerRef.current.abort();
    const controller = new AbortController();
    controllerRef.current = controller;
    setLoading(true);
    setError(null);

    try {
      const url = `https://openlibrary.org/search.json?title=${encodeURIComponent(q)}&page=${p}`;
      const res = await fetch(url, { signal: controller.signal });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      const data = await res.json();
      setResults(data.docs || []);
      setNumFound(data.numFound || 0);
    } catch (err) {
      if (err.name === 'AbortError') return;
      console.error(err);
      setError(err.message || 'Unknown error');
      setResults([]);
      setNumFound(0);
    } finally {
      setLoading(false);
    }
  }

  function handleSearchInput(e) {
    setQuery(e.target.value);
  }

  function openWork(doc) {
    if (doc.key) {
      const url = `https://openlibrary.org${doc.key}`;
      window.open(url, '_blank', 'noopener');
    }
  }

  const totalPages = Math.ceil(numFound / pageSize) || 1;

  return (
    <div className="app">
      <header className="header">
        <div className="headerInner">
          <img src="/booklogo192.png" alt="logo" className="logo" />

          <div>
            <h1 className="title">Book Finder</h1>
            <p className="subtitle">Search books quickly using the Open Library API</p>
          </div>
        </div>
      </header>

      <main className="main">
        <div className="searchBox">
          <input
            aria-label="Search books by title"
            placeholder="Search books by title (e.g., 'Pride and Prejudice')"
            value={query}
            onChange={handleSearchInput}
            className="searchInput"
          />
          <div className="helpRow">
            <small>Debounced search (450ms). Results from Open Library.</small>
            {loading && <small> · Loading…</small>}
          </div>
        </div>

        {error && <div className="messageError">Error fetching results: {error}</div>}

        {!error && !loading && !results.length && query && (
          <div className="message">No results found for "{query}".</div>
        )}

        {!query && <div className="message">Start typing a book title to search.</div>}

        <section className="resultsSection">
          {results.map((doc) => (
            <BookCard key={doc.key || doc.cover_edition_key || Math.random()} doc={doc} onOpen={() => openWork(doc)} />
          ))}
        </section>

        {numFound > 0 && (
          <footer className="footer">
            <div>Showing page {page} of {totalPages} — {numFound} results</div>
            <div className="pager">
              <button className="pageBtn" onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}>◀ Prev</button>
              <button className="pageBtn" onClick={() => setPage((p) => p + 1)} disabled={page >= totalPages}>Next ▶</button>
            </div>
          </footer>
        )}
      </main>

      <footer className="smallFooter">
        <small>Built with Open Library API • Responsive • Plain CSS</small>
      </footer>
    </div>
  );
}
