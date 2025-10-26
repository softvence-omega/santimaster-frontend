/* eslint-disable @typescript-eslint/no-explicit-any */
import jsPDF from "jspdf";
import { Download, Info, Menu, Star, TestTube2 } from "lucide-react";
import { useState } from "react";

import toast from "react-hot-toast";
import type { Protocol } from "../../../types/potocols.type";

interface CrisprDeatilsProps {
  protocol: Protocol;
}

const CrisprDeatils = ({ protocol }: CrisprDeatilsProps) => {
  const [isDownloading, setIsDownloading] = useState(false);

  const generatePDF = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
      const pageHeight = doc.internal.pageSize.height;
      const margin = 20;
      let yOffset = margin;

      // Helper function to check for page overflow and add new page if needed
      const checkPageOverflow = (additionalHeight: number) => {
        if (yOffset + additionalHeight > pageHeight - margin) {
          doc.addPage();
          yOffset = margin;
        }
      };

      // Set font
      doc.setFont("helvetica", "normal");

      // Title
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(protocol.protocolTitle || "Untitled Protocol", margin, yOffset);
      yOffset += 10;

      // Description
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Description:", margin, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const descriptionLines = doc.splitTextToSize(
        protocol.protocolDescription || "No description available",
        170
      );
      checkPageOverflow(descriptionLines.length * 5);
      doc.text(descriptionLines, margin, yOffset);
      yOffset += descriptionLines.length * 5 + 10;

      // Tags
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Tags:", margin, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const tagsText = protocol.tags?.length ? protocol.tags.join(", ") : "No tags";
      const tagLines = doc.splitTextToSize(tagsText, 170);
      checkPageOverflow(tagLines.length * 5);
      doc.text(tagLines, margin, yOffset);
      yOffset += tagLines.length * 5 + 10;

      // Meta Info
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Meta Information:", margin, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const metaInfo = [
        `Published: ${protocol.createdAt || "Unknown"}`,
        `DOI: ${protocol.doiLink || "Not available"}`,
        `Status: ${protocol.status || "Unknown"}`,
      ];
      metaInfo.forEach((info) => {
        checkPageOverflow(5);
        doc.text(info, margin, yOffset);
        yOffset += 5;
      });
      yOffset += 10;

      // Materials
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Materials:", margin, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      if (protocol.materials?.length) {
        protocol.materials.forEach((material, index) => {
          const materialText = `${index + 1}. ${material.itemName || "Unknown"} (Quantity: ${material.quantity || "N/A"
            }, Catalog: ${material.catalog || "N/A"}, Supplier: ${material.supplier || "N/A"
            })`;
          const materialLines = doc.splitTextToSize(materialText, 170);
          checkPageOverflow(materialLines.length * 5);
          doc.text(materialLines, margin, yOffset);
          yOffset += materialLines.length * 5;
        });
      } else {
        doc.text("No materials listed", margin, yOffset);
        yOffset += 5;
      }
      yOffset += 10;

      // Equipment
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Equipment:", margin, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      if (protocol.equipment?.length) {
        protocol.equipment.forEach((equip, index) => {
          const equipText = `${index + 1}. ${equip.equipmentName || "Unknown"} (Note: ${equip.note || "None"
            })`;
          const equipLines = doc.splitTextToSize(equipText, 170);
          checkPageOverflow(equipLines.length * 5);
          doc.text(equipLines, margin, yOffset);
          yOffset += equipLines.length * 5;
        });
      } else {
        doc.text("No equipment listed", margin, yOffset);
        yOffset += 5;
      }
      yOffset += 10;

      // Authors
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Authors:", margin, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const authorsText = protocol.authors ? protocol.authors : "No authors";
      const coAuthorsText = protocol.coAuthors?.length ? protocol.coAuthors.join(", ") : "None";
      const authorLines = doc.splitTextToSize(authorsText, 170);
      checkPageOverflow(authorLines.length * 5);
      doc.text(authorLines, margin, yOffset);
      yOffset += authorLines.length * 5;
      checkPageOverflow(5);
      doc.text(`Co-Authors: ${coAuthorsText}`, margin, yOffset);
      yOffset += 10;

      // Other Details
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text("Additional Details:", margin, yOffset);
      yOffset += 5;
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      const details = [
        `Category: ${protocol.category || "Unknown"}`,
        `Technique: ${protocol.technique || "Unknown"}`,
        `Modality: ${protocol.modality || "Unknown"}`,
        `Organism: ${protocol.organism || "Unknown"}`,
        `Phase: ${protocol.phase || "Unknown"}`,
        `BSL Level: ${protocol.bslLevel || "Unknown"}`,
        `Difficulty: ${protocol.difficulty || "Unknown"}`,
        `Estimated Time: ${protocol.estimatedTime || "Unknown"}`,
        `License: ${protocol.license || "Unknown"}`,
        `Additional Reference: ${protocol.additionalReference || "None"}`,
        `Confidential: ${protocol.isConfidential ? "Yes" : "No"}`,
        `Confirmed: ${protocol.isConfirmed ? "Yes" : "No"}`,
        `Acknowledged: ${protocol.isAcknowledged ? "Yes" : "No"}`,
      ];
      details.forEach((detail) => {
        checkPageOverflow(5);
        doc.text(detail, margin, yOffset);
        yOffset += 5;
      });
      yOffset += 10;

      // Procedure
      if (protocol.stepProcedure) {
        doc.setFontSize(12);
        doc.setFont("helvetica", "bold");
        doc.text("Procedure:", margin, yOffset);
        yOffset += 5;
        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        const procedureLines = doc.splitTextToSize(protocol.stepProcedure, 170);
        checkPageOverflow(procedureLines.length * 5);
        doc.text(procedureLines, margin, yOffset);
        yOffset += procedureLines.length * 5;
      }

      // Save the PDF
      doc.save(`${protocol.protocolTitle || "protocol"}.pdf`);
      toast.success("PDF generated successfully!");
    } catch (error: any) {
      console.error("Error generating PDF:", error);
      toast.error(`Failed to generate PDF: ${error.message || "Unknown error"}`);
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
          <h1 className="text-2xl mb-4 md:text-3xl xl:text-4xl font-bold text-[#1C1C1E]">{protocol.protocolTitle}</h1>
          <p className="text-base text-[#636363] text-justify font-roboto">
            {protocol.protocolDescription}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-4">
            {protocol.tags?.map((tag) => (
              <span
                key={tag}
                className="bg-[#DDE9E5] text-[#1C1C1E] text-sm px-3 py-1 rounded-full capitalize"
              >
                # {tag}
              </span>
            ))}
          </div>

          {/* Meta Info */}
          <div className="mt-3 text-sm text-gray-500 space-x-3">
            <span>Published: {new Date(protocol.createdAt).toDateString() || "Unknown"}</span>

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
            <div className="font-semibold mb-3 flex gap-4 items-center">
              <Menu className="w-4 h-4 text-[#0A251D]" />
              <span className="text-[#1C1C1E] text-xl">Table of Contents</span>
            </div>
            <div className="space-y-2 text-gray-700 grid gird-cols-2 md:px-8">
              {[
                "Materials & Reagents",
                "Protocol Steps",
                "Troubleshooting",
                "Equipment",
                "References",
                "Files & Attachments",
              ].map((item) => (
                <div key={item} className="flex items-center gap-2">
                  <TestTube2 className="w-4 h-4 text-[#636363]" />
                  {item}
                </div>
              ))}
            </div>
          </div>

          {/* Status Table */}
          <div className="p-5 rounded-xl bg-[#FAFAFA]">
            <div className="font-semibold mb-3 flex gap-4 items-center">
              <Info className="w-4 h-4 text-[#0A251D]" />
              <span className="text-[#1C1C1E] text-xl">Status & Version</span>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <strong className="w-40 text-[#636363] font-normal">
                  Current Version:
                </strong>
              </div>
              <div className="flex justify-between">
                <strong className="w-40 text-[#636363] font-normal">
                  Published:
                </strong>
                <p>{new Date(protocol.createdAt).toDateString() || "Unknown"}</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[#636363] font-normal w-40">
                  Status
                </p>
                <p className="flex px-3 py-2 justify-center items-center gap-2 rounded-xl text-xs text-[#34C759] bg-green-100 border font-bold border-green-300">
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
