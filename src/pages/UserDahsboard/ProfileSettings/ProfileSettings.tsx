import React, { useState, type ChangeEvent } from "react";
import { Camera, ChevronRight } from "lucide-react";

import { useUpdateProfileSettingMutation } from "../../../redux/features/auth/auth.api";
import toast from "react-hot-toast";

// Types
interface TAccount {
  fullName: string;
  affiliation: string;
  orcid: string;
  bio: string;
  profileImage: string;
}

const ProfileSettings: React.FC = () => {
  const [updateProfile, { isLoading: isUpdatingProfile }] =
    useUpdateProfileSettingMutation();

  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [formState, setFormState] = useState<TAccount>({
    fullName: "",
    affiliation: "",
    orcid: "",
    bio: "",
    profileImage: "",
  });

  // Track if text fields have changes
  const [hasTextChanges, setHasTextChanges] = useState(false);

  // Combine all updating and changes states
  const isUpdating = isUpdatingProfile || isUploadingImage;
  const hasChanges = hasTextChanges || selectedFile !== null;

  // Notification toggles state (static - not saved)
  const [notifications, setNotifications] = useState({
    email: true,
    review: true,
    siteNews: true,
  });

  // Handle text input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    setHasTextChanges(true);
  };

  // Handle profile image selection and local preview
  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      // Use the local URL for instant UI preview
      const imageUrl = URL.createObjectURL(file);
      setFormState((prev) => ({ ...prev, profileImage: imageUrl }));
    }
  };

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const uploadImageToServer = async (file: File): Promise<string> => {
    setIsUploadingImage(true);
    try {
      console.log(`Simulating file upload for: ${file.name}`);

      await new Promise((resolve) => setTimeout(resolve, 1500));

      return `${file.name.replace(/\s/g, "_")}`;
    } catch (err) {
      console.error("Image upload failed", err);
      toast("Failed to upload profile image. Please try again.");
      // Revert the profile image state on failure
      setFormState((prev) => ({
        ...prev,

        profileImage: prev.profileImage,
      }));
      throw err;
    } finally {
      setIsUploadingImage(false);
    }
  };

  // Save profile changes (API call)
  const handleSaveProfile = async () => {
    if (isUpdating || !hasChanges) return;

    try {
      let finalImagePath = formState.profileImage;

      if (selectedFile) {
        finalImagePath = await uploadImageToServer(selectedFile);
        setSelectedFile(null);
      }

      const profileUpdatePayload: TAccount = {
        fullName: formState.fullName,
        affiliation: formState.affiliation,
        orcid: formState.orcid,
        bio: formState.bio,

        profileImage: finalImagePath,
      };

      await updateProfile(profileUpdatePayload).unwrap();
      toast.success("Profile updated successfully!");
      console.log("Profile updated successfully:", profileUpdatePayload);

      setFormState((prev) => ({ ...prev, profileImage: finalImagePath }));
      setHasTextChanges(false);
    } catch (err) {
      console.error("Update failed", err);
      toast.error("Failed to update profile. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl font-bold text-gray-900">
            Profile & Settings
          </h1>
        </div>

        <div className="space-y-8">
          {/* Profile Information Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
              Profile Information
            </h2>

            {/* Profile Picture */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <img
                  className="w-24 h-24 rounded-full object-cover border-4 border-gray-100 shadow-lg"
                  src={formState.profileImage}
                  alt="Profile picture"
                />
                <label className="absolute bottom-0 right-0 bg-blue-500 rounded-full p-2 cursor-pointer hover:bg-blue-600 transition-colors shadow-lg">
                  <Camera className="w-4 h-4 text-white" />
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="hidden"
                  />
                </label>
              </div>
            </div>

            {/* Form Fields - JSX remains the same */}
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formState.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Enter your full name"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Affiliation
                </label>
                <input
                  type="text"
                  name="affiliation"
                  value={formState.affiliation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Your institution or organization"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  ORCID ID
                </label>
                <input
                  type="text"
                  name="orcid"
                  value={formState.orcid}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="0000-0000-0000-0000"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Bio
                </label>
                <textarea
                  name="bio"
                  rows={4}
                  value={formState.bio}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  placeholder="Tell us about yourself and your research interests"
                />
              </div>
            </div>

            {/* Save Button */}
            {hasChanges && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveProfile}
                  disabled={isUpdating}
                  className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isUploadingImage
                    ? "Uploading Image..."
                    : isUpdatingProfile
                    ? "Saving Profile..."
                    : "Save Changes"}
                </button>
              </div>
            )}

            {/* Settings Card - JSX remains the same */}
            <div className="pt-6">
              <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                Settings
              </h2>

              {/* Security Section */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Security
                </h3>
                <button className="w-full flex items-center justify-between px-4 py-4 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                  <span className="text-gray-600 font-medium">
                    Change Password
                  </span>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              {/* Notification Preferences */}
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Notification Preferences
                </h3>

                <div className="space-y-4">
                  {/* Email Notifications */}
                  <div className="flex items-center justify-between py-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Email Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        Receive updates via email
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotification("email")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.email ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          notifications.email
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Review Notifications */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Review Notifications
                      </h4>
                      <p className="text-sm text-gray-600">
                        New reviews and comments
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotification("review")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.review ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          notifications.review
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>

                  {/* Site News */}
                  <div className="flex items-center justify-between py-4 border-t border-gray-100">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-1">
                        Site News
                      </h4>
                      <p className="text-sm text-gray-600">
                        updates and announcements
                      </p>
                    </div>
                    <button
                      onClick={() => toggleNotification("siteNews")}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        notifications.siteNews ? "bg-green-500" : "bg-gray-300"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow transition-transform ${
                          notifications.siteNews
                            ? "translate-x-6"
                            : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
