/* eslint-disable @typescript-eslint/no-explicit-any */
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

import { useLoginMutation, userAPI } from "../../redux/features/auth/auth.api";
import { setAuth } from "../../redux/features/auth/auth.slice";
import { useAppDispatch } from "../../redux/hook";
import SectionHeader from "../../utils/SectionHeading";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isNotRobot, setIsNotRobot] = useState(false);

  const [login,{isLoading:isSubmitting}] = useLoginMutation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    // Validate inputs
    if (!email || !password) {
      toast.error("Please fill in all fields");
      return;
    }
    if (!isNotRobot) {
      toast.error("Please confirm you are not a robot");
      return;
    }
    try {
      const loginResponse = await login({ email, password }).unwrap();

      if (!loginResponse?.success || !loginResponse?.data?.accessToken) {
        toast.error(loginResponse?.message || "Login failed!");
        return;
      }

      const token = loginResponse.data.accessToken;

      dispatch(setAuth({ token, user: null }));

      const userResponse = await dispatch(
        userAPI.endpoints.getMe.initiate(undefined)
      ).unwrap();

      if (!userResponse?.success || !userResponse?.data) {
        toast.error(userResponse?.message || "Failed to fetch user profile!");
        return;
      }

      dispatch(setAuth({ token, user: userResponse.data }));

      toast.success("Logged in successfully!");
      navigate("/");
    } catch (err: any) {
      console.error("Login error:", err);
      const errorMessage =
        err?.data?.message || "An unexpected error occurred during login.";
      toast.error(errorMessage);
    } 
  };

  return (
    <div className="max-w-6xl mx-auto bg-[#F5F5F7] flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">

            <SectionHeader
              title="Welcome back"
              subtitle="Access your account to submit and manage protocols"
            ></SectionHeader>
          </div>

          {/* Form */}
          <div className="space-y-6">
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value.trim())}
                className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between">
              <div className="flex items-center">
                <input
                  id="not-robot"
                  type="checkbox"
                  checked={isNotRobot}
                  onChange={(e) => setIsNotRobot(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="not-robot"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I'm not a robot
                </label>
              </div>
              <div>
                <Link
                  to="/forgot-password"
                  className="text-[#17AA80] text-sm cursor-pointer hover:text-#17AA80"
                >
                  forgot password
                </Link>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition duration-150 ease-in-out ${isSubmitting
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-[#17AA80] hover:bg-green-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500 cursor-pointer"
                }`}
            >
              {isSubmitting ? (
                <span className="flex items-center">
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8z"
                    />
                  </svg>
                  Logging in...
                </span>
              ) : (
                "Log in"
              )}
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
