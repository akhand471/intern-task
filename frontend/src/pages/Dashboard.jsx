import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function Dashboard() {
    const [users, setUsers] = useState([]);
    const [teachers, setTeachers] = useState([]);
    const [activeTab, setActiveTab] = useState('users');
    const [loading, setLoading] = useState(true);
    const [hoverId, setHoverId] = useState(null);
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

    return (
        <div className="space-y-8 animate-slide-up w-full max-w-6xl mx-auto pb-12">
            <div className="glass-panel p-8 rounded-3xl flex flex-col md:flex-row md:justify-between md:items-end gap-6 relative overflow-hidden">
                <div className="absolute -right-20 -top-20 w-64 h-64 bg-gradient-to-br from-indigo-500/20 to-purple-500/20 rounded-full blur-3xl"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-widest mb-3">
                        <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span> Network Active
                    </div>
                    <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight leading-tight">Administrative <br/> Overview Directory</h1>
                </div>
                <div className="relative z-10 flex items-center gap-4">
                    <div className="hidden md:flex flex-col text-right">
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">Authenticated</span>
                        <span className="text-sm font-semibold text-gray-900">Administrator</span>
                    </div>
                    <button onClick={() => { localStorage.removeItem('token'); navigate('/login'); }} className="group flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-200 text-gray-700 hover:text-red-600 font-semibold py-2.5 px-6 rounded-xl transition-all shadow-sm">
                        <svg className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        Logout
                    </button>
                </div>
            </div>

            <div className="glass-panel rounded-3xl overflow-hidden shadow-2xl shadow-indigo-900/5 animate-slide-up delay-100">
                <div className="flex border-b border-gray-100 bg-white/50 p-2 gap-2">
                    <button onClick={() => setActiveTab('users')} className={`flex-1 py-3.5 px-6 font-bold text-sm rounded-2xl transition-all flex justify-center items-center gap-2 ${activeTab === 'users' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:bg-white hover:shadow-sm'}`}>
                        <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        Global User Identities
                    </button>
                    <button onClick={() => setActiveTab('teachers')} className={`flex-1 py-3.5 px-6 font-bold text-sm rounded-2xl transition-all flex justify-center items-center gap-2 ${activeTab === 'teachers' ? 'bg-purple-600 text-white shadow-md' : 'text-gray-500 hover:bg-white hover:shadow-sm'}`}>
                        <svg className="w-5 h-5 opacity-80" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /></svg>
                        Teacher Academic Deployments
                    </button>
                </div>

                <div className="p-0 bg-white">
                    {loading ? (
                        <div className="flex flex-col justify-center items-center py-20 gap-4">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 border-t-2 border-t-transparent"></div>
                            <span className="text-gray-500 font-medium text-sm animate-pulse">Syncing secure records...</span>
                        </div>
                    ) : (
                        <div className="overflow-x-auto w-full">
                            {activeTab === 'users' && (
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="border-b-2 border-gray-100 bg-gray-50/50">
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">ID / User Ref</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Full Name</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Contact Email</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest text-right">Timestamp</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {users.length > 0 ? users.map(user => (
                                            <tr key={user.id} onMouseEnter={() => setHoverId(user.id)} onMouseLeave={() => setHoverId(null)} className="hover:bg-indigo-50/40 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-100 text-gray-500 font-mono text-xs group-hover:bg-indigo-100 group-hover:text-indigo-700 transition-colors">
                                                        SYS-{user.id.toString().padStart(4, '0')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5 font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
                                                    {user.first_name} {user.last_name}
                                                </td>
                                                <td className="px-6 py-5 text-gray-600 font-medium font-mono text-xs">{user.email}</td>
                                                <td className="px-6 py-5 text-gray-400 text-right tabular-nums">{new Date(user.created_at).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric'})}</td>
                                            </tr>
                                        )) : <tr><td colSpan="4" className="text-center py-20 text-gray-400 font-medium">No system users archived.</td></tr>}
                                    </tbody>
                                </table>
                            )}

                            {activeTab === 'teachers' && (
                                <table className="w-full text-left border-collapse whitespace-nowrap">
                                    <thead>
                                        <tr className="border-b-2 border-gray-100 bg-gray-50/50">
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Deploy ID</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Personnel</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Institution Hub</th>
                                            <th className="px-6 py-5 text-xs font-black text-gray-400 uppercase tracking-widest">Metrics</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-100 text-sm">
                                        {teachers.length > 0 ? teachers.map(teacher => (
                                            <tr key={teacher.id} onMouseEnter={() => setHoverId(`t-${teacher.id}`)} onMouseLeave={() => setHoverId(null)} className="hover:bg-purple-50/40 transition-colors group">
                                                <td className="px-6 py-5">
                                                    <span className="inline-flex items-center justify-center px-3 py-1 rounded-md bg-gray-100 text-gray-500 font-mono text-xs group-hover:bg-purple-100 group-hover:text-purple-700 transition-colors">
                                                        TCH-{teacher.id.toString().padStart(4, '0')}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="font-bold text-gray-900 group-hover:text-purple-700 transition-colors">{teacher.first_name} {teacher.last_name}</div>
                                                    <div className="text-xs text-gray-500 font-mono mt-0.5">{teacher.email}</div>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <span className={`inline-flex items-center font-bold text-xs px-3 py-1.5 rounded-lg border transition-all ${hoverId === `t-${teacher.id}` ? 'bg-white shadow-sm border-purple-200 text-purple-700 translate-x-1' : 'bg-purple-50 border-transparent text-purple-800'}`}>
                                                        {teacher.university_name}
                                                    </span>
                                                </td>
                                                <td className="px-6 py-5">
                                                    <div className="flex items-center gap-3">
                                                        <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs font-bold uppercase">{teacher.gender}</span>
                                                        <span className="flex items-center gap-1 text-gray-500 font-medium text-xs">
                                                            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                                            {teacher.year_joined}
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        )) : <tr><td colSpan="4" className="text-center py-20 text-gray-400 font-medium">No personnel archived.</td></tr>}
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
