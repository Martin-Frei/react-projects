import { useState } from 'react';
import api from './axiosInstance';

function AxiosDemo() {
  const [users, setUsers] = useState([]);
  const [createdUser, setCreatedUser] = useState(null);
  const [updatedUser, setUpdatedUser] = useState(null);
  const [patchedUser, setPatchedUser] = useState(null);
  const [deleted, setDeleted] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');
  const [loading, setLoading] = useState({
    get: false,
    post: false,
    put: false,
    patch: false,
    delete: false,
  });

  const handleError = (error) => {
    if (error.response) {
      const status = error.response.status;
      switch (status) {
        case 400:
          setErrorMsg('Bad Request - check your data');
          break;
        case 401:
          setErrorMsg('Unauthorized - Please Login');
          break;
        case 403:
          setErrorMsg('Forbidden - No permission');
          break;
        case 404:
          setErrorMsg('Not found - API Endpoint incorrect');
          break;
        case 408:
          setErrorMsg('Request Timeout - Try again');
          break;
        case 429:
          setErrorMsg('Too many Requests - slow down');
          break;
        case 500:
          setErrorMsg('Internal Server Error - Try later');
          break;
        case 503:
          setErrorMsg('Service is unavailable');
          break;
        default:
          setErrorMsg(`Error: ${status}`);
      }
    } else if (error.request) {
      setErrorMsg('No Response from Server. Check network or API');
    } else {
      setErrorMsg(`Error: ${error.message}`);
    }
  };

  const fetchUsers = async () => {
    setLoading((prev) => ({ ...prev, get: true }));
    setErrorMsg('');
    try {
      const response = await api.get('/users');
      setUsers(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, get: false }));
    }
  };

  const createNewUser = async () => {
    setLoading((prev) => ({ ...prev, post: true }));
    setErrorMsg('');
    try {
      const response = await api.post('/users', {
        name: 'New User',
        username: 'newuser',
        email: 'newuser@example.com',
      });
      setCreatedUser(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, post: false }));
    }
  };

  const replaceUser = async () => {
    setLoading((prev) => ({ ...prev, put: true }));
    setErrorMsg('');
    try {
      const response = await api.put('/users/1', {
        name: 'Updated User',
        username: 'updateduser',
        email: 'updated@example.com',
      });
      setUpdatedUser(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, put: false }));
    }
  };

  const patchUser = async () => {
    setLoading((prev) => ({ ...prev, patch: true }));
    setErrorMsg('');
    try {
      const response = await api.patch('/users/1', {
        email: 'patched@example.com',
        name: 'Patched User',
      });
      setPatchedUser(response.data);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, patch: false }));
    }
  };

  const deleteUser = async () => {
    setLoading((prev) => ({ ...prev, delete: true }));
    setErrorMsg('');
    try {
      const response = await api.delete('/users/1');
      setDeleted(response.status);
    } catch (error) {
      handleError(error);
    } finally {
      setLoading((prev) => ({ ...prev, delete: false }));
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-purple-600 flex items-center gap-2">
        Axios CRUD Operations
        <span className="text-sm font-normal text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
          Create / Read / Update / Delete
        </span>
      </h2>

      {/* GET */}
      <div className="border border-blue-200 rounded-xl p-4 bg-blue-50/50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-semibold text-blue-700">GET Users</h3>
            <p className="text-sm text-gray-600">
              {users.length} Users loaded
            </p>
          </div>
          <button
            onClick={fetchUsers}
            disabled={loading.get}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading.get ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                Loading...
              </>
            ) : (
              'Fetch Users'
            )}
          </button>
        </div>
        <div className="mt-3 max-h-48 overflow-y-auto">
          {users.slice(0, 5).map((user) => (
            <p key={user.id} className="text-sm py-1 border-b border-blue-100 last:border-0">
              {user.name} — {user.email}
            </p>
          ))}
          {users.length > 5 && (
            <p className="text-xs text-gray-400 mt-1">... and {users.length - 5} more</p>
          )}
        </div>
      </div>

      {/* POST */}
      <div className="border border-green-200 rounded-xl p-4 bg-green-50/50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-semibold text-green-700">POST — Create User</h3>
            {createdUser && (
              <p className="text-sm text-green-600">
                Created: {createdUser.name}
              </p>
            )}
          </div>
          <button
            onClick={createNewUser}
            disabled={loading.post}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading.post ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                Creating...
              </>
            ) : (
              'Create User'
            )}
          </button>
        </div>
      </div>

      {/* PUT */}
      <div className="border border-yellow-200 rounded-xl p-4 bg-yellow-50/50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-semibold text-yellow-700">PUT — Replace User</h3>
            {updatedUser && (
              <p className="text-sm text-yellow-600">
                Updated: {updatedUser.name}
              </p>
            )}
          </div>
          <button
            onClick={replaceUser}
            disabled={loading.put}
            className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading.put ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                Updating...
              </>
            ) : (
              'Update User (ID: 1)'
            )}
          </button>
        </div>
      </div>

      {/* PATCH */}
      <div className="border border-purple-200 rounded-xl p-4 bg-purple-50/50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-semibold text-purple-700">PATCH — Partial Update</h3>
            {patchedUser && (
              <p className="text-sm text-purple-600">
                Patched: {patchedUser.name}
              </p>
            )}
          </div>
          <button
            onClick={patchUser}
            disabled={loading.patch}
            className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading.patch ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                Patching...
              </>
            ) : (
              'Patch User (ID: 1)'
            )}
          </button>
        </div>
      </div>

      {/* DELETE */}
      <div className="border border-red-200 rounded-xl p-4 bg-red-50/50">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div>
            <h3 className="font-semibold text-red-700">DELETE — Remove User</h3>
            {deleted && (
              <p className="text-sm text-red-600">
                Deleted! Status: {deleted}
              </p>
            )}
          </div>
          <button
            onClick={deleteUser}
            disabled={loading.delete}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {loading.delete ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full"></span>
                Deleting...
              </>
            ) : (
              'Delete User (ID: 1)'
            )}
          </button>
        </div>
      </div>

      {/* Error Message */}
      {errorMsg && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-start gap-2">
          <div>
            <strong>Error:</strong> {errorMsg}
            <button
              onClick={() => setErrorMsg('')}
              className="ml-3 text-sm text-red-500 hover:text-red-700"
            >
              Dismiss
            </button>
          </div>
        </div>
      )}

      {/* Info */}
      <div className="text-xs text-gray-400 border-t border-gray-100 pt-3 flex flex-wrap gap-2">
        <span className="bg-purple-50 px-2 py-1 rounded">Full CRUD</span>
        <span className="bg-gray-50 px-2 py-1 rounded">JSONPlaceholder</span>
        <span className="bg-gray-50 px-2 py-1 rounded">Axios Interceptors</span>
      </div>
    </div>
  );
}

export default AxiosDemo;