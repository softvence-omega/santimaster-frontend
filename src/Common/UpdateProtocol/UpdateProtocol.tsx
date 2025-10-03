import { Plus, Upload, X, FileText } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import MDEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { useForm, useFieldArray, type SubmitHandler } from "react-hook-form";
import { v4 as uuidv4 } from "uuid";
import toast from "react-hot-toast";

import {
  useGetProtocolByIdQuery,
  useUpdateProtocolMutation,
} from "../../redux/features/protocols/potocols.api";

interface Material {
  itemName: string;
  quantity: number;
  catalog: string;
  supplier: string;
}

interface Equipment {
  equipmentName: string;
  note: string;
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

interface Author {
  name: string;
}

interface FormData {
  protocolTitle: string;
  protocolDescription: string;
  category: string;
  tags: string;
  technique: string;
  modality: string;
  organism: string;
  phase: string;
  estimatedTime: string;
  difficulty: string;
  bslLevel: string;
  materials: Material[];
  equipments: Equipment[];
  stepProcedure: string;
  notes: string;
  // authors: Author[];
  coAuthors: Author[];
  doiLink: string;
  additionalReference: string;
  license: string;
  isConfirmed: boolean;
  isAcknowledged: boolean;
  isConfidential: boolean;
  image?: File;
  attachment?: File;
}

interface UpdateProtocolProps {
  protocolId: string;
}

export default function UpdateProtocol({ protocolId }: UpdateProtocolProps) {
  const [updateProtocol] = useUpdateProtocolMutation();
  const {
    data: protocol,
    isLoading,
    error,
  } = useGetProtocolByIdQuery(protocolId);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      protocolTitle: "",
      protocolDescription: "",
      category: "",
      tags: "",
      technique: "",
      modality: "",
      organism: "",
      phase: "",
      estimatedTime: "",
      difficulty: "Intermediate",
      bslLevel: "",
      materials: [{ itemName: "", quantity: 0, catalog: "", supplier: "" }],
      equipments: [{ equipmentName: "", note: "" }],
      stepProcedure: "",
      notes: "",
      // authors: [{ name: "" }],
      coAuthors: [],
      doiLink: "",
      additionalReference: "",
      license: "",
      isConfirmed: false,
      isAcknowledged: false,
      isConfidential: false,
      image: undefined,
      attachment: undefined,
    },
  });

  const {
    fields: materialFields,
    append: appendMaterial,
    remove: removeMaterial,
  } = useFieldArray({
    control,
    name: "materials",
  });

  const {
    fields: equipmentFields,
    append: appendEquipment,
    remove: removeEquipment,
  } = useFieldArray({
    control,
    name: "equipments",
  });

  // const {
  //   fields: authorFields,
  //   append: appendAuthor,
  //   remove: removeAuthor,
  // } = useFieldArray({
  //   control,
  //   name: "authors",
  // });

  // const {
  //   fields: coAuthorFields,
  //   append: appendCoAuthor,
  //   remove: removeCoAuthor,
  // } = useFieldArray({
  //   control,
  //   name: "coAuthors",
  // });

  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragCounter, setDragCounter] = useState(0);
  const [uploadingFiles, setUploadingFiles] = useState<Set<string>>(new Set());
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  // Prepopulate form with fetched protocol data
  useEffect(() => {
    if (protocol) {
      reset({
        protocolTitle: protocol.protocolTitle || "",
        protocolDescription: protocol.protocolDescription || "",
        category: protocol.category || "",
        tags: protocol.tags?.join(", ") || "",
        technique: protocol.technique || "",
        modality: protocol.modality || "",
        organism: protocol.organism || "",
        phase: protocol.phase || "",
        estimatedTime: protocol.estimatedTime || "",
        difficulty: protocol.difficulty || "Intermediate",
        bslLevel: protocol.bslLevel || "",
        materials: protocol.materials?.length
          ? protocol.materials
          : [{ itemName: "", quantity: 0, catalog: "", supplier: "" }],
        equipments: protocol.equipment?.length
          ? protocol.equipment
          : [{ equipmentName: "", note: "" }],
        stepProcedure: protocol.stepProcedure || "",
        notes: "",
        // authors: [{ name: "" }],
        coAuthors:
          Array.isArray(protocol.coAuthors) && protocol.coAuthors.length > 0
            ? protocol.coAuthors.map((name) => ({ name }))
            : [],
        doiLink: protocol.doiLink || "",
        additionalReference: protocol.additionalReference || "",
        license: protocol.license || "",
        isConfirmed: protocol.isConfirmed || false,
        isAcknowledged: protocol.isAcknowledged || false,
        isConfidential: protocol.isConfidential || false,
        image: undefined,
        attachment: undefined,
      });

      // Prepopulate uploaded files if attachment exists
      if (protocol.attachment) {
        const extension = protocol.attachment.split(".").pop()?.toLowerCase();
        setUploadedFiles([
          {
            id: uuidv4(),
            name: protocol.attachment.split("/").pop() || protocol.attachment,
            size: 0,
            type:
              extension === "pdf"
                ? "application/pdf"
                : extension === "doc" || extension === "docx"
                ? "application/msword"
                : extension === "xls" || extension === "xlsx"
                ? "application/vnd.ms-excel"
                : "application/octet-stream",
            url: protocol.attachment,
          },
        ]);
      }
    }
  }, [protocol, reset]);

  const categoryOptions = [
    "Gene Editing",
    "Cell Therapy",
    "Molecular Biology",
    "Immunotherapy",
    "Cell Biology",
  ];

  const techniqueOptions = [
    "CRISPR/Cas9",
    "Base Editing",
    "Prime Editing",
    "CAR-T",
    "Aseptic Technique",
  ];

  const modalityOptions = [
    "CAR-T",
    "mRNA",
    "Viral Vector",
    "Lipid Nanoparticle",
    "In-vitro",
  ];

  const phaseOptions = ["Research", "Preclinical", "Clinical", "Experimental"];

  const bslOptions = ["BSL-1", "BSL-2", "BSL-3", "Other"];

  const timeOptions = ["<1h", "1-4h", "1-3d", ">3d"];

  const licenseOptions = ["CC-BY-4.0", "CC-BY-NC-4.0", "MIT", "Other"];

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
    handleFiles(files, event.target === imageInputRef.current);
  };

  const handleDrop = (
    event: React.DragEvent<HTMLDivElement>,
    isImage: boolean
  ) => {
    event.preventDefault();
    setIsDragging(false);
    setDragCounter(0);

    const files = Array.from(event.dataTransfer.files || []);
    handleFiles(files, isImage);
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

  const handleClickUpload = (isImage: boolean) => {
    if (isImage) {
      imageInputRef.current?.click();
    } else {
      fileInputRef.current?.click();
    }
  };

  const handleFiles = (files: File[], isImage: boolean) => {
    const validTypes = isImage
      ? ["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"]
      : [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
        ];
    const maxSize = 10 * 1024 * 1024; // 10MB

    const validFiles = files.filter((file) => {
      if (!validTypes.includes(file.type)) {
        toast.error(
          `File type ${file.name} is not supported. Please upload ${
            isImage ? "images" : "PDF or documents"
          }.`
        );
        return false;
      }

      if (file.size > maxSize) {
        toast.error(`File ${file.name} is too large. Maximum size is 10MB.`);
        return false;
      }

      return true;
    });

    validFiles.forEach((file) => {
      const fileId = uuidv4();
      const newFile: UploadedFile = {
        id: fileId,
        name: file.name,
        size: file.size,
        type: file.type,
        url: URL.createObjectURL(file),
        preview: file.type.startsWith("image/")
          ? URL.createObjectURL(file)
          : undefined,
        uploadProgress: 0,
      };

      setUploadedFiles((prev) => [...prev, newFile]);
      setUploadingFiles((prev) => new Set([...prev, fileId]));

      const progressInterval = setInterval(() => {
        setUploadedFiles((prev) =>
          prev.map((f) =>
            f.id === fileId
              ? {
                  ...f,
                  uploadProgress: Math.min((f.uploadProgress || 0) + 10, 100),
                }
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

        if (isImage) {
          setValue("image", file);
        } else {
          setValue("attachment", file);
        }
      }, 2000);

      if (isImage && imageInputRef.current) {
        imageInputRef.current.value = "";
      } else if (!isImage && fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    });
  };

  const removeFile = (fileId: string) => {
    setUploadedFiles((prev) => {
      const file = prev.find((f) => f.id === fileId);
      if (file) {
        if (file.preview) {
          URL.revokeObjectURL(file.preview);
        }
        if (file.url) {
          URL.revokeObjectURL(file.url);
        }
        if (file.type.startsWith("image/")) {
          setValue("image", undefined);
        } else {
          setValue("attachment", undefined);
        }
      }
      return prev.filter((f) => f.id !== fileId);
    });
  };

  // const onSubmit: SubmitHandler<FormData> = async (data) => {
  //   const protocolData = {
  //     protocolTitle: data.protocolTitle,
  //     protocolDescription: data.protocolDescription,
  //     category: data.category,
  //     tags: data.tags.split(",").map((tag) => tag.trim()).filter(Boolean),
  //     technique: data.technique,
  //     modality: data.modality,
  //     organism: data.organism,
  //     phase: data.phase,
  //     estimatedTime: data.estimatedTime,
  //     difficulty: data.difficulty,
  //     bslLevel: data.bslLevel,
  //     materials: data.materials.map(({ itemName, quantity, catalog, supplier }) => ({
  //       itemName,
  //       quantity: Number(quantity),
  //       catalog: catalog || "",
  //       supplier: supplier || "",
  //     })),
  //     equipment: data.equipments.map(({ equipmentName, note }) => ({
  //       equipmentName,
  //       note,
  //     })),
  //     stepProcedure: data.stepProcedure,
  //     authors: data.authors.map(author => author.name).filter(Boolean),
  //     coAuthors: data.coAuthors.map(author => author.name).filter(Boolean),
  //     doiLink: data.doiLink || "",
  //     additionalReference: data.additionalReference || "",
  //     license: data.license,
  //     isConfirmed: data.isConfirmed,
  //     isAcknowledged: data.isAcknowledged,
  //     isConfidential: data.isConfidential,
  //   };

  //   try {
  //     console.log(protocolData);
  //     const response = await updateProtocol({ id: protocolId, data: protocolData }).unwrap();
  //     toast.success("Protocol updated successfully!");
  //     console.log(response);
  //   } catch (error) {
  //     console.error("Error updating protocol:", error);
  //     toast.error("Error updating protocol");
  //   }
  // };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    // build protocol object
    const protocolData = {
      protocolTitle: data.protocolTitle,
      protocolDescription: data.protocolDescription,
      category: data.category,
      tags: data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean),
      technique: data.technique,
      modality: data.modality,
      organism: data.organism,
      phase: data.phase,
      estimatedTime: data.estimatedTime,
      difficulty: data.difficulty,
      bslLevel: data.bslLevel,
      materials: data.materials.map(
        ({ itemName, quantity, catalog, supplier }) => ({
          itemName,
          quantity: Number(quantity),
          catalog: catalog || "",
          supplier: supplier || "",
        })
      ),
      equipment: data.equipments.map(({ equipmentName, note }) => ({
        equipmentName,
        note,
      })),
      stepProcedure: data.stepProcedure,
      // authors: data.authors.map((author) => author.name).filter(Boolean),
      coAuthors: data.coAuthors.map((author) => author.name).filter(Boolean),
      doiLink: data.doiLink || "",
      additionalReference: data.additionalReference || "",
      license: data.license,
      isConfirmed: data.isConfirmed,
      isAcknowledged: data.isAcknowledged,
      isConfidential: data.isConfidential,
    };

    try {
      const response = await updateProtocol({
        id: protocolId,
        data: protocolData,
      }).unwrap();

      toast.success("Protocol updated successfully!");
      console.log(response);
    } catch (error) {
      console.error("Error updating protocol:", error);
      toast.error("Error updating protocol");
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  if (!protocol) {
    return <div>No protocol found</div>;
  }

  return (
    <div className="py-36 bg-gray-50 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-lg p-4 sm:p-6 lg:p-8">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex justify-between items-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#1C1C1E] mb-6">
              Update Protocol
            </h1>
            <p>Auto-saved at {new Date().toLocaleTimeString()}</p>
          </div>

          {/* Basic Information */}
          <section className="space-y-4 mb-8">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              Basic Information
            </h2>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">
                Protocol Title
              </label>
              <input
                {...register("protocolTitle", {
                  required: "Protocol title is required",
                })}
                placeholder="Enter a descriptive title for your protocol"
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {errors.protocolTitle && (
                <p className="text-red-600 text-sm">
                  {errors.protocolTitle.message}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label className="text-sm font-medium text-gray-700">
                Abstract (Short Description)
              </label>
              <textarea
                {...register("protocolDescription", {
                  required: "Abstract is required",
                  minLength: {
                    value: 10,
                    message: "Abstract must be at least 10 characters",
                  },
                  maxLength: {
                    value: 400,
                    message: "Abstract must not exceed 400 characters",
                  },
                })}
                placeholder="Provide a brief abstract describing your protocol (10-400 characters)"
                rows={3}
                className="w-full border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
              />
              {errors.protocolDescription && (
                <p className="text-red-600 text-sm">
                  {errors.protocolDescription.message}
                </p>
              )}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categoryOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.category && (
                  <p className="text-red-600 text-sm">
                    {errors.category.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Tags
                </label>
                <input
                  {...register("tags", {
                    required: "Tags are required",
                    pattern: {
                      value: /^[\w\s,-]+$/,
                      message: "Tags must be comma-separated words",
                    },
                  })}
                  placeholder="Add tags separated by commas"
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.tags && (
                  <p className="text-red-600 text-sm">{errors.tags.message}</p>
                )}
              </div>
            </div>
          </section>

          {/* Protocol Details */}
          <section className="space-y-4 mb-8">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              Protocol Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Technique
                </label>
                <select
                  {...register("technique", {
                    required: "Technique is required",
                  })}
                  className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select technique</option>
                  {techniqueOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.technique && (
                  <p className="text-red-600 text-sm">
                    {errors.technique.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Modality
                </label>
                <select
                  {...register("modality", {
                    required: "Modality is required",
                  })}
                  className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select modality</option>
                  {modalityOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.modality && (
                  <p className="text-red-600 text-sm">
                    {errors.modality.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Organism / Cell Type
                </label>
                <input
                  {...register("organism", {
                    required: "Organism/Cell Type is required",
                  })}
                  placeholder="Organism / Cell Type"
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.organism && (
                  <p className="text-red-600 text-sm">
                    {errors.organism.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Phase
                </label>
                <select
                  {...register("phase", { required: "Phase is required" })}
                  className="border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Select phase</option>
                  {phaseOptions.map((option) => (
                    <option key={option} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
                {errors.phase && (
                  <p className="text-red-600 text-sm">{errors.phase.message}</p>
                )}
              </div>
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
                      type="button"
                      onClick={() =>
                        setValue("estimatedTime", time, {
                          shouldValidate: true,
                        })
                      }
                      className={`px-3 py-2 border rounded-lg text-sm font-medium transition-colors ${
                        time === control._formValues.estimatedTime
                          ? "bg-green-200 border-green-500 text-[#636363]"
                          : "bg-white border-gray-300 text-gray-700 hover:border-green-300"
                      }`}
                    >
                      {time}
                    </button>
                  ))}
                </div>
                {errors.estimatedTime && (
                  <p className="text-red-600 text-sm">
                    {errors.estimatedTime.message}
                  </p>
                )}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Difficulty
                </label>
                <div className="flex flex-wrap gap-2">
                  {["Easy", "Intermediate", "Hard"].map((level) => (
                    <label
                      key={level}
                      className={`px-3 py-2 border rounded-lg cursor-pointer text-sm font-medium transition-colors ${
                        level === control._formValues.difficulty
                          ? "bg-green-100 border-green-500 text-green-700"
                          : "bg-white text-gray-700 border-gray-300 hover:border-green-300"
                      }`}
                    >
                      <input
                        type="radio"
                        {...register("difficulty", {
                          required: "Difficulty is required",
                        })}
                        value={level}
                        className="hidden"
                      />
                      {level}
                    </label>
                  ))}
                </div>
                {errors.difficulty && (
                  <p className="text-red-600 text-sm">
                    {errors.difficulty.message}
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* Biosafety */}
          <section className="mb-8 bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6">
            <h3 className="text-lg font-medium text-yellow-800 mb-3">
              Biosafety Level Requirement
            </h3>
            <select
              {...register("bslLevel", { required: "BSL Level is required" })}
              className="w-full border border-yellow-300 rounded-lg p-3 mt-2 text-[#636363] focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="">Select BSL level</option>
              {bslOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.bslLevel && (
              <p className="text-red-600 text-sm">{errors.bslLevel.message}</p>
            )}
            <p className="text-sm mt-3 text-yellow-800 leading-relaxed">
              Important: This protocol requires BSL-2+ handling. Detailed
              procedural steps will remain hidden until a reviewer confirms
              compliance.
            </p>
          </section>

          {/* Materials */}
          <section className="space-y-4 mb-8">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              Materials & Equipment
            </h2>
            <h3 className="text-lg font-medium text-[#1C1C1E]">Materials</h3>
            <div className="space-y-3">
              {materialFields.map((material, i) => (
                <div
                  key={material.id}
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 p-3"
                >
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Item Name
                    </label>
                    <input
                      {...register(`materials.${i}.itemName`, {
                        required: "Item name is required",
                      })}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Item Name"
                    />
                    {errors.materials?.[i]?.itemName && (
                      <p className="text-red-600 text-sm">
                        {errors.materials[i].itemName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Quantity
                    </label>
                    <input
                      type="number"
                      {...register(`materials.${i}.quantity`, {
                        required: "Quantity is required",
                        valueAsNumber: true,
                        min: {
                          value: 0,
                          message: "Quantity must be a positive number",
                        },
                      })}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Quantity"
                    />
                    {errors.materials?.[i]?.quantity && (
                      <p className="text-red-600 text-sm">
                        {errors.materials[i].quantity.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Catalog
                    </label>
                    <input
                      {...register(`materials.${i}.catalog`)}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Catalog (optional)"
                    />
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Supplier
                    </label>
                    <input
                      {...register(`materials.${i}.supplier`)}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Supplier (optional)"
                    />
                  </div>
                  {materialFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeMaterial(i)}
                      className="sm:col-span-4 lg:col-span-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendMaterial({
                    itemName: "",
                    quantity: 0,
                    catalog: "",
                    supplier: "",
                  })
                }
                className="flex items-center justify-center gap-2 px-4 py-2 border border-[#17AA80] rounded-lg text-[#17AA80] text-sm font-medium hover:bg-[#17AA80] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Material
              </button>
            </div>
          </section>

          {/* Equipment */}
          <section className="space-y-4 mb-8">
            <h3 className="text-lg font-medium text-[#1C1C1E]">Equipment</h3>
            <div className="space-y-3">
              {equipmentFields.map((equipment, i) => (
                <div
                  key={equipment.id}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 rounded-lg"
                >
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Equipment Name
                    </label>
                    <input
                      {...register(`equipments.${i}.equipmentName`, {
                        required: "Equipment name is required",
                      })}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Equipment Name"
                    />
                    {errors.equipments?.[i]?.equipmentName && (
                      <p className="text-red-600 text-sm">
                        {errors.equipments[i].equipmentName.message}
                      </p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <label className="text-sm font-medium text-gray-700">
                      Note
                    </label>
                    <input
                      {...register(`equipments.${i}.note`, {
                        required: "Note is required",
                      })}
                      className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Note"
                    />
                    {errors.equipments?.[i]?.note && (
                      <p className="text-red-600 text-sm">
                        {errors.equipments[i].note.message}
                      </p>
                    )}
                  </div>
                  {equipmentFields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeEquipment(i)}
                      className="sm:col-span-2 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() =>
                  appendEquipment({
                    equipmentName: "",
                    note: "",
                  })
                }
                className="flex items-center justify-center gap-2 px-4 py-2 border border-[#17AA80] rounded-lg text-[#17AA80] text-sm font-medium hover:bg-[#17AA80] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4" />
                Add Equipment
              </button>
            </div>
          </section>

          {/* Authors & Co-Authors */}
          {/* <section className="space-y-4 mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
                Authors & Co-Authors
              </h2>
              <button
                type="button"
                onClick={() => appendAuthor({ name: "" })}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-[#17AA80] rounded-lg text-[#17AA80] text-sm sm:text-base font-medium hover:bg-[#17AA80] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add Author
              </button>
            </div>
            {authorFields.map((author, i) => (
              <div
                key={author.id}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Author Name
                  </label>
                  <input
                    {...register(`authors.${i}.name`, {
                      required: "Author name is required",
                    })}
                    placeholder="Author Name"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.authors?.[i] && (
                    <p className="text-red-600 text-sm">
                      {errors.authors[i]?.message}
                    </p>
                  )}
                </div>
                {authorFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeAuthor(i)}
                    className="sm:col-span-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mt-4">
              <h3 className="text-lg font-medium text-[#1C1C1E]">Co-Authors</h3>
              <button
                type="button"
                onClick={() => appendCoAuthor({ name: "" })}
                className="flex items-center justify-center gap-2 px-4 py-2 border border-[#17AA80] rounded-lg text-[#17AA80] text-sm sm:text-base font-medium hover:bg-[#17AA80] hover:text-white transition-colors"
              >
                <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                Add Co-Author
              </button>
            </div>
            {coAuthorFields.map((coAuthor, i) => (
              <div
                key={coAuthor.id}
                className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3 border border-gray-200 rounded-lg bg-gray-50"
              >
                <div className="grid gap-2">
                  <label className="text-sm font-medium text-gray-700">
                    Co-Author Name
                  </label>
                  <input
                    {...register(`coAuthors.${i}.name`, {
                      required: "Co-author name is required",
                    })}
                    placeholder="Co-Author Name"
                    className="border border-gray-300 rounded-lg p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  {errors.coAuthors?.[i] && (
                    <p className="text-red-600 text-sm">
                      {errors.coAuthors[i]?.message}
                    </p>
                  )}
                </div>
                {coAuthorFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCoAuthor(i)}
                    className="sm:col-span-1 bg-red-100 text-red-600 px-3 py-1 rounded-md text-sm hover:bg-red-200 transition-colors"
                  >
                    Remove
                  </button>
                )}
              </div>
            ))}
          </section> */}

          {/* Additional References */}
          <section className="space-y-4 mb-8">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              References
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  DOI Link
                </label>
                <input
                  {...register("doiLink", {})}
                  placeholder="https://doi.org/..."
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {errors.doiLink && (
                  <p className="text-red-600 text-sm">
                    {errors.doiLink.message}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <label className="text-sm font-medium text-gray-700">
                  Additional Reference
                </label>
                <input
                  {...register("additionalReference")}
                  placeholder="E.g., Smith J. et al. (2022) Cell Culture Basics"
                  className="border border-gray-300 rounded-lg p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>
          </section>

          {/* License */}
          <section className="space-y-4 mb-8">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              License
            </h2>
            <select
              {...register("license", { required: "License is required" })}
              className="w-full border border-gray-300 rounded-lg p-3 text-[#636363] focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Select license</option>
              {licenseOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            {errors.license && (
              <p className="text-red-600 text-sm">{errors.license.message}</p>
            )}
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
            <div>
              <MDEditor
                value={control._formValues.stepProcedure}
                onChange={({ text }) =>
                  setValue("stepProcedure", text, { shouldValidate: true })
                }
                renderHTML={(text) => Promise.resolve(text)}
                style={{ height: "400px" }}
              />
              {errors.stepProcedure && (
                <p className="text-red-600 text-sm">
                  {errors.stepProcedure.message}
                </p>
              )}
            </div>
          </section>

          {/* Notes */}
          <section className="space-y-3 mb-8">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              Notes
            </h2>
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
              <textarea
                {...register("notes")}
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
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
              {/* Image Upload */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Upload Image
                </h3>
                <input
                  ref={imageInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                    isDragging
                      ? "border-blue-400 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  onDrop={(e) => handleDrop(e, true)}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onClick={() => handleClickUpload(true)}
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
                          ? "Drop your image here"
                          : "Drop your image or click to browse"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports JPG, PNG, GIF, WEBP (max 10MB)
                      </p>
                    </div>
                  </div>
                  {dragCounter > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-bounce" />
                        <p className="text-blue-600 font-medium">
                          Drop image to upload
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Attachment Upload */}
              <div>
                <h3 className="text-sm font-medium text-gray-900 mb-2">
                  Upload Attachment
                </h3>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".pdf,.doc,.docx,.xls,.xlsx"
                  onChange={handleFileSelect}
                  className="hidden"
                />
                <div
                  className={`relative border-2 border-dashed rounded-lg p-6 text-center transition-all duration-200 ${
                    isDragging
                      ? "border-blue-400 bg-blue-50 ring-2 ring-blue-200"
                      : "border-gray-300 hover:border-blue-300 hover:bg-blue-50"
                  }`}
                  onDrop={(e) => handleDrop(e, false)}
                  onDragOver={handleDragOver}
                  onDragEnter={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onClick={() => handleClickUpload(false)}
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
                          ? "Drop your file here"
                          : "Drop your file or click to browse"}
                      </p>
                      <p className="text-sm text-gray-500">
                        Supports PDF, DOCX, XLSX (max 10MB)
                      </p>
                    </div>
                  </div>
                  {dragCounter > 0 && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75">
                      <div className="text-center">
                        <Upload className="w-12 h-12 text-blue-500 mx-auto mb-2 animate-bounce" />
                        <p className="text-blue-600 font-medium">
                          Drop file to upload
                        </p>
                      </div>
                    </div>
                  )}
                </div>
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
                      {file.preview && (
                        <div className="mb-2">
                          <img
                            src={file.preview}
                            alt={file.name}
                            className="w-16 h-16 object-cover rounded border"
                          />
                        </div>
                      )}
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
                        {uploadingFiles.has(file.id) && (
                          <div className="flex-1 max-w-xs ml-4">
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div
                                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                                style={{
                                  width: `${file.uploadProgress || 0}%`,
                                }}
                              />
                            </div>
                            <p className="text-xs text-blue-600 mt-1">
                              {file.uploadProgress || 0}% • Uploading...
                            </p>
                          </div>
                        )}
                        <div className="flex items-center space-x-2 ml-4">
                          <button
                            type="button"
                            onClick={() => window.open(file.url, "_blank")}
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
                            type="button"
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

          {/* Consent & Safety */}
          <section className="space-y-3 mb-8">
            <h2 className="text-lg sm:text-xl font-medium text-[#1C1C1E]">
              Consent & Safety
            </h2>
            <div className="space-y-3 p-4 border border-gray-200 rounded-lg bg-gray-50">
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isConfirmed", {
                    required: "You must confirm institution policies",
                  })}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I confirm this submission follows my institution's policies
                  and allow reviewer access
                </span>
              </label>
              {errors.isConfirmed && (
                <p className="text-red-600 text-sm">
                  {errors.isConfirmed.message}
                </p>
              )}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isAcknowledged", {
                    required: "You must acknowledge safety compliance",
                  })}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  I acknowledge responsibility for safety compliance
                </span>
              </label>
              {errors.isAcknowledged && (
                <p className="text-red-600 text-sm">
                  {errors.isAcknowledged.message}
                </p>
              )}
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register("isConfidential", {
                    required:
                      "You must confirm no confidential patient information is included",
                  })}
                  className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-200 rounded"
                />
                <span className="text-sm text-gray-700 leading-relaxed">
                  No confidential patient information included
                </span>
              </label>
              {errors.isConfidential && (
                <p className="text-red-600 text-sm">
                  {errors.isConfidential.message}
                </p>
              )}
            </div>
          </section>

          <div className="mt-8 flex justify-center mx-auto">
            <button
              type="submit"
              className="w-full sm:w-auto px-6 py-3 bg-[#17AA80] hover:bg-green-700 text-white font-medium rounded-lg transition-colors"
            >
              Update Protocol
            </button>
          </div>
          <p className="text-center mt-4 text-[#636363]">
            All required fields completed
          </p>
        </form>
      </div>
    </div>
  );
}
