import React, { useState, useRef } from "react";
import { Upload, Send } from "lucide-react";
import SectionHeader from "../../utils/SectionHeading";
import { useCreateMessageMutation } from "../../redux/features/contract/contract.api";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [createMessage] = useCreateMessageMutation();
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
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
    "Press & Media",
    "Partnership",
    "Support",
    "Sponsorship",
    "Security Report",
    "Other",
  ];

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) setAttachedFiles((prev) => [...prev, ...Array.from(files)]);
  };

  const handleBrowseFiles = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const getTotalFileSize = () => {
    const totalBytes = attachedFiles.reduce((sum, file) => sum + file.size, 0);
    return (totalBytes / (1024 * 1024)).toFixed(2);
  };

  const handleSubmit = async () => {
    if (!agreeToPrivacy || !isNotRobot) {
      toast.error(
        "Please agree to the privacy policy and confirm you are not a robot."
      );
      return;
    }

    const payload = {
      fullName: formData.fullName,
      email: formData.email,
      subject: formData.subject,
      message: formData.message,
      isTermAgreed: agreeToPrivacy,
    };

    try {
      const response = await createMessage(payload).unwrap();
      toast.success(response.message || "Message sent successfully!");

      // Reset form
      setFormData({ fullName: "", email: "", subject: "", message: "" });
      setAttachedFiles([]);
      setAgreeToPrivacy(false);
      setIsNotRobot(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Failed to send message.");
    }
  };

  return (
    <div className="min-h-screen py-40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <SectionHeader
            title="Get in touch with Open Gene"
            subtitle="For general inquiries, press, partnerships or support — expect a reply within 3 business days."
          />
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
          <div className="bg-gray-100 rounded-lg p-4 mb-6">
            <h2 className="text-lg font-medium text-[#1C1C1E] mb-2">
              Send us a message
            </h2>
            <p className="text-sm text-gray-600">
              Fill out the form below and we'll get back to you within 3
              business days.
            </p>
          </div>

          <div className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                value={formData.fullName}
                onChange={(e) => handleInputChange("fullName", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange("email", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>

            {/* Subject */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Subject (select subject) ⬇
              </label>
              <select
                value={formData.subject}
                onChange={(e) => handleInputChange("subject", e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent appearance-none bg-white"
              >
                {subjectOptions.map((option, idx) => (
                  <option
                    key={idx}
                    value={idx === 0 ? "" : option}
                    disabled={idx === 0}
                  >
                    {option}
                  </option>
                ))}
              </select>
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Message
              </label>
              <textarea
                rows={6}
                value={formData.message}
                onChange={(e) => handleInputChange("message", e.target.value)}
                placeholder="Write your message here..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent resize-vertical"
              />
            </div>

            {/* Attachments */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Attachments (Optional)
              </label>
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
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  onChange={handleFileUpload}
                  className="hidden"
                  accept=".png,.pdf,.docx,.jpg,.jpeg"
                />
              </div>

              {attachedFiles.length > 0 && (
                <div className="mt-3">
                  <p className="text-xs text-gray-600 mb-2">
                    Attached files ({getTotalFileSize()} MB):
                  </p>
                  <div className="space-y-1">
                    {attachedFiles.map((file, idx) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between text-xs text-gray-600 bg-gray-50 px-2 py-1 rounded"
                      >
                        <span>{file.name}</span>
                        <button
                          onClick={() => removeFile(idx)}
                          className="text-red-500 hover:text-red-700 ml-2"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Checkboxes */}
            <div className="space-y-3">
              <div className="flex items-start">
                <input
                  type="checkbox"
                  checked={agreeToPrivacy}
                  onChange={(e) => setAgreeToPrivacy(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded mt-0.5"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I agree to the Privacy Policy and consent to the site storing
                  my message for a response.
                </label>
              </div>

              <div className="flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={isNotRobot}
                  onChange={(e) => setIsNotRobot(e.target.checked)}
                  className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-700">
                  I'm not a robot
                </label>
              </div>
            </div>

            {/* Submit */}
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
