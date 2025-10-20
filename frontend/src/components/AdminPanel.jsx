import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Mail, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Filter, 
  Search,
  Eye,
  Edit,
  Save,
  X
} from 'lucide-react';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'http://localhost:8001';

const AdminPanel = () => {
  const [requests, setRequests] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [editingRequest, setEditingRequest] = useState(null);
  const [editForm, setEditForm] = useState({ status: '', admin_notes: '' });

  // Authentication
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Create basic auth header
      const auth = btoa(`${credentials.username}:${credentials.password}`);
      
      const response = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: {
          'Authorization': `Basic ${auth}`
        }
      });
      
      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('admin_auth', auth);
        fetchData();
      } else {
        alert('Неверные учетные данные');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Ошибка авторизации');
    }
  };

  // Check if already authenticated
  useEffect(() => {
    const savedAuth = localStorage.getItem('admin_auth');
    if (savedAuth) {
      setIsAuthenticated(true);
      fetchData();
    } else {
      setLoading(false);
    }
  }, []);

  // Fetch data
  const fetchData = async () => {
    const auth = localStorage.getItem('admin_auth');
    if (!auth) return;

    try {
      // Fetch stats
      const statsResponse = await fetch(`${BACKEND_URL}/api/admin/stats`, {
        headers: { 'Authorization': `Basic ${auth}` }
      });
      const statsData = await statsResponse.json();
      setStats(statsData);

      // Fetch requests
      const requestsResponse = await fetch(
        `${BACKEND_URL}/api/admin/requests?page=${page}&limit=10${filter !== 'all' ? `&status=${filter}` : ''}`,
        {
          headers: { 'Authorization': `Basic ${auth}` }
        }
      );
      const requestsData = await requestsResponse.json();
      setRequests(requestsData.requests);
      setTotal(requestsData.total);
      setLoading(false);
    } catch (error) {
      console.error('Fetch error:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchData();
    }
  }, [page, filter, isAuthenticated]);

  // Update request
  const handleUpdateRequest = async (requestId) => {
    const auth = localStorage.getItem('admin_auth');
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/requests/${requestId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${auth}`
        },
        body: JSON.stringify(editForm)
      });

      if (response.ok) {
        setEditingRequest(null);
        fetchData();
        alert('Заявка обновлена');
      }
    } catch (error) {
      console.error('Update error:', error);
      alert('Ошибка обновления');
    }
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem('admin_auth');
    setIsAuthenticated(false);
    setCredentials({ username: '', password: '' });
  };

  // Login form
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <motion.div 
          className="bg-white rounded-2xl p-8 w-full max-w-md shadow-2xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Админ-панель DigitalFlow
          </h2>
          
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Логин
              </label>
              <input
                type="text"
                value={credentials.username}
                onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="admin"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Пароль
              </label>
              <input
                type="password"
                value={credentials.password}
                onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="••••••••"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Войти
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Загрузка...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              Админ-панель DigitalFlow
            </h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 text-red-600 hover:text-red-700 transition-colors"
            >
              Выйти
            </button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <motion.div 
            className="bg-white rounded-xl p-6 shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <Users className="w-8 h-8 text-blue-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Всего заявок</p>
                <p className="text-2xl font-bold">{stats.total_requests || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl p-6 shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <Mail className="w-8 h-8 text-orange-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Новые</p>
                <p className="text-2xl font-bold">{stats.new_requests || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl p-6 shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <Clock className="w-8 h-8 text-yellow-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">В обработке</p>
                <p className="text-2xl font-bold">{stats.processed_requests || 0}</p>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white rounded-xl p-6 shadow-sm"
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center">
              <CheckCircle className="w-8 h-8 text-green-600" />
              <div className="ml-4">
                <p className="text-sm text-gray-500">Закрытые</p>
                <p className="text-2xl font-bold">{stats.closed_requests || 0}</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl p-6 mb-6 shadow-sm">
          <div className="flex items-center gap-4">
            <Filter className="w-5 h-5 text-gray-500" />
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="all">Все заявки</option>
              <option value="new">Новые</option>
              <option value="processed">В обработке</option>
              <option value="closed">Закрытые</option>
            </select>
          </div>
        </div>

        {/* Requests Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Клиент</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Услуга</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Статус</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Дата</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Действия</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm font-medium text-gray-900">
                      #{request.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{request.name}</div>
                        <div className="text-sm text-gray-500">{request.email}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {request.service || 'Не указано'}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                        request.status === 'new' ? 'bg-orange-100 text-orange-800' :
                        request.status === 'processed' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {request.status === 'new' ? 'Новая' :
                         request.status === 'processed' ? 'В обработке' : 'Закрыта'}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(request.created_at).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => {
                          setEditingRequest(request.id);
                          setEditForm({
                            status: request.status,
                            admin_notes: request.admin_notes || ''
                          });
                        }}
                        className="text-blue-600 hover:text-blue-800 mr-3"
                      >
                        <Edit className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Edit Modal */}
        {editingRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <motion.div 
              className="bg-white rounded-2xl p-6 w-full max-w-md"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <h3 className="text-xl font-bold mb-4">Редактировать заявку #{editingRequest}</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Статус</label>
                  <select 
                    value={editForm.status}
                    onChange={(e) => setEditForm({...editForm, status: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                  >
                    <option value="new">Новая</option>
                    <option value="processed">В обработке</option>
                    <option value="closed">Закрыта</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-2">Заметки</label>
                  <textarea
                    value={editForm.admin_notes}
                    onChange={(e) => setEditForm({...editForm, admin_notes: e.target.value})}
                    className="w-full px-3 py-2 border rounded-lg"
                    rows={3}
                    placeholder="Заметки администратора..."
                  />
                </div>
              </div>
              
              <div className="flex gap-3 mt-6">
                <button
                  onClick={() => handleUpdateRequest(editingRequest)}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
                >
                  Сохранить
                </button>
                <button
                  onClick={() => setEditingRequest(null)}
                  className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-lg hover:bg-gray-400"
                >
                  Отмена
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminPanel;