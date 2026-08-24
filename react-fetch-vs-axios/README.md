# Fetch vs Axios Demo

A React demo application comparing the **Fetch API** and **Axios** with full CRUD operations.

## Tech Stack

- React 19 — UI Framework
- Vite 8 — Build Tool
- Axios 1.13 — HTTP Client
- Tailwind CSS 4 — Styling
- JSONPlaceholder — Test API

## Features

- **Fetch API** — Native browser API for HTTP requests
- **Axios** — Extended HTTP client library
- **CRUD Operations** — Create, Read, Update, Delete
- **Toggle View** — Switch between Fetch and Axios
- **Error Handling** — Detailed error management
- **Loading States** — Loading animations for all requests
- **Interceptors** — Request/Response logging

## Installation

```bash
# Clone the repository
git clone <repository-url>
cd react_envaxios

# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## Folder Structure

```
src/
├── App.jsx              # Main component with toggle buttons
├── main.jsx             # Entry point
├── index.css            # Tailwind + custom styles
├── axiosInstance.js      # Axios instance with interceptors
├── UserFetch.jsx        # Fetch API demo
├── UserAxios.jsx        # Axios GET demo
└── AxiosDemo.jsx        # Full CRUD demo
```

## Comparison: Fetch vs Axios

| Feature | Fetch API | Axios |
|---|---|---|
| JSON Parsing | Manual (`response.json()`) | Automatic |
| Error Handling | Network errors only | HTTP status codes treated as errors |
| Interceptors | Not available | Available |
| Request Cancellation | AbortController | CancelToken |
| Timeout | Manual implementation | `timeout` option |
| Browser Support | Modern (2017+) | All browsers |

## CRUD Operations

The demo shows all CRUD operations with Axios:

| Method | Endpoint | Description |
|---|---|---|
| GET | /users | Fetch all users |
| POST | /users | Create new user |
| PUT | /users/1 | Fully update user |
| PATCH | /users/1 | Partially update user |
| DELETE | /users/1 | Delete user |

## Environment Variables (optional)

```env
VITE_API_BASE_URL=https://jsonplaceholder.typicode.com
VITE_API_TIMEOUT=5000
```

## Setup

The application uses JSONPlaceholder as a test API. All operations are idempotent and do not affect the real API.

## License

MIT