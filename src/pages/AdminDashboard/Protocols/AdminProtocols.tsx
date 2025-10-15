import { Edit } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { useDeleteProtocolMutation, useGetAllProtocolsQuery } from "../../../redux/features/protocols/potocols.api";

export type ResearchProtocol = {
    _id: string;
    protocolTitle: string;
    protocolDescription: string;
    category: string;
    phase: string;
    modality: string;
    technique: string;
    organism: string;
    bslLevel: string;
    difficulty: string;
    estimatedTime: string;
    status: "DRAFT" | "PUBLISHED" | "ARCHIVED" | string; // extendable
    license: string;
    doiLink?: string;
    additionalReference?: string;
    attachment?: string;

    authors: string; // likely user ID string
    coAuthors: string[];

    materials: {
        itemName: string;
        quantity: number;
        catalog: string;
        supplier: string;
    }[];

    equipment: {
        equipmentName: string;
        note: string;
    }[];

    tags: string[];

    isAcknowledged: boolean;
    isConfidential: boolean;
    isConfirmed: boolean;

    createdAt: string; // ISO date string
    updatedAt: string; // ISO date string
}


export default function AdminProtocols() {
    const { data, isLoading } = useGetAllProtocolsQuery(undefined);
    const [deleteProtocolById] = useDeleteProtocolMutation()

    console.log(data)

    const getRiskLevelStyle = (riskLevel: string) => {
        switch (riskLevel) {
            case "IRB-1":
            case "IRB-2":
            case "IRB-3":
                return "bg-red-100 text-red-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };
    const deleteProtocol = async (protocolId: string) => {
        if (!window.confirm("Are you sure you want to delete this protocol?"))
            return;
        const id = toast.loading("Deleting...");
        const res = await deleteProtocolById(protocolId).unwrap();
        console.log(res)
        if (res?.success) {
            toast.success(res?.message, { id });
        } else {
            toast.error(res?.message, { id });
        }
    };
    return (
        <div className="py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">

            {/* Submissions List */}
            {isLoading ? (
                <div>
                    {Array.from({ length: 6 }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-lg p-4 bg-gray-200 animate-pulse w-full mx-auto mt-4"
                        >
                            <div className="flex space-x-4 py-4">
                                <div className="flex-1 space-y-4 py-1">
                                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                    <div className="space-y-2">
                                        <div className="h-4 bg-gray-300 rounded"></div>
                                        <div className="h-4 bg-gray-300 rounded w-5/6"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="space-y-4 shadow-sm">
                    {(data?.data || [] as ResearchProtocol[])?.map((submission) => (
                        <div
                            key={submission?._id}
                            className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
                        >
                            {/* Title and Priority */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-3 gap-2">
                                <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                                    {submission?.protocolTitle}
                                </h3>
                                <div className="flex items-center gap-2 flex-shrink-0">
                                    <span
                                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelStyle(
                                            submission?.difficulty
                                        )}`}
                                    >
                                        {submission?.bslLevel}
                                    </span>
                                </div>
                            </div>

                            {/* Submission Details */}
                            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                                <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        {submission?.authors?.fullName}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        {submission?.createdAt}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                                        {submission?.category}
                                    </span>
                                </div>

                                {/* ----action button ---- */}
                                <div className="flex items-center gap-3 sm:gap-4">
                                    <Link
                                        to={`/update-protocol/${submission?._id}`}
                                        title="Edit Protocol"
                                    >
                                        <Edit className="w-5 h-5 text-blue-600 hover:text-blue-800" />
                                    </Link>
                                    <button
                                        onClick={() => deleteProtocol(submission?._id)}
                                        className="bg-red-700 cursor-pointer hover:bg-emerald-700 text-white px-3 sm:px-4 py-2 rounded-lg font-medium text-xs sm:text-sm transition-colors"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}
