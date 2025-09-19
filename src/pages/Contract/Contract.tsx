import React, { useState, useRef } from "react";
import { Upload, Send } from "lucide-react";
import SectionHeader from "../../utils/SectionHeading";

interface FormData {
  fullName: string;
  emailAddress: string;
  subject: string;
  message: string;
}

interface ContactProps {}

const Contact: React.FC<ContactProps> = () => {
  const [formData, setFormData] = useState<FormData>({
    fullName: "Ayesha Rahman",
    emailAddress: "you@institution.edu",
    subject: "",
    message: "",
  });

  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const [agreeToPrivacy, setAgreeToPrivacy] = useState<boolean>(false);
  const [isNotRobot, setIsNotRobot] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const subjectOptions = [
    "Choose a subject...",
    "General Inquiry",
    "Partnership Opportunity",
    "Technical Support",
    "Press Inquiry",
    "Other",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setAttachedFiles((prev) => [...prev, ...Array.from(files)]);
    }
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    console.log("Form submission:", {
      ...formData,
      attachedFiles: attachedFiles.map((f) => f.name),
      agreeToPrivacy,
      isNotRobot,
    });
  };

  const getTotalFileSize = () => {
    const totalBytes = attachedFiles.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(2);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-36 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <SectionHeader
            title="Get in touch with Open Gene"
            subtitle="  For general inquiries, press, partnerships or support — expect a
            reply within 3 business days."
          ></SectionHeader>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          {/* Form Header */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-[#1C1C1E] mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-gray-600">
              Fill out the form below and we'll get back to you within 3
              business days.
            </p>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label
                htmlFor="fullName"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Email Address */}
            <div>
              <label
                htmlFor="emailAddress"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email Address
              </label>
              <input
                id="emailAddress"
                type="email"
                value={formData.emailAddress}
                onChange={(e) =>
                  handleInputChange("emailAddress", e.target.value)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Subject */}
            <div>
              <label
                htmlFor="subject"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Subject
              </label>
              <div className="relative">
                <select
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange("subject", e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
                >
                  {subjectOptions.map((option, index) => (
                    <option
                      key={index}
                      value={index === 0 ? "" : option}
                      disabled={index === 0}
                    >
                      {option}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-4 h-4 fill-gray-400" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
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
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Write your message here... (include links or ticket numbers if relevant)"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
              />
              <p className="text-xs text-gray-500 mt-1">0/3K maximum</p>
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>

              {/* Upload Area */}
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-gray-400 transition-colors">
                <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-600 mb-2">
                  Click to upload files or{" "}
                  <button
                    type="button"
                    onClick={handleBrowseFiles}
                    className="text-blue-600 hover:text-blue-500 underline"
                  >
                    browse files
                  </button>
                </p>
                <p className="text-xs text-gray-500">
                  PNG, PDF, DOCX, Max 10 MB
                </p>
              </div>

              <input
                ref={fileInputRef}
                type="file"
                multiple
                onChange={handleFileUpload}
                className="hidden"
                accept=".png,.pdf,.docx,.jpg,.jpeg"
              />

              {/* File List */}
              {attachedFiles.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-2">
                    Attached files ({getTotalFileSize()} MB):
                  </p>
                  <div className="space-y-1">
                    {attachedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                      >
                        <span>{file.name}</span>
                        <button
                          onClick={() => removeFile(index)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <p className="text-xs text-gray-500 mt-2">
                Required for first-time visit; optional for others
              </p>
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              {/* Privacy Policy */}
              <div className="flex items-start">
                <input
                  id="privacy"
                  type="checkbox"
                  checked={agreeToPrivacy}
                  onChange={(e) => setAgreeToPrivacy(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5"
                />
                <label
                  htmlFor="privacy"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I agree to the Privacy Policy and consent to the site storing
                  my message for a response.
                </label>
              </div>

              {/* Robot Check */}
              <div className="flex items-center justify-center">
                <input
                  id="robot"
                  type="checkbox"
                  checked={isNotRobot}
                  onChange={(e) => setIsNotRobot(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label
                  htmlFor="robot"
                  className="ml-2 block text-sm text-gray-700"
                >
                  I'm not a robot
                </label>
              </div>
            </div>

            {/* Submit Button */}
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-[#17AA80] hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition duration-150 ease-in-out"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
