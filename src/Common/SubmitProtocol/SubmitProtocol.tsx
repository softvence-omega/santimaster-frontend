import { Plus, Upload, X, FileText } from "lucide-react";
import { useState, useRef } from "react";

interface Material {
  item: string;
  qty: string;
  catalog?: string;
  supplier?: string;
}

interface Equipment {
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

interface UploadedFile {
  id: string;
  name: string;
  size: number;
  type: string;
  url: string;
  preview?: string;
  uploadProgress?: number;
}

export default function SubmitProtocol() {
  const [materials, setMaterials] = useState<Material[]>([
    { item: "", qty: "", catalog: "", supplier: "" },
  ]);

  const [equipments, setEquipments] = useState<Equipment[]>([
    { item: "", qty: "", catalog: "", supplier: "" },
  ]);

  const [authors, setAuthors] = useState<Author[]>([
    { fullName: "", email: "", affiliation: "", orcid: "" },
  ]);

  const [difficulty, setDifficulty] = useState("Easy");
  const [category, setCategory] = useState("");
  const [technique, setTechnique] = useState("");
  const [modality, setModality] = useState("");
  const [organismCellType, setOrganismCellType] = useState("");
  const [phase, setPhase] = useState("");
  const [bslLevel, setBslLevel] = useState("");
  const [estimatedTime, setEstimatedTime] = useState("");
  const [notes, setNotes] = useState("");

  // File upload states
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([
    {
      id: "1",
      name: "Protocol_supplementary.pdf",
      size: 2048000,
      type: "application/pdf",
      url: "/api/files/protocol_supplementary.pdf",
      preview: "",
    },
  ]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Category options
  const categoryOptions = [
    "Gene Editing",
    "Cell Therapy",
    "Molecular Biology",
    "Immunotherapy",
  ];

  // Technique options
  const techniqueOptions = [
    "CRISPR/Cas9",
    "Base Editing",
    "Prime Editing",
    "CAR-T",
  ];

  // Modality options
  const modalityOptions = [
    "CAR-T",
    "mRNA",
    "Viral Vector",
    "Lipid Nanoparticle",
  ];

  // Phase options
  const phaseOptions = ["Research", "Preclinical", "Clinical"];

  // BSL Level options
  const bslOptions = ["BSL-1", "BSL-2", "BSL-3", "Other"];

  // Time options
  const timeOptions = ["<1h", "1-4h", "1-3d", ">3d"];

  // File upload handlers
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const getFileIcon = (type: string) => {
    if (type.includes("pdf")) return "📄";
    if (type.includes("image")) return "🖼️";
    if (type.includes("doc") || type.includes("word")) return "📝";
    if (type.includes("excel") || type.includes("sheet")) return "📊";
    return "📎";
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    handleFiles(files);
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(false);
    setDragCounter(0);

    const files = Array.from(event.dataTransfer.files || []);
    handleFiles(files);
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setIsDragging(true);
  };

  const handleDragEnter = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragCounter((prev) => prev + 1);
  };

  const handleDragLeave = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    setDragCounter((prev) => {
      const newCount = prev - 1;
      if (newCount <= 0) {
        setIsDragging(false);
      }
      return newCount;
    });
  };

  const handleClickUpload = () => {
    fileInputRef.current?.click();
  };

  const handleFiles = (files: File[]) => {
    const validFiles = files.filter((file) => {
      const validTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/gif",
        "image/webp",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "application/vnd.ms-excel",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      ];
      const maxSize = 10 * 1024 * 1024; // 10MB

      if (!validTypes.includes(file.type)) {
        alert(
          `File type ${file.name} is not supported. Please upload PDF, images, or documents.`
        );
        return false;
      }

      if (file.size > maxSize) {
        alert(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }

      return true;
    });

    validFiles.forEach((file) => {
      const fileId =
        Date.now().toString() + Math.random().toString(36).substr(2, 9);

      // Simulate upload
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
      };

      setUploadingFiles((prev) => new Set([...prev, fileId]));

      // Simulate upload progress
      const progressInterval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? { ...f, uploadProgress: (f.uploadProgress || 0) + 10 }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(progressInterval);
        setUploadingFiles((prev) => {
          const newSet = new Set(prev);
          newSet.delete(fileId);
          return newSet;
        });
        setUploadedFiles((prev) =>
          prev.map((f) => (f.id === fileId ? { ...f, uploadProgress: 100 } : f))
        );

        // Add to uploaded files after a delay
        setTimeout(() => {
          setUploadedFiles((prev) => [
            ...prev.filter((f) => f.id !== fileId),
            newFile,
          ]);
        }, 500);
      }, 2000);
    });

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file) {
        // Clean up object URLs
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  const addMaterial = () => {
    setMaterials([
      ...materials,
      { item: "", qty: "", catalog: "", supplier: "" },
    ]);
  };

  const removeMaterial = (index: number) => {
    if (materials.length > 1) {
      setMaterials(materials.filter((_, i) => i !== index));
    }
  };

  const addEquipment = () => {
    setEquipments([
      ...equipments,
      { item: "", qty: "", catalog: "", supplier: "" },
    ]);
  };

  const removeEquipment = (index: number) => {
    if (equipments.length > 1) {
      setEquipments(equipments.filter((_, i) => i !== index));
    }
  };

  const addAuthor = () => {
    setAuthors([
      ...authors,
      { fullName: "", email: "", affiliation: "", orcid: "" },
    ]);
  };

  const removeAuthor = (index: number) => {
    if (authors.length > 1) {
      setAuthors(authors.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen py-36 bg-gray-50 px-4 sm:px-6 lg:px-8 ">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
        <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C1C1E] mb-6">
          Submit New Protocol
        </h1>

        {/* Basic Information */}
        <section className="space-y-4 mb-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Basic Information
          </h2>
          <input
            type="text"
            placeholder="Enter a descriptive title for your protocol"
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <textarea
            placeholder="Provide a brief abstract describing your protocol (280-400 characters)"
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select a category</option>
              {categoryOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Add tags separated by commas"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </section>

        {/* Protocol Details */}
        <section className="space-y-4 mb-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Protocol Details
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <select
              value={technique}
              onChange={(e) => setTechnique(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select technique</option>
              {techniqueOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <select
              value={modality}
              onChange={(e) => setModality(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select modality</option>
              {modalityOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={organismCellType}
              onChange={(e) => setOrganismCellType(e.target.value)}
              placeholder="Organism / Cell Type"
              className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <select
              value={phase}
              onChange={(e) => setPhase(e.target.value)}
              className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select phase</option>
              {phaseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Estimated Time
              </label>
              <div className="flex flex-wrap gap-2">
                {timeOptions.map((time) => (
                  <button
                    key={time}
                    onClick={() => setEstimatedTime(time)}
                    className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                      estimatedTime === time
                        ? "bg-green-200 border-blue-500 text-[#636363]"
                        : "bg-white border-gray-300 text-gray-700 hover:border-blue-300"
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Difficulty
              </label>
              <div className="flex flex-wrap gap-2">
                {["Easy", "Medium", "Hard"].map((level) => (
                  <label
                    key={level}
                    className={`px-3 py-2 border rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                      difficulty === level
                        ? "bg-green-100 border-green-500 text-green-700"
                        : "bg-white text-gray-700 border-gray-300 hover:border-green-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="difficulty"
                      value={level}
                      checked={difficulty === level}
                      onChange={() => setDifficulty(level)}
                      className="hidden"
                    />
                    {level}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Biosafety */}
        <section className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
          <h3 className="text-lg font-medium text-yellow-800 mb-3">
            Biosafety Level Requirement
          </h3>
          <select
            value={bslLevel}
            onChange={(e) => setBslLevel(e.target.value)}
            className="w-full border border-yellow-300 rounded-lg p-3 mt-2 text-[#636363] focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
          >
            <option value="">Select BSL level</option>
            {bslOptions.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
          <p className="text-sm mt-3 text-yellow-800 leading-relaxed">
            Important: This protocol requires BSL-2+ handling. Detailed
            procedural steps will remain hidden until a reviewer confirms
            compliance.
          </p>
        </section>

        {/*------------ Materials---------------------- */}
        <section className="space-y-4 mb-8">
          <h1 className="text-2xl sm:text-xl font-medium text-[#1C1C1E]">
            Materials & Equipment
          </h1>
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Materials
          </h2>
          <div className="space-y-3">
            {materials.map((material, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
              >
                <input
                  value={material.item}
                  onChange={(e) => {
                    const newMaterials = [...materials];
                    newMaterials[i].item = e.target.value;
                    setMaterials(newMaterials);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Item Name"
                />
                <input
                  value={material.qty}
                  onChange={(e) => {
                    const newMaterials = [...materials];
                    newMaterials[i].qty = e.target.value;
                    setMaterials(newMaterials);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Quantity"
                />
                <input
                  value={material.catalog || ""}
                  onChange={(e) => {
                    const newMaterials = [...materials];
                    newMaterials[i].catalog = e.target.value;
                    setMaterials(newMaterials);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Catalog (optional)"
                />
                <input
                  value={material.supplier || ""}
                  onChange={(e) => {
                    const newMaterials = [...materials];
                    newMaterials[i].supplier = e.target.value;
                    setMaterials(newMaterials);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Supplier (optional)"
                />
                {materials.length > 1 && (
                  <button
                    onClick={() => removeMaterial(i)}
                    className="sm:col-span-4 lg:col-span-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <button
              onClick={addMaterial}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-[#17AA80] rounded-lg text-[#17AA80] text-sm sm:text-base font-medium hover:bg-[#17AA80] hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Material
            </button>
          </div>
        </section>

        {/* Equipment */}
        <section className="space-y-4 mb-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Equipment
          </h2>
          <div className="space-y-3">
            {equipments.map((equipment, i) => (
              <div
                key={i}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg bg-blue-50"
              >
                <input
                  value={equipment.item}
                  onChange={(e) => {
                    const newEquipments = [...equipments];
                    newEquipments[i].item = e.target.value;
                    setEquipments(newEquipments);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Equipment Name"
                />
                <input
                  value={equipment.qty}
                  onChange={(e) => {
                    const newEquipments = [...equipments];
                    newEquipments[i].qty = e.target.value;
                    setEquipments(newEquipments);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Quantity"
                />
                <input
                  value={equipment.catalog || ""}
                  onChange={(e) => {
                    const newEquipments = [...equipments];
                    newEquipments[i].catalog = e.target.value;
                    setEquipments(newEquipments);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Catalog/Model (optional)"
                />
                <input
                  value={equipment.supplier || ""}
                  onChange={(e) => {
                    const newEquipments = [...equipments];
                    newEquipments[i].supplier = e.target.value;
                    setEquipments(newEquipments);
                  }}
                  className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Supplier (optional)"
                />
                {equipments.length > 1 && (
                  <button
                    onClick={() => removeEquipment(i)}
                    className="sm:col-span-4 lg:col-span-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}

            <button
              onClick={addEquipment}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-[#17AA80] rounded-lg text-[#17AA80] text-sm sm:text-base font-medium hover:bg-[#17AA80] hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Equipment
            </button>
          </div>
        </section>

        {/* Full Protocol */}
        <section className="space-y-3 mb-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Full Protocol / Steps
          </h2>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-sm text-red-700">
            Ensure all procedures comply with your institution's safety
            policies. Include all necessary safety precautions.
          </div>
          <textarea
            placeholder="Enter your detailed protocol steps..."
            rows={8}
            className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          />
        </section>

        {/* Notes */}
        <section className="space-y-3 mb-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Notes
          </h2>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              placeholder="Add any additional notes, troubleshooting tips, or important considerations..."
              rows={4}
              className="w-full border border-yellow-300 rounded-lg p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent resize-none"
            />
          </div>
        </section>

        {/* Files & Attachments */}
        <section className="mb-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Files & Attachments
          </h2>

          {/* Upload Area */}
          <div className="mt-4">
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.gif,.webp,.doc,.docx,.xls,.xlsx"
              onChange={handleFileSelect}
              className="hidden"
            />

            <div
              className={`relative border-2 border-dashed rounded-lg p-6 sm:p-8 text-center transition-all duration-200 ${
                isDragging
                  ? "border-blue-400 bg-blue-50 ring-2 ring-blue-200"
                  : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
              }`}
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragEnter={handleDragEnter}
              onDragLeave={handleDragLeave}
              onClick={handleClickUpload}
            >
              <div className="flex flex-col items-center justify-center space-y-3">
                <div
                  className={`p-3 rounded-full transition-colors ${
                    isDragging ? "bg-blue-100" : "bg-blue-50"
                  }`}
                >
                  <Upload
                    className={`w-8 h-8 ${
                      isDragging ? "text-blue-500" : "text-blue-400"
                    }`}
                  />
                </div>

                <div>
                  <p className="text-lg font-medium text-gray-900 mb-1">
                    {isDragging
                      ? "Drop your files here"
                      : "Drop your file or click to browse"}
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports PDF, DOCX, images (max 10MB each)
                  </p>
                  <p className="text-xs text-gray-400 mt-1">
                    Max {uploadedFiles.length + 1} files total
                  </p>
                </div>
              </div>

              {dragCounter > 0 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                  <div className="text-center">
                    <Upload className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-bounce" />
                    <p className="text-blue-600 font-medium">
                      Drop files to upload
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Uploaded Files List */}
          {uploadedFiles.length > 0 && (
            <div className="mt-6">
              <h3 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Uploaded Files ({uploadedFiles.length})
              </h3>

              <div className="space-y-2 max-h-48 overflow-y-auto">
                {uploadedFiles.map((file) => (
                  <div
                    key={file.id}
                    className={`relative p-3 border rounded-lg transition-all ${
                      uploadingFiles.has(file.id)
                        ? "bg-blue-50 border-blue-200"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    {/* File Preview for Images */}
                    {file.preview && (
                      <div className="mb-2">
                        <img
                          src={file.preview}
                          alt={file.name}
                          className="w-16 h-16 object-cover rounded border"
                        />
                      </div>
                    )}

                    {/* File Info */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-sm font-medium text-gray-900 flex items-center gap-2">
                          {getFileIcon(file.type)}
                          <span className="truncate max-w-32 sm:max-w-48">
                            {file.name}
                          </span>
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatFileSize(file.size)}
                        </span>
                      </div>

                      {/* Progress Bar */}
                      {uploadingFiles.has(file.id) && (
                        <div className="flex-1 max-w-xs ml-4">
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                              style={{ width: `${file.uploadProgress || 0}%` }}
                            ></div>
                          </div>
                          <p className="text-xs text-blue-600 mt-1">
                            {file.uploadProgress || 0}% • Uploading...
                          </p>
                        </div>
                      )}

                      {/* Action Buttons */}
                      <div className="flex items-center space-x-2 ml-4">
                        <button
                          onClick={() => {
                            /* Download logic */
                          }}
                          className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                          title="Download"
                        >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => removeFile(file.id)}
                          className="p-1 text-red-400 hover:text-red-600 transition-colors"
                          title="Remove"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Authors & Affiliations */}
        <section className="space-y-4 mb-8">
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              Authors & Affiliations
            </h2>
            <button
              onClick={addAuthor}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-[#17AA80] rounded-lg text-[#17AA80] text-sm sm:text-base font-medium hover:bg-[#17AA80] hover:text-white transition-colors"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
              Add Author
            </button>
          </div>
          {authors.map((author, i) => (
            <div
              key={i}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
            >
              <input
                value={author.fullName}
                onChange={(e) => {
                  const newAuthors = [...authors];
                  newAuthors[i].fullName = e.target.value;
                  setAuthors(newAuthors);
                }}
                placeholder="Full Name"
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                value={author.email}
                onChange={(e) => {
                  const newAuthors = [...authors];
                  newAuthors[i].email = e.target.value;
                  setAuthors(newAuthors);
                }}
                placeholder="Email"
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                value={author.affiliation}
                onChange={(e) => {
                  const newAuthors = [...authors];
                  newAuthors[i].affiliation = e.target.value;
                  setAuthors(newAuthors);
                }}
                placeholder="Affiliation"
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <input
                value={author.orcid}
                onChange={(e) => {
                  const newAuthors = [...authors];
                  newAuthors[i].orcid = e.target.value;
                  setAuthors(newAuthors);
                }}
                placeholder="ORCID"
                className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {authors.length > 1 && (
                <button
                  onClick={() => removeAuthor(i)}
                  className="sm:col-span-4 lg:col-span-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                >
                  Remove
                </button>
              )}
            </div>
          ))}
        </section>

        {/* Consent & Safety */}
        <section className="space-y-3 mb-8">
          <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
            Consent & Safety
          </h2>
          <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I confirm this submission follows my institution's policies and
                allow reviewer access
              </span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                I acknowledge responsibility for safety compliance
              </span>
            </label>
            <label className="flex items-start space-x-3 cursor-pointer">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-200 rounded"
              />
              <span className="text-sm text-gray-700 leading-relaxed">
                No confidential patient information included
              </span>
            </label>
          </div>
        </section>

        <div className="mt-8  flex justify-center mx-auto">
          <button className="w-full sm:w-auto px-6 py-3 bg-[#17AA80] hover:bg-green-700 text-white font-medium rounded-lg transition-colors">
            Submit for Review
          </button>
        </div>
        <p className="text-center mt-4 text-[#636363] ">
          {" "}
          All required fields completed
        </p>
      </div>
    </div>
  );
}
