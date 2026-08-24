# React Expense Tracker

A personal finance tracker built with React. Add income and expenses, see your balance at a glance, and persist data across sessions with localStorage.

## Features

- Add income and expense transactions
- Real-time balance calculation with useMemo
- Delete individual transactions
- Data persists in localStorage
- Responsive dark-themed UI
- Color-coded balance indicator (positive/negative)

## Tech Stack

- React 19 + Vite
- Tailwind CSS
- localStorage for data persistence

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the dev server:
   ```bash
   npm run dev
   ```

## Concepts Demonstrated

- `useState` with lazy initialization (reading from localStorage)
- `useMemo` for optimized calculations
- `useEffect` for syncing state to localStorage
- Controlled form inputs
- Conditional rendering and dynamic styling