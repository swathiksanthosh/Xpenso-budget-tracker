import React, { useContext, useState } from 'react';
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/Inputs/Input";
import { API_PATHS } from "../../utils/apiPaths";
import { validateEmail } from "../../utils/helper";
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { UserContext } from '../../context/UserContext';
import axiosInstance from '../../utils/axiosInstance';
import uploadImage from '../../utils/uploadImage';
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from 'jwt-decode';

const SignUp = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSignUp = async (e) => {
    e.preventDefault();
    let profileImageUrl = "";

    if (!fullName.trim()) return setError("Please enter your name");
    if (!validateEmail(email)) return setError("Please enter a valid email address.");
    if (!password) return setError("Please enter the password");

    setError("");

    try {
      if (profilePic) {
        const imgUploadRes = await uploadImage(profilePic);
        profileImageUrl = imgUploadRes?.imageUrl || "";
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
        fullName,
        email,
        password,
        profileImageUrl,
      });

      const { token, user } = response?.data || {};

      if (token && user) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      } else {
        setError("Registration failed. Invalid response.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setError(error?.response?.data?.message || "Something went wrong. Please try again.");
    }
  };

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      if (!credential) {
        setError("Google login failed. Missing credential.");
        return;
      }

      const response = await axiosInstance.post(API_PATHS.AUTH.GOOGLE_AUTH, {
        token: credential,
      });

      console.log("Google Auth Response:", response);

      const { token, user } = response?.data || {};

      if (token && user) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
      } else {
        setError("Google login failed. Invalid response.");
      }

    } catch (err) {
      console.error("Google Login Failed", err);
      setError("Google Sign-In failed. Please try again.");
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-full h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        <h3 className="text-3xl font-bold text-gray-900 mb-1">Sign Up.</h3>
        <p className="text-[14px] text-slate-700 mt-[5px] mb-6">
          Please fill your details to access your account.
        </p>

        <form className="w-full md:w-[400px] space-y-4 mt-10" onSubmit={handleSignUp}>
          {/* Full Name + Profile Image */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center">
            <div className="md:col-span-2">
              <Input
                value={fullName}
                onChange={({ target }) => setFullName(target.value)}
                label="Full Name"
                placeholder="John"
                type="text"
                showClear={true}
                customWidth="w-full md:w-[270px]"
              />
            </div>
            <div className="-mr-15">
              <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
            </div>
          </div>

          <Input
            value={email}
            onChange={({ target }) => setEmail(target.value)}
            label="Email Address"
            placeholder="john@example.com"
            type="text"
            showClear={true}
            customWidth="w-full md:w-[400px]"
          />

          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Min 8 Characters"
            type="password"
            customWidth="w-full md:w-[400px]"
          />

          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

          <button
            type="submit"
            className="w-full md:w-[400px] px-4 py-2.5 bg-primary text-white font-semibold rounded-lg mb-4 mt-5"
          >
            SIGN UP
          </button>
        </form>

        <div className="w-full md:w-[450px] mb-3">
          <GoogleLogin
            width="450"
            onSuccess={async (credentialResponse) => {
              console.log("Raw credential token:", credentialResponse.credential); 
              console.log("Google credential:", credentialResponse); // ✅ View this in browser console
              await handleGoogleLogin(credentialResponse);           // 🟢 Continue your original flow
            }}
            onError={() => {
              console.log("Google Sign-In failed");
              setError("Google Sign-In failed. Please try again.");
            }}
          />
        </div>

        <p className="text-[14px] text-center text-slate-800 mt-3">
          Already have an account?{" "}
          <Link className="font-medium text-primary underline" to="/login">
            Login
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};

export default SignUp;





