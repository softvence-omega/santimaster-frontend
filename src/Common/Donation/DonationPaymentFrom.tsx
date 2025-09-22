import { useState } from "react";
import { ChevronDown, Lock } from "lucide-react";
import SectionHeader from "../../utils/SectionHeading";

const DonationPaymentForm = () => {
  const [frequency, setFrequency] = useState<"one-time" | "monthly" | "annual">(
    "annual"
  );
  const [selectedAmount, setSelectedAmount] = useState<number | "other" | null>(
    null
  );
  const [customAmount, setCustomAmount] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    country: "",
    tribute: "",
    anonymous: false,
    agreedToTerms: false,
  });

  const predefinedAmounts = [25, 75, 150, 500];

  const handleAmountClick = (amount: number | "other") => {
    setSelectedAmount(amount);
    if (amount !== "other") setCustomAmount("");
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const getButtonAmount = () => {
    if (selectedAmount === "other" && customAmount) return `$${customAmount}`;
    if (typeof selectedAmount === "number") return `$${selectedAmount}`;
    return "$0";
  };

  const getFrequencyText = () => {
    switch (frequency) {
      case "monthly":
        return "/month";
      case "annual":
        return "/year";
      default:
        return "";
    }
  };

  const isDonateEnabled =
    formData.agreedToTerms &&
    ((selectedAmount === "other" && customAmount) ||
      typeof selectedAmount === "number");

  return (
    <div className="max-w-2xl mx-auto p-6 py-40">
      <div className="text-center mb-8">
        <SectionHeader
          title="Make Your Donation"
          subtitle="Choose your contribution amount and frequency"
        />
      </div>

      <div className="max-w-2xl mx-auto bg-[#E8F0EE] rounded-lg p-6">
        {/* Frequency Selection */}
        <div className="flex gap-1 mb-8">
          {[
            { key: "one-time", label: "One-time" },
            { key: "monthly", label: "Monthly" },
            { key: "annual", label: "Annual" },
          ].map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFrequency(key as any)}
              className={`flex-1 py-3 px-4 rounded-md font-medium transition-all ${
                frequency === key
                  ? "bg-[#1D6953] text-white shadow-sm"
                  : "text-gray-700 hover:text-gray-900"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Amount Selection */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">
            Select Amount
          </h2>
          <div className="grid grid-cols-5 gap-3 mb-4">
            {predefinedAmounts.map((amount) => (
              <button
                key={amount}
                onClick={() => handleAmountClick(amount)}
                className={`py-3 px-4 rounded-lg border font-medium transition-all ${
                  selectedAmount === amount
                    ? "border-green-600 bg-green-50 text-green-600"
                    : "border-gray-300 text-gray-700 hover:border-gray-400"
                }`}
              >
                ${amount}
              </button>
            ))}
            <button
              onClick={() => handleAmountClick("other")}
              className={`py-3 px-4 rounded-lg border font-medium transition-all ${
                selectedAmount === "other"
                  ? "border-green-600 bg-green-50 text-green-600"
                  : "border-gray-300 text-gray-700 hover:border-gray-400"
              }`}
            >
              Other
            </button>
          </div>

          {selectedAmount === "other" && (
            <div className="relative">
              <span className="absolute left-3 top-3 text-gray-500">$</span>
              <input
                type="number"
                placeholder="Enter custom amount"
                value={customAmount}
                onChange={(e) => setCustomAmount(e.target.value)}
                className="w-full pl-8 pr-16 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
              <span className="absolute right-3 top-3 text-gray-500">USD</span>
            </div>
          )}
        </div>

        {/* Donor Information */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Donor Information
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Country
              </label>
              <div className="relative">
                <select
                  value={formData.country}
                  onChange={(e) => handleInputChange("country", e.target.value)}
                  className="w-full py-3 px-4 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  <option value="">Select Country</option>
                  <option value="us">United States</option>
                  <option value="ca">Canada</option>
                  <option value="uk">United Kingdom</option>
                  <option value="de">Germany</option>
                  <option value="fr">France</option>
                  <option value="au">Australia</option>
                </select>
                <ChevronDown className="absolute right-3 top-3 h-5 w-5 text-gray-400 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tribute (Optional)
              </label>
              <input
                type="text"
                placeholder="In honor/memory of..."
                value={formData.tribute}
                onChange={(e) => handleInputChange("tribute", e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="anonymous"
              checked={formData.anonymous}
              onChange={(e) => handleInputChange("anonymous", e.target.checked)}
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="anonymous" className="ml-2 text-sm text-gray-700">
              Make this donation anonymous
            </label>
          </div>

          <div className="flex items-start mb-6">
            <input
              type="checkbox"
              id="terms"
              checked={formData.agreedToTerms}
              onChange={(e) =>
                handleInputChange("agreedToTerms", e.target.checked)
              }
              className="h-4 w-4 mt-1 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="terms" className="ml-2 text-sm text-gray-700">
              I agree to the Privacy Policy and Terms of Service. I understand
              that my donation is processed securely and I will receive a
              receipt via email.
            </label>
          </div>
        </div>

        {/* Donate Button */}
        <button
          disabled={!isDonateEnabled}
          className="w-full bg-[#1D6953] hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-4 px-6 rounded-lg transition-colors text-lg"
        >
          Donate {getButtonAmount()}
          {getFrequencyText()}
        </button>

        {/* Security Notice */}
        <div className="flex items-center justify-center mt-4 text-sm text-gray-600">
          <Lock className="h-4 w-4 mr-2" />
          Your payment information is encrypted and secure
        </div>
      </div>
    </div>
  );
};

export default DonationPaymentForm;
