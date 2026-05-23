import React, { useState, useEffect } from 'react';
import { usersAPI } from '../../services/users';
import { useToast } from '../../components/Toast';
import Loader from '../../components/Loader';
import EmptyState from '../../components/EmptyState';
import { 
  Search, 
  Filter, 
  ChevronDown, 
  Edit, 
  Trash2,
  Shield,
  Mail,
  Phone,
  Calendar
} from 'lucide-react';

const AdminUsers = () => {
  const { addToast } = useToast();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: 'user'
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await usersAPI.getAll();
      setUsers(response.data || []);
    } catch (error) {
      console.error('Failed to fetch users:', error);
      // Use mock data if API fails
      setUsers([
        { id: 1, name: 'Ahmed Khan', email: 'ahmed@example.com', phone: '923001234567', role: 'user', createdAt: new Date().toISOString() },
        { id: 2, name: 'Fatima Ali', email: 'fatima@example.com', phone: '923009876543', role: 'user', createdAt: new Date(Date.now() - 86400000).toISOString() },
        { id: 3, name: 'Admin User', email: 'admin@techstore.pk', phone: '923001112223', role: 'admin', createdAt: new Date(Date.now() - 172800000).toISOString() }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredUsers = users.filter(user => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (user.phone || '').includes(searchTerm);
    const matchesRole = roleFilter === 'all' || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const handleEdit = (user) => {
    setEditingUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      phone: user.phone,
      role: user.role
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await usersAPI.delete(id);
        setUsers(users.filter(u => (u._id || u.id) !== id));
        addToast('User deleted successfully', 'success');
      } catch (error) {
        addToast('Failed to delete user', 'error');
      }
    }
  };

  const handleRoleUpdate = async (userId, newRole) => {
    try {
      await usersAPI.updateRole(userId, newRole);
      setUsers(users.map(user => 
        user.id === userId ? { ...user, role: newRole } : user
      ));
      addToast('User role updated successfully', 'success');
    } catch (error) {
      addToast('Failed to update user role', 'error');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingUser) {
        await usersAPI.update(editingUser.id, formData);
        addToast('User updated successfully', 'success');
      } else {
        // Note: Creating users typically requires registration flow
        addToast('User creation requires registration flow', 'warning');
      }
      setShowModal(false);
      setEditingUser(null);
      setFormData({
        name: '',
        email: '',
        phone: '',
        role: 'user'
      });
      fetchUsers();
    } catch (error) {
      addToast('Failed to save user', 'error');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (loading) {
    return <Loader size="lg" text="Loading users..." />;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
            <input
              type="text"
              placeholder="Search users..."
              value={searchTerm}
              onChange={handleSearch}
              className="bg-white border border-gray-200 rounded-lg pl-10 pr-4 py-2 text-[#0f172a] text-sm focus:outline-none focus:border-primary/50 transition-colors w-64"
            />
          </div>
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="bg-white border border-gray-200 rounded-lg pl-4 pr-10 py-2 text-[#0f172a] text-sm focus:outline-none focus:border-primary/50 transition-colors appearance-none cursor-pointer"
            >
              <option value="all">All Roles</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600 pointer-events-none" />
          </div>
        </div>
        <div className="text-gray-600 text-sm">
          Total: {filteredUsers.length} users
        </div>
      </div>

      {/* Users Table */}
      <div className="bg-white shadow-sm border border-gray-100 rounded-xl overflow-hidden">
        {filteredUsers.length === 0 ? (
          <EmptyState type="users" message="No users found" />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-gray-500 text-[10px] font-bold uppercase tracking-wider border-b border-gray-200">
                  <th className="pb-3 pl-6">User</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Role</th>
                  <th className="pb-3">Joined</th>
                  <th className="pb-3 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {filteredUsers.map((user) => (
                  <tr key={user.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                    <td className="py-4 pl-6">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-[#0055ff] to-[#b829dd] rounded-full flex items-center justify-center text-[#0f172a] font-bold flex-shrink-0">
                          {user.name.charAt(0)}
                        </div>
                        <div>
                          <p className="text-[#0f172a] font-bold">{user.name}</p>
                          <p className="text-gray-600 text-xs">ID: {user.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 text-gray-600">{user.email}</td>
                    <td className="py-4 text-gray-600">{user.phone}</td>
                    <td className="py-4">
                      <select
                        value={user.role}
                        onChange={(e) => handleRoleUpdate(user.id, e.target.value)}
                        className={`px-2 py-1 rounded text-[10px] font-bold uppercase border cursor-pointer ${
                          user.role === 'admin'
                            ? 'bg-purple-500/20 text-purple-500 border-purple-500/30'
                            : 'bg-blue-500/20 text-blue-500 border-blue-500/30'
                        }`}
                      >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="py-4 text-gray-600 text-xs">{formatDate(user.createdAt)}</td>
                    <td className="py-4 pr-6 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEdit(user)}
                          className="w-8 h-8 rounded bg-blue-500/20 text-blue-500 hover:bg-blue-500/30 transition-colors flex items-center justify-center"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDelete(user._id || user.id)}
                          className="w-8 h-8 rounded bg-red-500/20 text-red-500 hover:bg-red-500/30 transition-colors flex items-center justify-center"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit User Modal */}
      {showModal && editingUser && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-[#0f172a] font-bold text-lg">Edit User</h2>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                  Phone
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-primary/50 transition-colors"
                />
              </div>
              <div>
                <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-2">
                  Role
                </label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  className="w-full bg-white border border-gray-200 rounded-lg px-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-primary/50 transition-colors"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              <div className="flex justify-end gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-6 py-2 border border-gray-200 text-gray-600 font-bold rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-6 py-2 bg-[#00d4ff] hover:bg-[#00b8e6] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
                >
                  Update User
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminUsers;




