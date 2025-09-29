import { useState } from "react";
import jsPDF from "jspdf";
import { Download, Info, Menu, Star } from "lucide-react";

import SectionHeader from "../../../utils/SectionHeading";
import type { Protocol } from "../../../types/potocols.type";
import toast from "react-hot-toast";

interface CrisprDeatilsProps {
  protocol: Protocol;
}

const CrisprDeatils = ({ protocol }: CrisprDeatilsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const generatePDF = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF();
      let yOffset = 20;

      // Title
      doc.setFontSize(18);
      doc.text(protocol.protocolTitle || "Untitled Protocol", 20, yOffset);
      yOffset += 10;

      // Description
      doc.setFontSize(12);
      doc.text("Description:", 20, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.text(
        doc.splitTextToSize(
          protocol.protocolDescription || "No description available",
          170
        ),
        20,
        yOffset
      );
      yOffset += 10 + (protocol.protocolDescription?.length || 0) / 50;

      // Tags
      doc.setFontSize(12);
      doc.text("Tags:", 20, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.text(protocol.tags?.join(", ") || "No tags", 20, yOffset);
      yOffset += 10;

      // Meta Info
      doc.setFontSize(12);
      doc.text("Meta Information:", 20, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.text(`Published: ${protocol.createdAt || "Unknown"}`, 20, yOffset);
      yOffset += 5;

      yOffset += 5;
      doc.text(`DOI: ${protocol.doiLink || "Not available"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Status: ${protocol.status || "Unknown"}`, 20, yOffset);
      yOffset += 10;

      // Materials
      doc.setFontSize(12);
      doc.text("Materials:", 20, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      protocol.materials?.forEach((material, index) => {
        doc.text(
          `${index + 1}. ${material.itemName} (Quantity: ${
            material.quantity
          }, Catalog: ${material.catalog}, Supplier: ${material.supplier})`,
          20,
          yOffset
        );
        yOffset += 5;
      });
      yOffset += 10;

      // Equipment
      doc.setFontSize(12);
      doc.text("Equipment:", 20, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      protocol.equipment?.forEach((equip, index) => {
        doc.text(
          `${index + 1}. ${equip.equipmentName} (Note: ${
            equip.note || "None"
          })`,
          20,
          yOffset
        );
        yOffset += 5;
      });
      yOffset += 10;

      // Authors
      doc.setFontSize(12);
      doc.text("Authors:", 20, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.text(protocol.authors?.join(", ") || "No authors", 20, yOffset);
      yOffset += 5;
      doc.text(
        `Co-Authors: ${protocol.coAuthors?.join(", ") || "None"}`,
        20,
        yOffset
      );
      yOffset += 10;

      // Other Details
      doc.setFontSize(12);
      doc.text("Additional Details:", 20, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.text(`Category: ${protocol.category || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Technique: ${protocol.technique || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Modality: ${protocol.modality || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Organism: ${protocol.organism || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Phase: ${protocol.phase || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`BSL Level: ${protocol.bslLevel || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(`Difficulty: ${protocol.difficulty || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(
        `Estimated Time: ${protocol.estimatedTime || "Unknown"}`,
        20,
        yOffset
      );
      yOffset += 5;
      doc.text(`License: ${protocol.license || "Unknown"}`, 20, yOffset);
      yOffset += 5;
      doc.text(
        `Additional Reference: ${protocol.additionalReference || "None"}`,
        20,
        yOffset
      );
      yOffset += 5;
      doc.text(
        `Confidential: ${protocol.isConfidential ? "Yes" : "No"}`,
        20,
        yOffset
      );
      yOffset += 5;
      doc.text(
        `Confirmed: ${protocol.isConfirmed ? "Yes" : "No"}`,
        20,
        yOffset
      );
      yOffset += 5;
      doc.text(
        `Acknowledged: ${protocol.isAcknowledged ? "Yes" : "No"}`,
        20,
        yOffset
      );
      yOffset += 10;

      // Procedure
      if (protocol.stepProcedure) {
        doc.setFontSize(12);
        doc.text("Procedure:", 20, yOffset);
        yOffset += 5;
        doc.setFontSize(10);
        doc.text(doc.splitTextToSize(protocol.stepProcedure, 170), 20, yOffset);
      }

      // Save the PDF
      doc.save(`${protocol.protocolTitle || "protocol"}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    toast("Failed to generate PDF. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="w-full px-6 py-32 grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-3 space-y-6">
        {/* Header */}
        <header>
          <SectionHeader
            subtitle={protocol.protocolDescription}
            title={protocol.protocolTitle}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {protocol.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-[#DDE9E5] text-[#1C1C1E] text-sm px-3 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="mt-3 text-sm text-gray-500 space-x-3">
            <span>Published: {protocol.createdAt || "Unknown"}</span>

            {protocol.doiLink ? (
              <a
                href={protocol.doiLink}
                className="text-blue-600 underline"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="View DOI link"
              >
                DOI: {protocol.doiLink}
              </a>
            ) : (
              <span>DOI: Not available</span>
            )}
          </div>

          {/* Download Button */}
          <button
            className="mt-4 flex items-center gap-2 bg-[#17AA80] text-white px-4 py-2 rounded-lg hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
            aria-label="Download protocol as PDF"
            onClick={generatePDF}
            disabled={isDownloading}
          >
            <Download className="w-6 h-6 text-[#F5F5F7]" />
            {isDownloading ? "Generating PDF..." : "Download PDF"}
          </button>
        </header>

        {/* Table of Contents & Status */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Table of Contents */}
          <div className="p-5 rounded-xl shadow-sm bg-[#FAFAFA]">
            <div className="font-semibold mb-3 flex gap-6">
              <Menu className="w-4 h-4 text-[#0A251D]" />
              <span className="text-[#1C1C1E] text-xl">Table of Contents</span>
            </div>
            <ul className="space-y-2 text-gray-700">
              {[
                "Materials & Reagents",
                "Protocol Steps",
                "Troubleshooting",
                "Equipment",
                "References",
                "Files & Attachments",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-[#636363]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Status Table */}
          <div className="p-5 rounded-xl bg-[#FAFAFA]">
            <div className="font-semibold mb-3 flex gap-4">
              <Info className="w-6 h-6 text-[#1C1C1E]" />
              <p className="text-[#1C1C1E] text-2xl">Status & Version</p>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <strong className="w-40 text-[#636363] text-xl font-normal">
                  Current Version:
                </strong>
              </div>
              <div className="flex justify-between">
                <strong className="w-40 text-[#636363] text-xl font-normal">
                  Published:
                </strong>
                <p>{protocol.createdAt || "Unknown"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#636363] text-xl font-normal w-40">
                  Status
                </p>
                <p className="flex h-8 px-4 py-2 justify-center items-center gap-2 rounded-2xl text-[#34C759] bg-[#E1F7E6]">
                  {protocol.status || "Unknown"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sidebar Protocol Summary */}
      <aside className="flex w-fit max-w-lg p-10 flex-col justify-center items-start gap-8 shrink-0 rounded-xl border border-emerald-500/50 bg-gray-50">
        <h2 className="font-semibold mb-4 text-xl text-[#1C1C1E]">
          Protocol Summary
        </h2>
        <dl className="space-y-6 text-gray-700">
          <div className="flex items-center">
            <dt className="w-36 text-[#636363]">Technique</dt>
            <dd className="flex-1 font-medium">
              {protocol.technique || "Unknown"}
            </dd>
          </div>
          <div className="flex items-center">
            <dt className="w-36 text-[#636363]">Modality</dt>
            <dd className="flex-1 font-medium">
              {protocol.modality || "Unknown"}
            </dd>
          </div>
          <div className="flex items-center">
            <dt className="w-36 text-[#636363]">Organism</dt>
            <dd className="flex-1 font-medium">
              {protocol.organism || "Unknown"}
            </dd>
          </div>
          <div className="flex items-center">
            <dt className="w-36 text-[#636363]">Phase</dt>
            <dd className="flex-1 font-medium">
              {protocol.phase || "Unknown"}
            </dd>
          </div>
          <div className="flex items-center">
            <dt className="w-36 text-[#636363]">BSL Level</dt>
            <dd className="flex-1 flex h-8 px-4 py-2 justify-center items-center gap-2 rounded-2xl text-[#F5B235] bg-[#FAEED8]">
              {protocol.bslLevel || "Unknown"}
            </dd>
          </div>
          <div className="flex items-center">
            <dt className="w-36 text-[#636363]">Difficulty</dt>
            <dd className="flex-1 flex h-9 px-4 py-2 justify-center items-center gap-2.5 rounded-2xl bg-[#DDE9E5]">
              <Star className="w-4 h-4 text-[#1C1C1E]" />
              {protocol.difficulty || "Unknown"}
            </dd>
          </div>
          <div className="flex items-center">
            <dt className="w-36 text-[#636363]">Time Required</dt>
            <dd className="flex-1 font-medium">
              {protocol.estimatedTime || "Unknown"}
            </dd>
          </div>
        </dl>
      </aside>
    </div>
  );
};

export default CrisprDeatils;
