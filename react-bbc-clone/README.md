# React BBC News Clone

A BBC News-inspired news reader built with React, Redux Toolkit, and the Newsdata.io API. Browse top headlines by country, search for specific topics, and read full articles.

## Features

- Live news feed via Newsdata.io API
- Country filter (USA, Germany, Pakistan, India, Canada)
- Keyword search
- Featured article layout with sidebar headlines
- Article detail page with external link
- 404 page handling

## Tech Stack

- React 19 + Vite
- Redux Toolkit (createAsyncThunk)
- React Router
- Axios
- Tailwind CSS

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   VITE_BASE_URL=https://newsdata.io/api/1/latest?
   VITE_API_KEY=your_api_key
   ```
3. Get your free API key at [newsdata.io](https://newsdata.io/)
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── app/
│   └── store.js
├── features/
│   └── newsSlice.js
└── pages/
    ├── Home.jsx
    └── NewsPage.jsx
```