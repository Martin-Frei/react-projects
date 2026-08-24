# React YouTube Clone

A YouTube-inspired video browser built with React, Redux Toolkit, and the YouTube Data API v3. Browse trending videos, search by keyword, watch videos with an embedded player, and save favorites to a playlist.

## Features

- Browse most popular videos (US region)
- Keyword search with real YouTube results
- Embedded video player with stats (views, likes, comments)
- Save & remove videos from a personal playlist
- Responsive grid layout
- Sticky navigation bar

## Tech Stack

- React 19 + Vite
- Redux Toolkit (createAsyncThunk)
- React Router
- Axios
- Tailwind CSS
- YouTube Data API v3

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Create a `.env` file in the project root:
   ```
   VITE_YOUTUBE_API_KEY=your_api_key
   ```
3. Get your API key at [Google Cloud Console](https://console.cloud.google.com/) → Enable YouTube Data API v3
4. Start the dev server:
   ```bash
   npm run dev
   ```

## Folder Structure

```
src/
├── App.jsx
├── main.jsx
├── api/
│   └── youTubeApi.js
├── app/
│   └── store.js
├── components/
│   ├── Navbar.jsx
│   └── VideoCard.jsx
├── features/
│   └── youTubeSlice.js
└── pages/
    ├── Home.jsx
    ├── Playlist.jsx
    └── VideoDetails.jsx
```