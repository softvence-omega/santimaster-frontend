import React from "react";
import { Download, FileText, FileSpreadsheet, Image } from "lucide-react";

type FileType = "pdf" | "csv" | "image" | "other";

interface File {
  id: number;
  name: string;
  description: string;
  type: FileType;
  icon: React.ReactNode;
  size: string;
  updatedBy: string;
  date: string;
}

const FilesAttachments: React.FC = () => {
  const files: File[] = [
    {
      id: 1,
      name: "CRISPR-Protocol-Detailed.pdf",
      description:
        "Detailed protocol with diagrams | 2.4 MB | Updated by Dr. Smith | Mar 15, 2024",
      type: "pdf",
      icon: <FileText className="w-6 h-6" />,
      size: "2.4 MB",
      updatedBy: "Dr. Smith",
      date: "Mar 15, 2024",
    },
    {
      id: 2,
      name: "gRNA_sequences.csv",
      description:
        "Guide RNA sequences and targets | 15 kB | Uploaded by Lab Team | Mar 12, 2024",
      type: "csv",
      icon: <FileSpreadsheet className="w-6 h-6" />,
      size: "15 kB",
      updatedBy: "Lab Team",
      date: "Mar 12, 2024",
    },
    {
      id: 3,
      name: "cell-morphology-examples.png",
      description:
        "Reference images for cell assessment | 858 kB | Uploaded by Dr. Johnson | Mar 11, 2024",
      type: "image",
      icon: <Image className="w-6 h-6" />,
      size: "858 kB",
      updatedBy: "Dr. Johnson",
      date: "Mar 11, 2024",
    },
  ];

  const getFileTypeColor = (type: FileType) => {
    switch (type) {
      case "pdf":
        return "bg-red-100 text-red-700 border-red-200";
      case "csv":
        return "bg-green-100 text-green-700 border-green-200";
      case "image":
        return "bg-blue-100 text-blue-700 border-blue-200";
      default:
        return "bg-gray-100 text-gray-700 border-gray-200";
    }
  };

  const handleDownload = (fileName: string) => {
    console.log(`Downloading ${fileName}`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white">
      {/* <h2 className="text-2xl sm:text-3xl font-semibold text-gray-900 mb-6 text-center">
        Files & Attachments
      </h2> */}
      <h2
        className="text-[#0A251D] text-center font-semibold leading-normal
           text-2xl sm:text-3xl md:text-4xl lg:text-[48px] m-6"
      >
        Files & Attachments
      </h2>
      <div className="space-y-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white"
          >
            <div className="flex flex-1 items-start sm:items-center gap-4 w-full">
              <div
                className={`p-3 rounded-lg border flex-shrink-0 ${getFileTypeColor(
                  file.type
                )}`}
              >
                {file.icon}
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-gray-900 truncate mb-1">
                  {file.name}
                </h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {file.description}
                </p>

                <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 mt-2 text-xs text-gray-500">
                  <span>{file.size}</span>
                  <span>•</span>
                  <span>Updated by {file.updatedBy}</span>
                  <span>•</span>
                  <span>{file.date}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleDownload(file.name)}
              className="flex items-center justify-center p-2 mt-2 sm:mt-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
              aria-label={`Download ${file.name}`}
            >
              <Download className="w-5 h-5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FilesAttachments;
