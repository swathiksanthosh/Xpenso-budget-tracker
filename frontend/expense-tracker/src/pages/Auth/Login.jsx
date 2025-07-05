import React, { useContext, useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { useNavigate, Link } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { UserContext } from '../../context/UserContext';
import { validateEmail } from '../../utils/helper';
import axiosInstance from '../../utils/axiosInstance';
import { API_PATHS } from '../../utils/apiPaths';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    if (!password) {
      setError('Please enter the password');
      return;
    }

    setError('');

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, ...user } = response.data;

      if (token) {
        localStorage.setItem('token', token);
        updateUser(user);
        navigate('/dashboard');
      }
    } catch (error) {
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Something went wrong. Please try again.');
      }
    }
  };

  // ✅ Google Login handler
  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;

      //Send token to backend
      const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_AUTH, {
        token: credential, //backend expects token
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      updateUser(user);
      navigate('/dashboard');
    } catch (error) {
      console.error('Google login failed:', error);
      setError('Google Sign-In failed. Try again.');
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-full flex flex-col justify-center">
        <h3 className="text-4xl font-bold text-gray-900 mb-3">Welcome Back.</h3>
        <p className="text-[14px] text-gray-600 mb-6">
          Please fill your detail to log in to your account
        </p>

        <form className="w-full md:w-[400px] space-y-6 mt-10" onSubmit={handleLogin}>
          <Input
            id="email"
            name="email"
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email"
            placeholder="abcdxxxxx@example.com"
            type="email"
            autoComplete="email"
            showClear={true}
          />

          <Input
            id="password"
            name="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="••••••••"
            type="password"
            autoComplete="current-password"
          />

          <div className="flex justify-between items-center text-sm mt-1">
            <label htmlFor="remember" className="flex items-center gap-2 text-gray-700">
              <input type="checkbox" id="remember" name="remember" />
              Remember me
            </label>
            <a href="#" className="text-violet-600 font-medium mt-1">Forgot Password?</a>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="w-full md:w-[400px] px-4 py-2.5 bg-primary text-white font-semibold rounded-lg mb-4"
          >
            Log in
          </button>

          {/* ✅ Google Login Button */}
          <GoogleLogin
            width="400"
            onSuccess={handleGoogleLogin}
            onError={() => setError('Google Sign-In failed')}
            ux_mode="popup"
            type="standard"
            theme="outline"
            size="large"
            
          />

          <p className="text-sm text-gray-700 text-center mt-4">
            Don’t have an account?{' '}
            <Link className="text-violet-600 font-semibold underline" to="/signup">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;








