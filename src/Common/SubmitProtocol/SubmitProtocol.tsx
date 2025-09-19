import { useState } from "react";

interface Material {
  item: string;
  qty: string;
  catalog?: string;
  supplier?: string;
}

interface Author {
  fullName: string;
  email: string;
  affiliation: string;
  orcid: string;
}

export default function SubmitProtocol() {
  const [materials, _setMaterials] = useState<Material[]>([
    { item: "", qty: "", catalog: "", supplier: "" },
  ]);

  const [authors, _setAuthors] = useState<Author[]>([
    { fullName: "", email: "", affiliation: "", orcid: "" },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 px-4 sm:px-6 lg:px-8 py-36">
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow p-8">
        <h1 className="text-2xl font-semibold mb-6">Submit New Protocol</h1>

        {/* Basic Information */}
        <section className="space-y-4">
          <h2 className="text-lg font-medium">Basic Information</h2>
          <input
            type="text"
            placeholder="Enter a descriptive title for your protocol"
            className="w-full border rounded-lg p-2"
          />
          <textarea
            placeholder="Provide a brief abstract describing your protocol (280-400 characters)"
            rows={3}
            className="w-full border rounded-lg p-2"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select className="border rounded-lg p-2">
              <option>Select a category</option>
            </select>
            <input
              type="text"
              placeholder="Add tags separated by commas"
              className="border rounded-lg p-2"
            />
          </div>
        </section>

        {/* Protocol Details */}
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-medium">Protocol Details</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select className="border rounded-lg p-2">
              <option>Select technique</option>
            </select>
            <select className="border rounded-lg p-2">
              <option>Select modality</option>
            </select>
            <input
              type="text"
              placeholder="Organism / Cell Type"
              className="border rounded-lg p-2"
            />
            <select className="border rounded-lg p-2">
              <option>Select phase</option>
            </select>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Estimated Time</label>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-lg">{"<1h"}</button>
                <button className="px-3 py-1 border rounded-lg">1-4h</button>
                <button className="px-3 py-1 border rounded-lg">1-3d</button>
                <button className="px-3 py-1 border rounded-lg">{">3d"}</button>
              </div>
            </div>
            <div>
              <label className="block text-sm">Difficulty</label>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border rounded-lg">Easy</button>
                <button className="px-3 py-1 border rounded-lg">Medium</button>
                <button className="px-3 py-1 border rounded-lg">Hard</button>
              </div>
            </div>
          </div>
        </section>

        {/* Biosafety */}
        <section className="mt-8 bg-yellow-50 border border-yellow-300 rounded-lg p-4">
          <h3 className="font-medium">Biosafety Level Requirement</h3>
          <select className="w-full border rounded-lg p-2 mt-2">
            <option>Select BSL level</option>
          </select>
          <p className="text-sm mt-2 text-yellow-800">
            Important: This protocol requires BSL-2+ handling. Detailed
            procedural steps will remain hidden until a reviewer confirms
            compliance.
          </p>
        </section>

        {/* Materials & Equipment */}
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-medium">Materials & Equipment</h2>
          <div className="space-y-2">
            {materials.map((m, i) => (
              <div key={i} className="grid grid-cols-1 sm:grid-cols-4 gap-2">
                <input
                  className="border rounded-lg p-2"
                  placeholder="Item Name"
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Quantity"
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Catalog (optional)"
                />
                <input
                  className="border rounded-lg p-2"
                  placeholder="Supplier (optional)"
                />
              </div>
            ))}
            <button className="text-blue-600 text-sm">+ Add Material</button>
          </div>
        </section>

        {/* Full Protocol */}
        <section className="mt-8 space-y-2">
          <h2 className="text-lg font-medium">Full Protocol / Steps</h2>
          <div className="bg-red-50 border border-red-400 text-red-700 rounded-lg p-3 text-sm">
            Ensure all procedures comply with your institution's safety
            policies. Include all necessary safety precautions.
          </div>
          <textarea
            placeholder="Enter your detailed protocol steps..."
            rows={8}
            className="w-full border rounded-lg p-2"
          />
        </section>

        {/* Files */}
        <section className="mt-8">
          <h2 className="text-lg font-medium">Files & Attachments</h2>
          <div className="mt-2 border-dashed border-2 border-gray-300 rounded-lg p-6 text-center">
            <p className="text-sm">Drop your file or click to browse</p>
          </div>
          <div className="mt-2 flex items-center space-x-2 text-sm">
            <span className="bg-gray-100 px-3 py-1 rounded">
              Protocol_supplementary.pdf
            </span>
            <button className="text-red-600">Delete</button>
          </div>
        </section>

        {/* Authors */}
        <section className="mt-8 space-y-4">
          <h2 className="text-lg font-medium">Authors & Affiliations</h2>
          {authors.map((a, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                placeholder="Full Name"
                className="border rounded-lg p-2"
              />
              <input placeholder="Email" className="border rounded-lg p-2" />
              <input
                placeholder="Affiliation"
                className="border rounded-lg p-2 sm:col-span-2"
              />
              <input
                placeholder="ORCID"
                className="border rounded-lg p-2 sm:col-span-2"
              />
            </div>
          ))}
          <button className="text-blue-600 text-sm">+ Add Author</button>
        </section>

        {/* Consent & Safety */}
        <section className="mt-8 space-y-3">
          <h2 className="text-lg font-medium">Consent & Safety</h2>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>
              I confirm this submission follows my institution’s policies and
              allow reviewer access
            </span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>I acknowledge responsibility for safety compliance</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" />
            <span>No confidential patient information included</span>
          </label>
        </section>

        <div className="mt-8">
          <button className="w-full sm:w-auto bg-green-600 hover:bg-green-700 text-white font-medium px-6 py-2 rounded-lg">
            Submit for Review
          </button>
        </div>
      </div>
    </div>
  );
}
