import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useToast } from '../components/Toast';
import { User, Mail, Phone, Lock, ArrowRight, Eye, EyeOff } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const { addToast } = useToast();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.phone || !formData.password) {
      addToast('Please fill in all fields', 'error');
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      addToast('Passwords do not match', 'error');
      return;
    }
    if (formData.password.length < 6) {
      addToast('Password must be at least 6 characters', 'error');
      return;
    }

    setLoading(true);
    try {
      await register({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        password: formData.password
      });
      addToast('Account created! Please sign in.', 'success');
      navigate('/login');
    } catch (error) {
      addToast(error.response?.data?.message || 'Registration failed. Please try again.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-gray-50 border border-gray-200 rounded-lg pl-12 pr-4 py-3 text-[#0f172a] text-sm focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/20 transition-colors placeholder-gray-400";

  return (
    <div className="bg-[#f8f9fe] min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full">

        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-black text-[#0f172a] tracking-tight mb-2">CREATE ACCOUNT</h1>
          <p className="text-gray-500 text-sm">Join us and start shopping</p>
        </div>

        <div className="bg-white border border-gray-100 shadow-xl shadow-[#00d4ff]/5 rounded-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name */}
            <div>
              <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-1.5">Full Name</label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" name="name" value={formData.name} onChange={handleChange} required placeholder="Muhammad Ali" className={inputClass} />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} required placeholder="you@example.com" className={inputClass} />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-1.5">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required placeholder="03XXXXXXXXX" className={inputClass} />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showPassword ? 'text' : 'password'} name="password" value={formData.password} onChange={handleChange} required placeholder="Min. 6 characters" className={inputClass + ' pr-12'} />
                <button type="button" onClick={() => setShowPassword(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00d4ff] transition-colors">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-gray-600 text-xs font-bold uppercase tracking-wider mb-1.5">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type={showConfirm ? 'text' : 'password'} name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required placeholder="Repeat your password" className={inputClass + ' pr-12'} />
                <button type="button" onClick={() => setShowConfirm(p => !p)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-[#00d4ff] transition-colors">
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-[#00d4ff] to-[#3b82f6] hover:from-[#00b8e6] hover:to-[#2563eb] text-white font-bold py-4 rounded-xl transition-all shadow-[0_8px_20px_rgba(0,212,255,0.25)] flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed mt-2"
            >
              {loading ? 'Creating account...' : (
                <><span>CREATE ACCOUNT</span><ArrowRight className="w-4 h-4" /></>
              )}
            </button>

          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-200" />
            </div>
            <div className="relative flex justify-center">
              <span className="px-4 bg-white text-gray-400 text-xs font-medium">OR</span>
            </div>
          </div>

          <p className="text-center text-gray-600 text-sm">
            Already have an account?{' '}
            <Link to="/login" className="text-[#00d4ff] font-bold hover:underline">Sign in</Link>
          </p>
        </div>

        <div className="text-center mt-6">
          <Link to="/" className="text-gray-500 text-xs hover:text-[#00d4ff] transition-colors">← Back to Home</Link>
        </div>

      </div>
    </div>
  );
};

export default Register;
