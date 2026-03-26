import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '', password: '', first_name: '', last_name: '',
        university_name: '', gender: 'Male', year_joined: new Date().getFullYear()
    });
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [loading, setLoading] = useState(false);
    const [activeSection, setActiveSection] = useState('personal'); // personal | academic
    const navigate = useNavigate();

    const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setSuccess(''); setLoading(true);
        try {
            await api.post('/auth/register', formData);
            setSuccess('Secure profile created! Redirecting to sign in...');
            setTimeout(() => navigate('/login'), 2500);
        } catch (err) {
            const resErrors = err.response?.data?.messages;
            setError(typeof resErrors === 'object' ? Object.values(resErrors).join(', ') : (err.response?.data?.message || 'Registration failed'));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center py-10 animate-slide-up w-full max-w-3xl mx-auto">
            <div className="w-full glass-panel rounded-[2rem] overflow-hidden">
                <div className="p-8 md:p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500"></div>
                    
                    <div className="text-center mb-10">
                        <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-gray-900">Create Profile</h2>
                        <p className="mt-3 text-gray-500 max-w-lg mx-auto">Establish your institutional identity. Enter your professional details below to access internal datatables.</p>
                    </div>

                    {error && <div className="bg-red-50 text-red-600 px-5 py-4 rounded-xl mb-8 text-sm font-semibold border border-red-100 flex items-center shadow-sm animate-slide-up"><span className="mr-3 text-lg">⚠️</span>{error}</div>}
                    {success && <div className="bg-emerald-50 text-emerald-700 px-5 py-4 rounded-xl mb-8 text-sm font-semibold border border-emerald-100 flex items-center shadow-sm animate-slide-up"><span className="mr-3 text-lg">🎉</span>{success}</div>}
                    
                    <form onSubmit={handleSubmit} className="space-y-8">
                        <div className="relative">
                            {/* Section Switcher Tabs */}
                            <div className="flex p-1 bg-gray-100/80 rounded-xl mb-8">
                                <button type="button" onClick={() => setActiveSection('personal')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeSection === 'personal' ? 'bg-white shadow relative text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                    1. Personal Identity
                                </button>
                                <button type="button" onClick={() => setActiveSection('academic')} className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${activeSection === 'academic' ? 'bg-white shadow relative text-indigo-600' : 'text-gray-500 hover:text-gray-700'}`}>
                                    2. Academic Placement
                                </button>
                            </div>

                            <div className="relative w-full overflow-hidden">
                                <div className={`grid grid-cols-1 md:grid-cols-2 gap-5 transition-transform duration-500 ease-in-out ${activeSection === 'personal' ? 'translate-x-0' : '-translate-x-[110%] absolute top-0 w-full opacity-0 pointer-events-none'}`}>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">First Name</label>
                                        <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required={activeSection === 'personal'} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" placeholder="John" />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Last Name</label>
                                        <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required={activeSection === 'personal'} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" placeholder="Doe" />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Work Email</label>
                                        <input type="email" name="email" value={formData.email} onChange={handleChange} required={activeSection === 'personal'} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" placeholder="john.doe@university.edu" />
                                    </div>
                                    <div className="space-y-1 md:col-span-2">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Secure Password</label>
                                        <input type="password" name="password" minLength="6" value={formData.password} onChange={handleChange} required={activeSection === 'personal'} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" placeholder="••••••••" />
                                    </div>
                                    <div className="md:col-span-2 flex justify-end mt-4">
                                        <button type="button" onClick={() => setActiveSection('academic')} className="px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-gray-900 text-sm font-bold rounded-xl transition-colors inline-flex items-center gap-2">
                                            Next Step 
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                        </button>
                                    </div>
                                </div>

                                <div className={`grid grid-cols-1 gap-5 transition-transform duration-500 ease-in-out ${activeSection === 'academic' ? 'translate-x-0 relative' : 'translate-x-[110%] absolute top-0 w-full opacity-0 pointer-events-none'}`}>
                                    <div className="space-y-1">
                                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">University / Institution Name</label>
                                        <input type="text" name="university_name" value={formData.university_name} onChange={handleChange} required={activeSection === 'academic'} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" placeholder="E.g., Stanford University" />
                                    </div>
                                    <div className="grid grid-cols-2 gap-5">
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Gender</label>
                                            <div className="relative">
                                                <select name="gender" value={formData.gender} onChange={handleChange} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all appearance-none cursor-pointer">
                                                    <option value="Male">Male</option>
                                                    <option value="Female">Female</option>
                                                    <option value="Other">Other</option>
                                                </select>
                                                <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-500">
                                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Year Joined</label>
                                            <input type="number" name="year_joined" value={formData.year_joined} onChange={handleChange} required={activeSection === 'academic'} className="w-full px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 focus:border-indigo-500 transition-all" />
                                        </div>
                                    </div>
                                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-100">
                                        <button type="button" onClick={() => setActiveSection('personal')} className="text-gray-500 hover:text-gray-900 text-sm font-semibold transition-colors flex items-center gap-2">
                                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                                            Back
                                        </button>
                                        <button type="submit" disabled={loading} className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all disabled:opacity-75 disabled:transform-none flex items-center gap-2">
                                            {loading ? <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg> : 'Complete Profile'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                    
                    <div className="mt-10 text-center text-sm text-gray-500">
                        Already have access?{' '}
                        <Link to="/login" className="font-bold text-gray-900 hover:text-indigo-600 underline decoration-gray-300 hover:decoration-indigo-600 underline-offset-4 transition-all">
                            Sign in securely
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
