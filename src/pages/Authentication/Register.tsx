import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../../redux/features/auth/auth.api";
import toast from "react-hot-toast";

export default function RegisterForm() {
  const [registerUser, { isLoading }] = useRegisterMutation();
const route=useNavigate()
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    affiliation: "",
    orcid: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [isNotRobot, setIsNotRobot] = useState(false);

  const handleInputChange = (field: keyof typeof formData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!agreeToTerms) {
      toast("Please agree to the Terms and Privacy Policy.");
      return;
    }

    if (!isNotRobot) {
      toast("Please confirm you are not a robot.");
      return;
    }

    try {
      const response = await registerUser(formData).unwrap();
      console.log("Registration successful:", response);

      // You can reset form or navigate after success
      setFormData({
        fullName: "",
        email: "",
        password: "",
        affiliation: "",
        orcid: "",
      });
      setAgreeToTerms(false);
      setIsNotRobot(false);

      toast(response.message || "Account registration successful!");
      route("/login");
    } catch (error: any) {
      console.error("Registration error:", error);
      toast(error?.data?.message || "Registration failed!");
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex items-center justify-center py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="bg-white rounded-lg shadow-md p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-3">
              Create your Open Gene account
            </h2>
            <p className="text-gray-600 text-sm">
              Join the community. You can request contributor
            </p>
            <p className="text-gray-600 text-sm">or reviewer later</p>
          </div>

          {/* Form */}
          <div className="space-y-6">
            {/* Full Name Field */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-2">
                Full name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email address
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => handleInputChange("password", e.target.value)}
                  className="w-full px-3 py-3 pr-10 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Create a password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">Use at least 8 characters with a number</p>
            </div>

            {/* Affiliation Field */}
            <div>
              <label htmlFor="affiliation" className="block text-sm font-medium text-gray-700 mb-2">
                Affiliation / Organization
              </label>
              <input
                id="affiliation"
                type="text"
                value={formData.affiliation}
                onChange={(e) => handleInputChange("affiliation", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="University, Company, or Institution"
              />
            </div>

            {/* ORCID Field */}
            <div>
              <label htmlFor="orcid" className="block text-sm font-medium text-gray-700 mb-2">
                ORCID (Optional)
              </label>
              <input
                id="orcid"
                type="text"
                value={formData.orcid}
                onChange={(e) => handleInputChange("orcid", e.target.value)}
                className="w-full px-3 py-3 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="0000-0000-0000-0000"
              />
            </div>

            {/* Terms Checkbox */}
            <div className="flex items-start">
              <input
                id="terms"
                type="checkbox"
                checked={agreeToTerms}
                onChange={(e) => setAgreeToTerms(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5"
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
                I agree to the{" "}
                <a href="#" className="text-green-600 hover:text-green-500">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="text-green-600 hover:text-green-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Robot Checkbox */}
            <div className="flex items-center">
              <input
                id="not-robot"
                type="checkbox"
                checked={isNotRobot}
                onChange={(e) => setIsNotRobot(e.target.checked)}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="not-robot" className="ml-2 block text-sm text-gray-700">
                I'm not a robot
              </label>
            </div>

            {/* Submit Button */}
            <button
              onClick={handleSubmit}
              disabled={isLoading}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#17AA80] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
            >
              {isLoading ? "Creating..." : "Create account"}
            </button>
          </div>

          {/* Footer */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link to={"/login"} className="font-medium text-green-600 hover:text-green-500">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
