import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../api';

export default function Login() {
    const [credentials, setCredentials] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [focusedField, setFocusedField] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(''); setLoading(true);
        try {
            const response = await api.post('/auth/login', credentials);
            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                navigate('/dashboard');
            }
        } catch (err) {
            setError(err.response?.data?.messages?.error || 'Login failed. Please check credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex w-full max-w-5xl mx-auto glass-panel rounded-3xl overflow-hidden animate-slide-up">
            {/* Left Decorative Banner */}
            <div className="hidden lg:flex w-1/2 p-12 bg-gradient-to-br from-indigo-600 via-purple-600 to-indigo-800 text-white flex-col justify-between relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10 mix-blend-overlay"></div>
                <div className="absolute top-0 right-0 -mr-20 -mt-20 w-64 h-64 rounded-full border-[30px] border-white/10 opacity-50"></div>
                <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-white/5 opacity-50 blur-xl"></div>
                <div className="relative z-10">
                    <h1 className="text-4xl font-extrabold mb-4 leading-tight">Welcome to the Future of Institution Management.</h1>
                    <p className="text-indigo-100 text-lg opacity-90">Sign in to access your administrative dashboard and academic records securely.</p>
                </div>
                <div className="relative z-10 flex items-center gap-3">
                    <div className="flex -space-x-3">
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-indigo-300"></div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-purple-300"></div>
                        <div className="w-10 h-10 rounded-full border-2 border-white bg-pink-300"></div>
                    </div>
                    <span className="text-sm font-medium">Join 2,000+ educators today.</span>
                </div>
            </div>

            {/* Right Login Form */}
            <div className="w-full lg:w-1/2 p-8 md:p-12 xl:p-16 flex flex-col justify-center bg-white/50">
                <div className="max-w-md w-full mx-auto">
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-3xl font-extrabold tracking-tight text-gray-900">Sign in</h2>
                        <p className="mt-2 text-sm text-gray-600">Enter your details to proceed to your workspace.</p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm font-medium flex items-center gap-3 animate-slide-up">
                            <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" /></svg>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-1 group relative">
                            <label className={`block text-xs font-bold transition-colors uppercase tracking-wider ${focusedField === 'email' ? 'text-indigo-600' : 'text-gray-500'}`}>Email Address</label>
                            <input 
                                type="email" name="email" required onChange={handleChange}
                                onFocus={() => setFocusedField('email')} onBlur={() => setFocusedField('')}
                                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-0 focus:outline-none focus:border-indigo-500 transition-all shadow-sm group-hover:border-gray-300"
                                placeholder="you@university.edu"
                            />
                        </div>

                        <div className="space-y-1 group relative">
                            <label className={`block text-xs font-bold transition-colors uppercase tracking-wider ${focusedField === 'password' ? 'text-indigo-600' : 'text-gray-500'}`}>Password</label>
                            <input 
                                type="password" name="password" required onChange={handleChange}
                                onFocus={() => setFocusedField('password')} onBlur={() => setFocusedField('')}
                                className="w-full px-4 py-3 bg-white/70 border border-gray-200 rounded-xl focus:ring-0 focus:outline-none focus:border-indigo-500 transition-all shadow-sm group-hover:border-gray-300"
                                placeholder="••••••••"
                            />
                        </div>

                        <button 
                            type="submit" disabled={loading}
                            className="w-full relative overflow-hidden bg-gray-900 hover:bg-gray-800 text-white font-semibold py-3.5 px-4 rounded-xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 disabled:active:scale-100 flex justify-center items-center gap-2 mt-4"
                        >
                            {loading ? (
                                <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium text-gray-600">
                        Don't have an account yet?{' '}
                        <Link to="/register" className="text-indigo-600 hover:text-indigo-500 hover:underline underline-offset-4 transition-all">
                            Register now
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
