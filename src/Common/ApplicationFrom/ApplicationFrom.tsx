const OpenGeneApplicationForm = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 bg-[#FAFAFA] rounded-sm w-full sm:w-11/12 md:w-5/6 lg:w-fit py-10 md:py-20 lg:py-40">
      {/* Title */}
      <h1 className="text-2xl font-bold mb-6 text-center md:text-left">
        Choose Your Role
      </h1>

      {/* Role Selection */}
      <div className="flex flex-wrap gap-3 md:gap-4 mb-8">
        <button className="px-4 py-2 bg-green-100 text-green-700 rounded-full font-medium">
          Researcher
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
          Clinician
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
          Engineer
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
          Reviewer
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-full font-medium">
          Donor
        </button>
      </div>

      {/* Personal Information */}
      <h2 className="text-xl font-bold mb-4">Personal Information</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <input
            type="text"
            placeholder="Ayesha Rahman"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@institution.edu"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Affiliation / Organization
          </label>
          <input
            type="text"
            placeholder="Department of Genetics - XYZ University"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            ORCID / Researcher ID
          </label>
          <input
            type="text"
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
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Short Bio
        </label>
        <textarea
          placeholder="Summarize your background in 2-3 sentences."
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-24"
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-1">
          <span>250-500 characters required</span>
          <span>0/500</span>
        </div>
      </div>

      {/* Motivation / Why Join */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Motivation / Why Join
        </label>
        <textarea
          placeholder="Why do you want to join Open Gene? (250-800 chars)"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 h-32"
        ></textarea>
        <div className="flex flex-col sm:flex-row justify-between text-xs text-gray-500 mt-1">
          <span>250-800 characters required</span>
          <span>0/800</span>
        </div>
      </div>

      {/* Relevant Experience / Expertise */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Relevant Experience / Expertise
        </label>
        <input
          type="text"
          placeholder="e.g., CRISPR, mRNA, CAR-T, bioinformatics"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <p className="text-xs text-gray-500 mt-1">
          Optional but recommended - separate tags with commas
        </p>
      </div>

      {/* Documents & Links */}
      <h2 className="text-xl font-bold mb-4">Documents & Links</h2>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          CV / Resume Upload
        </label>
        <div className="w-full px-4 py-6 border-2 border-dashed border-gray-300 rounded-md text-center">
          <div className="text-gray-500">Drop your CV here or browse file</div>
          <div className="text-xs text-gray-500 mt-1">
            PDF, DOC, DOCX. Max 10 MB
          </div>
        </div>
        <p className="text-xs text-gray-500 mt-1">
          Required for Reviewer role, optional for others
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            LinkedIn
          </label>
          <input
            type="url"
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
        <select className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500">
          <option>Select your availability</option>
        </select>
        <p className="text-xs text-gray-500 mt-1">
          Optional - helps us understand your commitment level
        </p>
      </div>

      {/* Confirmation */}
      <div className="mb-6">
        <label className="flex items-start sm:items-center text-sm text-gray-700">
          <input type="checkbox" className="mr-2 mt-1 sm:mt-0" />I confirm that
          I agree to the Privacy Policy and consent to store my application data
          for review purposes.
        </label>
      </div>

      {/* reCAPTCHA */}
      <div className="mb-6">
        <label className="flex items-start sm:items-center text-sm text-gray-700">
          <input type="checkbox" className="mr-2 mt-1 sm:mt-0" />
          I'm not a robot
        </label>
      </div>

      {/* Submit Button */}
      <button className="w-full py-3 bg-green-500 text-white font-medium rounded-md hover:bg-green-600">
        Submit Application
      </button>

      {/* Footer */}
      <p className="text-xs text-gray-500 text-center mt-4">
        By submitting, you agree to our Terms and Privacy Policy
      </p>
    </div>
  );
};

export default OpenGeneApplicationForm;
