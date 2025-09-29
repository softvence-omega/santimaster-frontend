import React, { useState } from "react";
import SectionHeader from "../../utils/SectionHeading";
import { useCreateSponsorshipMutation } from "../../redux/features/Sponsor/Sponsor.api";
import toast from "react-hot-toast";

interface SponsorshipFormData {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  sponsorshipInterest: string;
  sponsorshipLevel: string;
  message: string;
}

const SponsorshipForm: React.FC = () => {
  const [formData, setFormData] = useState<SponsorshipFormData>({
    companyName: "",
    contactName: "",
    email: "",
    phone: "",
    sponsorshipInterest: "",
    sponsorshipLevel: "",
    message: "",
  });

  const [createSponsorship, { isLoading, isSuccess, error }] =
    useCreateSponsorshipMutation();

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await createSponsorship({
        companyName: formData.companyName,
        contactName: formData.contactName,
        email: formData.email,
        sponsorshipLevel: formData.sponsorshipLevel,
        message: formData.message,
      }).unwrap();

      toast("Sponsor created successfully:");
      console.log( response)
      // Optionally reset form
      setFormData({
        companyName: "",
        contactName: "",
        email: "",
        phone: "",
        sponsorshipInterest: "",
        sponsorshipLevel: "",
        message: "",
      });
    } catch (err) {
      console.error("Failed to create sponsor:", err);
    }
  };

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="rounded-lg overflow-hidden">
          {/* Header Section */}
          <div className="px-6 py-8">
            <SectionHeader
              title="Interested in Sponsoring?"
              subtitle="Get in touch with our partnerships team to discuss custom sponsorship opportunities"
            />
          </div>

          {/* Form Section */}
          <div className="px-6 py-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Company Name */}
              <div>
                <label
                  htmlFor="companyName"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Company Name
                </label>
                <input
                  type="text"
                  id="companyName"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your company name"
                />
              </div>

              {/* Contact Information Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Contact Name */}
                <div>
                  <label
                    htmlFor="contactName"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Contact Name
                  </label>
                  <input
                    type="text"
                    id="contactName"
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>

                {/* Email Address */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="your.email@company.com"
                  />
                </div>
              </div>

              {/* Phone and Interest Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Phone Number */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="+1 (555) 000-0000"
                  />
                </div>

                {/* Sponsorship Interest */}
                <div>
                  <label
                    htmlFor="sponsorshipInterest"
                    className="block text-sm font-medium text-gray-700 mb-2"
                  >
                    Sponsorship Interest
                  </label>
                  <input
                    type="text"
                    id="sponsorshipInterest"
                    name="sponsorshipInterest"
                    value={formData.sponsorshipInterest}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    placeholder="e.g., Event sponsorship, Brand partnership"
                  />
                </div>
              </div>

              {/* Sponsorship Level */}
              <div>
                <label
                  htmlFor="sponsorshipLevel"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Select Sponsorship Level
                </label>
                <select
                  id="sponsorshipLevel"
                  name="sponsorshipLevel"
                  value={formData.sponsorshipLevel}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 appearance-none bg-white"
                >
                  <option value="">Choose a level</option>
                  <option value="platinum">Platinum Sponsor</option>
                  <option value="gold">Gold Sponsor</option>
                  <option value="silver">Silver Sponsor</option>
                  <option value="bronze">Bronze Sponsor</option>
                  <option value="community">Community Partner</option>
                  <option value="custom">Custom Package</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-vertical"
                  placeholder="Tell us about your company and sponsorship goals..."
                />
              </div>

              {/* Submit Button */}
              <div className="pt-4">
                <div className="flex justify-center">
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-fit bg-[#17AA80] cursor-pointer text-white font-semibold py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200 transform hover:-translate-y-0.5"
                  >
                    {isLoading ? "Submitting..." : "Submit Inquiry"}
                  </button>
                </div>
              </div>

              {isSuccess && (
                <p className="text-green-600 mt-2 text-center">
                  Sponsorship request submitted successfully!
                </p>
              )}
              {error && (
                <p className="text-red-600 mt-2 text-center">
                  Failed to submit sponsorship request.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Additional Info */}
        <div className="text-center mt-8">
          <p className="text-gray-600">
            Our partnerships team will get back to you within 24-48 hours.
          </p>
        </div>
      </div>
    </div>
  );
};

export default SponsorshipForm;
