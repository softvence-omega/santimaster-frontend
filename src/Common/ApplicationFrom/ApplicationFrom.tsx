import { useState } from "react";
import { useUpdateAccountMutation } from "../../redux/features/Account/account.api";
import toast from "react-hot-toast";

interface FormData {
  fullName: string;
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
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRoleSelect = (role: string) => {
    setFormData((prev) => ({ ...prev, role }));
  };

  const mapRoleToEnum = (
    role: string
  ):
    | "RESEARCHER"
    | "CLINICIAN"
    | "ENGINEER"
    | "REVIEWER"
    | "DONAR"
    | undefined => {
    const roleMap: {
      [key: string]:
        | "RESEARCHER"
        | "CLINICIAN"
        | "ENGINEER"
        | "REVIEWER"
        | "DONAR";
    } = {
      Researcher: "RESEARCHER",
      Clinician: "CLINICIAN",
      Engineer: "ENGINEER",
      Reviewer: "REVIEWER",
      Doner: "DONAR",
    };
    return roleMap[role];
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!privacyAgreed || !notRobot) {
      toast(
        "Please agree to the Privacy Policy and confirm you're not a robot"
      );
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
      console.log(response);
      toast("Application submitted successfully!");
    } catch (err) {
      console.error("Failed to update account:", err);
      toast("Failed to submit application. Please try again.");
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
                  <g clip-path="url(#clip0_196_373)">
                    <path
                      d="M3.33464 4.00029C3.33464 3.82348 3.40487 3.65391 3.5299 3.52889C3.65492 3.40386 3.82449 3.33363 4.0013 3.33363H4.01664C4.09573 2.48035 4.47071 1.68159 5.07666 1.07565C5.6826 0.469702 6.48136 0.0947205 7.33464 0.015625V2.00029C7.33464 2.1771 7.40487 2.34667 7.5299 2.4717C7.65492 2.59672 7.82449 2.66696 8.0013 2.66696C8.17811 2.66696 8.34768 2.59672 8.47271 2.4717C8.59773 2.34667 8.66797 2.1771 8.66797 2.00029V0.015625C9.5212 0.0948458 10.3199 0.469868 10.9258 1.07579C11.5317 1.68171 11.9067 2.4804 11.986 3.33363H12.0013C12.1781 3.33363 12.3477 3.40386 12.4727 3.52889C12.5977 3.65391 12.668 3.82348 12.668 4.00029C12.668 4.1771 12.5977 4.34667 12.4727 4.4717C12.3477 4.59672 12.1781 4.66696 12.0013 4.66696H4.0013C3.82449 4.66696 3.65492 4.59672 3.5299 4.4717C3.40487 4.34667 3.33464 4.1771 3.33464 4.00029ZM12.8546 10.0596L10.8573 10.5516C10.243 10.6636 9.68744 10.9875 9.28748 11.467C8.88752 11.9465 8.66851 12.5512 8.66864 13.1756V15.3283C8.66864 15.505 8.73878 15.6745 8.86366 15.7995C8.98854 15.9245 9.15794 15.9948 9.33464 15.995L14.6653 16.0003C14.7529 16.0004 14.8397 15.9832 14.9206 15.9497C15.0016 15.9163 15.0752 15.8672 15.1371 15.8053C15.1991 15.7434 15.2483 15.6698 15.2818 15.5889C15.3154 15.508 15.3326 15.4212 15.3326 15.3336V12.0016C15.3328 11.6983 15.2639 11.3989 15.1311 11.1261C14.9984 10.8533 14.8053 10.6143 14.5666 10.4272C14.3278 10.24 14.0496 10.1097 13.753 10.046C13.4564 9.98235 13.1492 9.987 12.8546 10.0596ZM5.14397 10.5516L3.14664 10.0596C2.85206 9.98701 2.54483 9.98237 2.2482 10.046C1.95157 10.1097 1.67331 10.24 1.4345 10.4272C1.19568 10.6143 1.00256 10.8533 0.869755 11.126C0.736953 11.3988 0.66795 11.6982 0.667969 12.0016V15.3276C0.667969 15.5044 0.738207 15.674 0.863231 15.799C0.988255 15.9241 1.15782 15.9943 1.33464 15.9943H6.6653C6.84211 15.9943 7.01168 15.9241 7.13671 15.799C7.26173 15.674 7.33197 15.5044 7.33197 15.3276V13.1756C7.33209 12.5512 7.11309 11.9465 6.71313 11.467C6.31316 10.9875 5.75761 10.6636 5.1433 10.5516H5.14397ZM12.0013 6.00029H4.0013C4.0533 8.16096 5.82797 10.0003 8.0013 10.0003C10.2086 10.003 12.0046 8.19563 12.0013 6.00029Z"
                      fill="#F5F5F7"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_196_373">
                      <rect width="16" height="16" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <button
                type="button"
                onClick={() => handleRoleSelect(role)}
                className="px-4 py-2 font-medium cursor-pointer"
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
        {/* <div>
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
        </div> */}
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
