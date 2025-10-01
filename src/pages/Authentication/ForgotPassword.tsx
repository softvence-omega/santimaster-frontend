import { useState } from "react";
import { useForgotPasswordMutation } from "../../redux/features/auth/auth.api";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [forgotPassword, { isLoading, isSuccess, isError }] =
    useForgotPasswordMutation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      await forgotPassword({ email }).unwrap();
    } catch (err) {
      console.error("Forgot password error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Forgot Password</h2>
          <p className="mt-2 text-sm text-gray-500">
            Enter your email address and we’ll send you a reset link.
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-green-600 text-white font-medium shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition disabled:opacity-50"
            >
              {isLoading ? "Sending..." : "Send Reset Link"}
            </button>
          </div>
        </form>

        {/* Status Messages */}
        {isSuccess && (
          <p className="text-green-600 text-sm text-center">
            ✅ Reset link sent to your email!
          </p>
        )}
        {isError && (
          <p className="text-red-600 text-sm text-center">
            ❌ Failed to send reset link. Try again.
          </p>
        )}
      </div>
    </div>
  );
};

export default ForgotPassword;
