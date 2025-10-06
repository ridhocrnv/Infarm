import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase } from '../lib/supabase';
import { User, Shield, Users, FileText, Package, MessageSquare, Settings, Trash2, Edit, Eye } from 'lucide-react';

type AdminDashboardProps = {
    onNavigate: (page: string) => void;
};

type UserData = {
    id: string;
    username: string;
    email: string;
    role: 'user' | 'admin';
    created_at: string;
};

export default function AdminDashboard({ onNavigate }: AdminDashboardProps) {
    const { userProfile, isAdmin } = useAuth();
    const [users, setUsers] = useState<UserData[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState('users');
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalArticles: 0,
        totalProducts: 0,
        totalThreads: 0
    });

    // Redirect if not admin
    useEffect(() => {
        if (!isAdmin) {
            onNavigate('home');
        }
    }, [isAdmin, onNavigate]);

    // Fetch users data
    const fetchUsers = async () => {
        try {
            const { data, error } = await supabase
                .from('users')
                .select('*')
                .order('created_at', { ascending: false });

            if (error) throw error;
            setUsers(data || []);
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    };

    // Fetch statistics
    const fetchStats = async () => {
        try {
            const [usersResult, articlesResult, productsResult, threadsResult] = await Promise.all([
                supabase.from('users').select('id', { count: 'exact' }),
                supabase.from('articles').select('id', { count: 'exact' }),
                supabase.from('products').select('id', { count: 'exact' }),
                supabase.from('forum_threads').select('id', { count: 'exact' })
            ]);

            setStats({
                totalUsers: usersResult.count || 0,
                totalArticles: articlesResult.count || 0,
                totalProducts: productsResult.count || 0,
                totalThreads: threadsResult.count || 0
            });
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    useEffect(() => {
        if (isAdmin) {
            fetchUsers();
            fetchStats();
            setLoading(false);
        }
    }, [isAdmin]);

    // Update user role
    const updateUserRole = async (userId: string, newRole: 'user' | 'admin') => {
        try {
            const { error } = await supabase
                .from('users')
                .update({ role: newRole })
                .eq('id', userId);

            if (error) throw error;

            // Update local state
            setUsers(users.map(user => 
                user.id === userId ? { ...user, role: newRole } : user
            ));
        } catch (error) {
            console.error('Error updating user role:', error);
            alert('Gagal mengupdate role user');
        }
    };

    // Delete user
    const deleteUser = async (userId: string) => {
        if (!confirm('Apakah Anda yakin ingin menghapus user ini?')) return;

        try {
            const { error } = await supabase
                .from('users')
                .delete()
                .eq('id', userId);

            if (error) throw error;

            // Update local state
            setUsers(users.filter(user => user.id !== userId));
        } catch (error) {
            console.error('Error deleting user:', error);
            alert('Gagal menghapus user');
        }
    };

    if (!isAdmin) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <Shield className="h-16 w-16 text-red-500 mx-auto mb-4" />
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Akses Ditolak</h2>
                    <p className="text-gray-600">Anda tidak memiliki izin untuk mengakses halaman ini.</p>
                </div>
            </div>
        );
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
                    <p className="text-gray-600">Memuat dashboard admin...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                    <p className="text-gray-600">Kelola pengguna dan konten platform InFarm</p>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <Users className="h-8 w-8 text-blue-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Total Users</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalUsers}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <FileText className="h-8 w-8 text-green-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Articles</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalArticles}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <Package className="h-8 w-8 text-purple-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Products</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
                            </div>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow p-6">
                        <div className="flex items-center">
                            <MessageSquare className="h-8 w-8 text-orange-600" />
                            <div className="ml-4">
                                <p className="text-sm font-medium text-gray-600">Forum Threads</p>
                                <p className="text-2xl font-bold text-gray-900">{stats.totalThreads}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="bg-white rounded-lg shadow">
                    <div className="border-b border-gray-200">
                        <nav className="-mb-px flex space-x-8 px-6">
                            <button
                                onClick={() => setActiveTab('users')}
                                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                                    activeTab === 'users'
                                        ? 'border-green-500 text-green-600'
                                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                                }`}
                            >
                                <Users className="h-5 w-5 inline mr-2" />
                                Kelola Users
                            </button>
                        </nav>
                    </div>

                    <div className="p-6">
                        {activeTab === 'users' && (
                            <div>
                                <div className="mb-6">
                                    <h3 className="text-lg font-medium text-gray-900">Daftar Users</h3>
                                    <p className="text-sm text-gray-600">Kelola role dan data pengguna</p>
                                </div>

                                <div className="overflow-x-auto">
                                    <table className="min-w-full divide-y divide-gray-200">
                                        <thead className="bg-gray-50">
                                            <tr>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    User
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Role
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Joined
                                                </th>
                                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody className="bg-white divide-y divide-gray-200">
                                            {users.map((user) => (
                                                <tr key={user.id}>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <div>
                                                            <div className="text-sm font-medium text-gray-900">
                                                                {user.username}
                                                            </div>
                                                            <div className="text-sm text-gray-500">
                                                                {user.email}
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap">
                                                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                                            user.role === 'admin'
                                                                ? 'bg-red-100 text-red-800'
                                                                : 'bg-green-100 text-green-800'
                                                        }`}>
                                                            {user.role}
                                                        </span>
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                        {new Date(user.created_at).toLocaleDateString()}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                                                        {user.role === 'user' ? (
                                                            <button
                                                                onClick={() => updateUserRole(user.id, 'admin')}
                                                                className="text-red-600 hover:text-red-900"
                                                            >
                                                                <Shield className="h-4 w-4" />
                                                            </button>
                                                        ) : (
                                                            <button
                                                                onClick={() => updateUserRole(user.id, 'user')}
                                                                className="text-green-600 hover:text-green-900"
                                                            >
                                                                <User className="h-4 w-4" />
                                                            </button>
                                                        )}
                                                        <button
                                                            onClick={() => deleteUser(user.id)}
                                                            className="text-red-600 hover:text-red-900"
                                                        >
                                                            <Trash2 className="h-4 w-4" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Back Button */}
                <div className="mt-8">
                    <button
                        onClick={() => onNavigate('home')}
                        className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                    >
                        Kembali ke Beranda
                    </button>
                </div>
            </div>
        </div>
    );
}
