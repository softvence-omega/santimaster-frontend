import { Download, FileText, FileSpreadsheet, Image, File } from "lucide-react";

type FileType = "pdf" | "csv" | "image" | "other";

const FilesAttachments = ({ attachment }: { attachment?: string }) => {
  if (!attachment) {
    return (
      <div className="max-w-4xl mx-auto p-6 bg-white text-center text-gray-500">
        No files attached.
      </div>
    );
  }

  // detect file type from extension
  const getFileType = (fileName: string): FileType => {
    if (fileName.endsWith(".pdf")) return "pdf";
    if (fileName.endsWith(".csv")) return "csv";
    if (/\.(png|jpg|jpeg|gif)$/i.test(fileName)) return "image";
    return "other";
  };

  const getFileIcon = (type: FileType) => {
    switch (type) {
      case "pdf":
        return <FileText className="w-6 h-6" />;
      case "csv":
        return <FileSpreadsheet className="w-6 h-6" />;
      case "image":
        return <Image className="w-6 h-6" />;
      default:
        return <File className="w-6 h-6" />;
    }
  };

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

  const type = getFileType(attachment);

  // Function to download file via JS
  const handleDownload = async () => {
    try {
      const response = await fetch(attachment);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = attachment.split("/").pop() || "file";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download failed:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white">
      <h2
        className="text-[#0A251D] text-center font-semibold leading-normal
           text-2xl sm:text-3xl md:text-4xl lg:text-[48px] m-6"
      >
        Files & Attachments
      </h2>

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 hover:shadow-md transition-all duration-200 bg-white">
        <div className="flex flex-1 items-start sm:items-center gap-4 w-full">
          <div
            className={`p-3 rounded-lg border flex-shrink-0 ${getFileTypeColor(
              type
            )}`}
          >
            {getFileIcon(type)}
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-gray-900 truncate mb-1">
              {attachment.split("/").pop()}
            </h3>
            <p className="text-sm text-gray-600 line-clamp-2">
              Protocol attachment file
            </p>
          </div>
        </div>

        <button
          onClick={handleDownload}
          className="flex items-center justify-center p-2 mt-2 sm:mt-0 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors duration-200"
          aria-label="Download attachment"
        >
          <Download className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default FilesAttachments;
