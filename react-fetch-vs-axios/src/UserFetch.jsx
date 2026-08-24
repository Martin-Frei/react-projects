import { useState, useEffect } from 'react';

function UserFetch() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchUsers() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(
          'https://jsonplaceholder.typicode.com/users'
        );

        if (!response.ok) {
          throw new Error(`HTTP Error: ${response.status}`);
        }

        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  if (loading) {
    return (
      <div className="text-center py-8">
        <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
        <p className="mt-2 text-gray-600">Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
        <strong>Error:</strong> {error}
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-blue-600 flex items-center gap-2">
          Fetch API
          <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {users.length} Users
          </span>
        </h2>
        <button
          onClick={() => window.location.reload()}
          className="text-sm text-blue-500 hover:text-blue-700 transition-colors"
        >
          Reload
        </button>
      </div>

      <div className="grid gap-2 max-h-96 overflow-y-auto pr-2">
        {users.map((user) => (
          <div
            key={user.id}
            className="bg-gray-50 hover:bg-blue-50 p-3 rounded-lg transition-colors border border-gray-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-gray-800">{user.name}</p>
                <p className="text-sm text-gray-600">@{user.username}</p>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">{user.email}</p>
                <p className="text-xs text-gray-400">{user.phone}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 text-xs text-gray-400 border-t border-gray-100 pt-3">
        <span className="bg-blue-50 px-2 py-1 rounded">Native Fetch API</span>
        <span className="ml-2 bg-gray-50 px-2 py-1 rounded">JSONPlaceholder</span>
      </div>
    </div>
  );
}

export default UserFetch;