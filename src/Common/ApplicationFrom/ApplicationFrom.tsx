import { useState } from "react";
import { useUpdateAccountMutation } from "../../redux/features/Account/account.api";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
  email: string;
  affiliation: string;
  orcid: string;
  bio: string;
  motivation: string;
  expertise: string;
  linkedIn: string;
  googleScholar: string;
  personalWebsite: string;
  availability: string;
  role: string;
}

const OpenGeneApplicationForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    affiliation: "",
    orcid: "",
    bio: "",
    motivation: "",
    expertise: "",
    linkedIn: "",
    googleScholar: "",
    personalWebsite: "",
    availability: "",
    role: "",
  });
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [notRobot, setNotRobot] = useState(false);
  const [updateAccount, { isLoading, error }] = useUpdateAccountMutation();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      setFileName(e.target.files[0].name);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const mapRoleToEnum = (role: string): "RESEARCHER" | "CLINICIAN" | "ENGINEER" | "REVIEWER" | "DONAR" | undefined => {
    const roleMap: { [key: string]: "RESEARCHER" | "CLINICIAN" | "ENGINEER" | "REVIEWER" | "DONAR" } = {
      "Researcher": "RESEARCHER",
      "Clinician": "CLINICIAN",
      "Engineer": "ENGINEER",
      "Reviewer": "REVIEWER",
      "Doner": "DONAR"
    };
    return roleMap[role];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!privacyAgreed || !notRobot) {
      alert("Please agree to the Privacy Policy and confirm you're not a robot");
      return;
    }

    const payload = {
      data: {
        fullName: formData.fullName,
        affiliation: formData.affiliation,
        orcid: formData.orcid,
        bio: formData.bio,
        motivation: formData.motivation,
        expertise: formData.expertise,
        linkedIn: formData.linkedIn,
        googleScholar: formData.googleScholar,
        personalWebsite: formData.personalWebsite,
        availability: formData.availability,
        role: mapRoleToEnum(formData.role),
      },
      ...(file && { image: file }),
    };

    try {
      const response = await updateAccount(payload).unwrap();
    toast("Application submitted successfully!");
    } catch (err) {
      console.error("Failed to update account:", err);
      alert("Failed to submit application. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl mx-auto p-6 bg-[#FAFAFA] rounded-sm w-full sm:w-11/12 md:w-5/6 lg:w-fit py-30 md:py-40 lg:py-40"
    >
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Choose Your Role
      </h1>

      {/*-------------- Role Selection----------------- */}
      <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
        {["Researcher", "Clinician", "Engineer", "Reviewer", "Doner"].map(
          (role) => (
            <div
              key={role}
              className={`flex flex-col items-center gap-3 w-[158px] p-6 rounded-lg ${
                formData.role === role ? "bg-[#DDE9E5]" : "bg-[#F5F5F7]"
              } hover:bg-[#DDE9E5]`}
            >
              <div className="flex justify-center items-center w-10 h-10 rounded-full bg-[#1D6953]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                >
                  {/* SVG paths remain unchanged for brevity */}
                  <path
                    d={
                      role === "Researcher"
                        ? "M16 9C16 5.87533..." 
                        : role === "Clinician"
                        ? "M8.5168 9.5C5.8696..." 
                        : role === "Engineer"
                        ? "M3.33464 4.00029..." 
                        : role === "Reviewer"
                        ? "M15.2133 11.5146..." 
                        : "M6.472 8.366..." 
                    }
                    fill="#F5F5F7"
                  />
                </svg>
              </div>
              <button
                type="button"
                onClick={() => handleRoleSelect(role)}
                className="px-4 py-2 font-medium"
              >
                {role}
              </button>
            </div>
          )
        )}
      </div>

      {/* Personal Information */}
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
            Full Name
          </label>
          <input
            type="text"
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            placeholder="Ayesha Rahman"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
            Email Address
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@institution.edu"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            disabled
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
            Affiliation / Organization
          </label>
          <input
            type="text"
            name="affiliation"
            value={formData.affiliation}
            onChange={handleInputChange}
            placeholder="Department of Genetics - XYZ University"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
            ORCID / Researcher ID
          </label>
          <input
            type="text"
            name="orcid"
            value={formData.orcid}
            onChange={handleInputChange}
            placeholder="0000-0002-1825-0097"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <p className="text-xs text-gray-500 mt-1">
            Optional but recommended for researchers, clinicians, and reviewer
            roles
          </p>
        </div>
      </div>

      {/* Professional Background */}
      <h2 className="text-xl font-bold mb-4">Professional Background</h2>
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          Short Bio
        </label>
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleInputChange}
          placeholder="Summarize your background in 2-3 sentences."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-1">
          <span>250-500 characters required</span>
          <span>{formData.bio.length}/500</span>
        </div>
      </div>

      {/* Motivation / Why Join */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          Motivation / Why Join
        </label>
        <textarea
          name="motivation"
          value={formData.motivation}
          onChange={handleInputChange}
          placeholder="Why do you want to join Open Gene? (250-800 chars)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-1">
          <span>250-800 characters required</span>
          <span>{formData.motivation.length}/800</span>
        </div>
      </div>

      {/* Relevant Experience / Expertise */}
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          Relevant Experience / Expertise
        </label>
        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          onChange={handleInputChange}
          placeholder="e.g., CRISPR, mRNA, CAR-T, bioinformatics"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional but recommended - separate tags with commas
        </p>
      </div>

      {/*--------------- Documents & Links--------- */}
      <h2 className="text-xl font-bold mb-4">Documents & Links</h2>
      <div className="mb-6">
        <label className="block text-lg font-medium text-[#1C1C1E] mb-1">
          CV / Resume Upload
        </label>
        <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-md text-center relative">
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          <div className="text-gray-500 cursor-pointer">
            Drop your CV here or{" "}
            <span className="text-[#4A7BFF]">browse file</span>
          </div>
          <div className="text-xs text-gray-500 mt-1">
            PDF, DOC, DOCX. Max 10 MB
          </div>
        </div>
        {fileName && (
          <p className="text-sm text-green-600 mt-2 font-medium">
            Uploaded: {fileName}
          </p>
        )}
        <p className="text-xs text-gray-500 mt-1">
          Required for Reviewer role, optional for others
        </p>
      </div>

      {/* ----------link-------------- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
            name="linkedIn"
            value={formData.linkedIn}
            onChange={handleInputChange}
            placeholder="https://linkedin.com/in/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Google Scholar
          </label>
          <input
            type="url"
            name="googleScholar"
            value={formData.googleScholar}
            onChange={handleInputChange}
            placeholder="https://scholar.google.com/..."
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Personal Website
          </label>
          <input
            type="url"
            name="personalWebsite"
            value={formData.personalWebsite}
            onChange={handleInputChange}
            placeholder="https://yoursite.com"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
      </div>

      {/* Availability */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Availability / Estimated Weekly Time
        </label>
        <select
          name="availability"
          value={formData.availability}
          onChange={handleInputChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Select your availability</option>
          <option value="1-5 hours">1-5 hours</option>
          <option value="5-10 hours">5-10 hours</option>
          <option value="10-20 hours">10-20 hours</option>
          <option value="20+ hours">20+ hours</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Optional - helps us understand your commitment level
        </p>
      </div>

      {/* Confirmation */}
      <div className="mb-6">
        <label className="flex items-start sm:items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={privacyAgreed}
            onChange={(e) => setPrivacyAgreed(e.target.checked)}
            className="mr-2 mt-1 sm:mt-0"
          />
          I confirm that I agree to the Privacy Policy and consent to store my
          application data for review purposes.
        </label>
      </div>

      {/* reCAPTCHA */}
      <div className="mb-6">
        <label className="flex items-start sm:items-center text-sm text-gray-700">
          <input
            type="checkbox"
            checked={notRobot}
            onChange={(e) => setNotRobot(e.target.checked)}
            className="mr-2 mt-1 sm:mt-0"
          />
          I'm not a robot
        </label>
      </div>

      {/* Submit Button */}
      <div className="flex justify-center items-center">
        <button
          type="submit"
          disabled={isLoading}
          className={`px-6 py-3 bg-[#17AA80] text-white font-medium rounded-md hover:bg-green-600 ${
            isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {isLoading ? "Submitting..." : "Submit Application"}
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="text-red-500 text-center mt-4">
          Error: {JSON.stringify(error)}
        </p>
      )}

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center mt-4">
        By submitting, you agree to our Terms and Privacy Policy
      </p>
    </form>
  );
};

export default OpenGeneApplicationForm;