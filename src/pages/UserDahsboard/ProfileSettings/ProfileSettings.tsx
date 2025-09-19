import { CameraIcon } from "lucide-react";
import React, { useState } from "react";

interface ProfileSettingsProps {
  fullName?: string;
  affiliation?: string;
  orcidId?: string;
  bio?: string;
  emailNotifications?: boolean;
  reviewNotifications?: boolean;
  siteNews?: boolean;
}

const ProfileSettings: React.FC<ProfileSettingsProps> = ({
  fullName = "Dr. Sarah Chen",
  affiliation = "Massachusetts Institute of Technology",
  orcidId = "0000-0002-1825-097",
  bio = "Molecular biologist specializing in CRISPR gene editing and synthetic biology applications.",
  emailNotifications = true,
  reviewNotifications = true,
  siteNews = true,
}) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleToggle = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    setter((prev) => !prev);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Profile & Settings
          </h1>
        </div>

        <div className="space-y-8">
          {/* Profile Information Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-start justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                Profile Information
              </h2>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="text-sm text-blue-600 hover:text-blue-700 font-medium"
              >
                {isEditing ? "Cancel" : "Edit"}
              </button>
            </div>

            {/* Profile Picture */}
            <div className="flex items-center space-x-4 mb-6">
              <div className="relative">
                <img
                  className="w-20 h-20 rounded-full object-cover border-2 border-gray-200"
                  src="/api/placeholder/80/80"
                  alt="Profile picture"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1">
                  <CameraIcon className="w-4 h-4 text-white" />
                </div>
                <div className="absolute inset-0 rounded-full bg-blue-500 bg-opacity-0 hover:bg-opacity-20 transition-all duration-200 flex items-center justify-center">
                  <CameraIcon className="w-4 h-4 text-white opacity-0 hover:opacity-100 transition-opacity duration-200" />
                </div>
              </div>
            </div>

            {/* Form Fields */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={() => {}}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isEditing ? "bg-white" : "bg-gray-50 cursor-not-allowed"
                  }`}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliation
                </label>
                <input
                  type="text"
                  value={affiliation}
                  onChange={() => {}}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isEditing ? "bg-white" : "bg-gray-50 cursor-not-allowed"
                  }`}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ORCID ID
                </label>
                <input
                  type="text"
                  value={orcidId}
                  onChange={() => {}}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 ${
                    isEditing ? "bg-white" : "bg-gray-50 cursor-not-allowed"
                  }`}
                  disabled={!isEditing}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={() => {}}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none ${
                    isEditing ? "bg-white" : "bg-gray-50 cursor-not-allowed"
                  }`}
                  disabled={!isEditing}
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium">
                  Save Changes
                </button>
              </div>
            )}
          </div>

          {/* Settings Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Settings
            </h2>

            {/* Security Section */}
            <div className="mb-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Security
              </h3>
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Change Password</h4>
                  <p className="text-sm text-gray-500">
                    Update your account password
                  </p>
                </div>
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm"></button>
              </div>
            </div>

            {/* Notification Preferences */}
            <div>
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Notification Preferences
              </h3>

              {/* Email Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Email Notifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    Receive updates via email
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(() => {})}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      emailNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Review Notifications */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3">
                <div>
                  <h4 className="font-medium text-gray-900">
                    Review Notifications
                  </h4>
                  <p className="text-sm text-gray-500">
                    New reviews and comments
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(() => {})}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      reviewNotifications ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>

              {/* Site News */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">Site News</h4>
                  <p className="text-sm text-gray-500">
                    updates and announcements
                  </p>
                </div>
                <button
                  onClick={() => handleToggle(() => {})}
                  className="relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none
                   focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                      siteNews ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
