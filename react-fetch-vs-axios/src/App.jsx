import { useState } from 'react';
import UserFetch from './UserFetch';
import UserAxios from './UserAxios';
import AxiosDemo from './AxiosDemo';

function App() {
  const [view, setView] = useState('fetch');

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
            🌐 Fetch vs Axios
          </h1>
          <p className="text-gray-600 text-lg">
            Vergleich der HTTP-Clients mit CRUD-Operationen
          </p>
          <div className="mt-2 flex justify-center gap-2 text-sm">
            <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Fetch API</span>
            <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Axios</span>
            <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full">CRUD Demo</span>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          <button
            onClick={() => setView('fetch')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              view === 'fetch'
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 scale-105'
                : 'bg-white text-gray-700 hover:bg-blue-50 shadow-md hover:shadow-lg'
            }`}
          >
            <span>📥</span> Fetch API
            {view === 'fetch' && (
              <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                aktiv
              </span>
            )}
          </button>

          <button
            onClick={() => setView('axios')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              view === 'axios'
                ? 'bg-green-600 text-white shadow-lg shadow-green-200 scale-105'
                : 'bg-white text-gray-700 hover:bg-green-50 shadow-md hover:shadow-lg'
            }`}
          >
            <span>🚀</span> Axios
            {view === 'axios' && (
              <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                aktiv
              </span>
            )}
          </button>

          <button
            onClick={() => setView('demo')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              view === 'demo'
                ? 'bg-purple-600 text-white shadow-lg shadow-purple-200 scale-105'
                : 'bg-white text-gray-700 hover:bg-purple-50 shadow-md hover:shadow-lg'
            }`}
          >
            <span>🔧</span> Axios CRUD
            {view === 'demo' && (
              <span className="ml-1 text-xs bg-white/20 px-2 py-0.5 rounded-full">
                aktiv
              </span>
            )}
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 fade-in border border-gray-100">
          {view === 'fetch' && <UserFetch />}
          {view === 'axios' && <UserAxios />}
          {view === 'demo' && <AxiosDemo />}
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500 border-t border-gray-200 pt-6">
          <div className="flex flex-wrap justify-center gap-4">
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-blue-500 rounded-full"></span>
              <span>Fetch: Native Browser API</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-green-500 rounded-full"></span>
              <span>Axios: Erweiterte HTTP-Client-Bibliothek</span>
            </span>
            <span className="flex items-center gap-1">
              <span className="w-3 h-3 bg-purple-500 rounded-full"></span>
              <span>CRUD: Create, Read, Update, Delete</span>
            </span>
          </div>
          <p className="mt-3 text-xs text-gray-400">
            Daten von JSONPlaceholder — Freie Test-API
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;