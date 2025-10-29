# book-finder

Book Finder — a simple React application that searches books by title using the **Open Library Search API**.

## Features
- Search books by title with a debounced input.
- Shows cover image, title, authors, first publish year, and some subjects.
- Open a book's OpenLibrary page in a new tab.
- Responsive grid layout with card components.
- Plain CSS; no external UI framework required.

## Demo
*(Add screenshot: `screenshot.png` located in the project root)*

## Getting started (local)
1. Clone the repo:
```bash
git clone https://github.com/yourusername/book-finder.git
cd book-finder
```

2. Install dependencies and run:
```bash
npm install
npm start
```

This will open the app at `http://localhost:3000`.

## Build
```bash
npm run build
```

## API Reference
This project uses the **Open Library Search API** (no API key required). Example endpoint used in the app:

```
https://openlibrary.org/search.json?title={bookTitle}
```

You can learn more at the Open Library API docs: https://openlibrary.org/dev/docs/api/search

## Deployment
You can deploy this app to Netlify, Vercel, or GitHub Pages. Example using Netlify:

1. Push the repo to GitHub.
2. In Netlify, choose **New site from Git** -> connect GitHub -> select the repository.
3. Build command: `npm run build`, publish directory: `build`.

For Vercel, use the **Import Project** flow and set the framework to **Create React App**.

## Files in this project
- `public/` - static files and favicon/logo
- `src/` - React source files
  - `components/BookCard.jsx` - card component for displaying each book
  - `App.jsx` - main app
  - `App.css`, `components/BookCard.css` - styles

## Notes & Next steps
- You may add favorites, search filters, author search, or a details modal for richer UX.
- The Open Library API returns many results; paging and filtering can be improved.

---
Generated for the take-home challenge. Screenshot placeholder: `screenshot.png`.
