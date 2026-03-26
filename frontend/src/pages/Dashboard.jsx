import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [usersRes, teachersRes] = await Promise.all([
                    api.get('/users'),
                    api.get('/teachers')
                ]);
                setUsers(usersRes.data);
                setTeachers(teachersRes.data);
            } catch (err) {
                if (err.response?.status === 401) {
                    localStorage.removeItem('token');
                    navigate('/login');
                }
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex justify-between items-center bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Dashboard Overview</h1>
                    <p className="text-gray-500 mt-1">Manage personnel and academic records</p>
                </div>
                <button onClick={handleLogout} className="bg-red-50 text-red-600 hover:bg-red-100 font-bold py-2 px-6 rounded-full transition-colors">
                    Logout
                </button>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="flex border-b">
                    <button 
                        className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'users' ? 'bg-indigo-50 border-b-2 border-indigo-600 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('users')}
                    >
                        User System Data
                    </button>
                    <button 
                        className={`flex-1 py-4 font-bold text-center transition-colors ${activeTab === 'teachers' ? 'bg-purple-50 border-b-2 border-purple-600 text-purple-700' : 'text-gray-500 hover:bg-gray-50'}`}
                        onClick={() => setActiveTab('teachers')}
                    >
                        Teacher Academic Data
                    </button>
                </div>

                <div className="p-6">
                    {loading ? (
                        <div className="flex justify-center items-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
                        </div>
                    ) : (
                        <div className="overflow-x-auto">
                            {activeTab === 'users' && (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-semibold rounded-tl-lg">ID</th>
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">Email</th>
                                            <th className="p-4 font-semibold rounded-tr-lg">Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-800">
                                        {users.length > 0 ? users.map(user => (
                                            <tr key={user.id} className="hover:bg-indigo-50/30 transition-colors">
                                                <td className="p-4 font-medium text-gray-500">#{user.id}</td>
                                                <td className="p-4 font-bold">{user.first_name} {user.last_name}</td>
                                                <td className="p-4">{user.email}</td>
                                                <td className="p-4 text-sm text-gray-500">{new Date(user.created_at).toLocaleDateString()}</td>
                                            </tr>
                                        )) : <tr><td colSpan="4" className="text-center p-8 text-gray-500">No users found</td></tr>}
                                    </tbody>
                                </table>
                            )}

                            {activeTab === 'teachers' && (
                                <table className="w-full text-left border-collapse">
                                    <thead>
                                        <tr className="bg-gray-50 text-gray-700 text-sm uppercase tracking-wider">
                                            <th className="p-4 font-semibold rounded-tl-lg">Teacher ID</th>
                                            <th className="p-4 font-semibold">Name</th>
                                            <th className="p-4 font-semibold">University</th>
                                            <th className="p-4 font-semibold">Gender</th>
                                            <th className="p-4 font-semibold rounded-tr-lg">Year Joined</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-gray-800">
                                        {teachers.length > 0 ? teachers.map(teacher => (
                                            <tr key={teacher.id} className="hover:bg-purple-50/30 transition-colors">
                                                <td className="p-4 font-medium text-gray-500">#{teacher.id}</td>
                                                <td className="p-4 font-bold">{teacher.first_name} {teacher.last_name}</td>
                                                <td className="p-4"><span className="bg-purple-100 text-purple-800 px-3 py-1 text-xs font-bold rounded-full">{teacher.university_name}</span></td>
                                                <td className="p-4">{teacher.gender}</td>
                                                <td className="p-4 text-sm text-gray-500">{teacher.year_joined}</td>
                                            </tr>
                                        )) : <tr><td colSpan="5" className="text-center p-8 text-gray-500">No teachers found</td></tr>}
                                    </tbody>
                                </table>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
