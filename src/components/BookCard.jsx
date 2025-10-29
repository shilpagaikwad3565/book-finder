import React from 'react';
import './BookCard.css';

export default function BookCard({ doc, onOpen }) {
  function coverUrl(d) {
    if (d.cover_i) return `https://covers.openlibrary.org/b/id/${d.cover_i}-M.jpg`;
    if (d.isbn && d.isbn[0]) return `https://covers.openlibrary.org/b/isbn/${d.isbn[0]}-M.jpg`;
    // fallback generated svg data URL
    const initials = (d.title || '?').split(' ').slice(0,2).map(s => s[0]).join('').toUpperCase();
    const svg = encodeURIComponent(`<?xml version='1.0' encoding='utf-8'?>
      <svg xmlns='http://www.w3.org/2000/svg' width='180' height='260'>
        <rect width='100%' height='100%' fill='#f2f2f2'/>
        <text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' font-size='48' fill='#666' font-family='Arial, Helvetica, sans-serif'>${initials}</text>
      </svg>`);
    return `data:image/svg+xml;charset=utf-8,${svg}`;
  }

  return (
    <article className="bookCard">
      <img className="bookCover" src={coverUrl(doc)} alt={doc.title} />
      <div className="bookInfo">
        <h3 className="bookTitle">{doc.title}</h3>
        <p className="bookAuthors">{(doc.author_name || []).slice(0,2).join(', ')}</p>
        <p className="bookMeta">First published: {doc.first_publish_year || '—'}</p>
        <p className="bookSubjects">{(doc.subject || []).slice(0,6).join(', ')}</p>
        <div className="cardActions">
          <button className="btnOpen" onClick={onOpen}>Open on OpenLibrary</button>
        </div>
      </div>
    </article>
  );
}
