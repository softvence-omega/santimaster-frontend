// src/components/ProfileSettings.tsx
import { CameraIcon } from "lucide-react";
import React, { useState, type ChangeEvent } from "react";
import { useUpdateAccountMutation } from "../../../redux/features/Account/account.api";
import type { TAccount } from "../../../types/account.types";
import toast from "react-hot-toast";

const ProfileSettings: React.FC = () => {
  const [
    updateAccount,
    { isLoading: isUpdating},
  ] = useUpdateAccountMutation();

  const [isEditing, setIsEditing] = useState(false);

  // Local form state including profileImage
  const [formState, setFormState] = useState<Partial<TAccount>>({
    fullName: "",
    affiliation: "",
    orcid: "",
    bio: "",
    profileImage: "",
  });

  // Handle text changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
  };

  // Handle profile image URL change
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setFormState((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  // Save (PATCH update)
  const handleSave = async () => {
    try {
      await updateAccount({ data: formState }).unwrap();
      setIsEditing(false);
    } catch (err) {
      console.error("Update failed", err);
      toast("Update failed")
    }
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
          {/* Profile Info */}
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
                  src={formState.profileImage || "/api/placeholder/80/80"}
                  alt="Profile picture"
                />
                {isEditing && (
                  <label className="absolute -bottom-1 -right-1 bg-blue-500 rounded-full p-1 cursor-pointer">
                    <CameraIcon className="w-4 h-4 text-white" />
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
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
                  name="fullName"
                  value={formState.fullName || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg transition ${
                    isEditing
                      ? "bg-white focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Affiliation
                </label>
                <input
                  type="text"
                  name="affiliation"
                  value={formState.affiliation || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg transition ${
                    isEditing
                      ? "bg-white focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ORCID ID
                </label>
                <input
                  type="text"
                  name="orcid"
                  value={formState.orcid || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg transition ${
                    isEditing
                      ? "bg-white focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={3}
                  value={formState.bio || ""}
                  onChange={handleChange}
                  disabled={!isEditing}
                  className={`w-full px-3 py-2 border border-gray-300 rounded-lg resize-none transition ${
                    isEditing
                      ? "bg-white focus:ring-2 focus:ring-blue-500"
                      : "bg-gray-50 cursor-not-allowed"
                  }`}
                />
              </div>
            </div>

            {isEditing && (
              <div className="mt-6 pt-4 border-t border-gray-200">
                <button
                  onClick={handleSave}
                  disabled={isUpdating}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
              </div>
            )}
          </div>
        </div>

       
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-6">
            Notification Preferences
          </h2>
          {[
            {
              label: "Email Notifications",
              desc: "Receive updates via email",
            },
            {
              label: "Review Notifications",
              desc: "New reviews and comments",
            },
            {
              label: "Site News",
              desc: "Updates and announcements",
            },
          ].map(({ label, desc }) => (
            <div
              key={label}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg mb-3"
            >
              <div>
                <h4 className="font-medium text-gray-900">{label}</h4>
                <p className="text-sm text-gray-500">{desc}</p>
              </div>
              <button className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-500">
                <span className="inline-block h-4 w-4 transform rounded-full bg-white shadow translate-x-6" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
