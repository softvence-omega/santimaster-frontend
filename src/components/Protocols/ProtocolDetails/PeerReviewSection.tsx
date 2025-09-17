import { CheckCircle, Clock, FileText, User } from "lucide-react";

const PeerReviewSection = () => {
  // Review Status Data
  const reviews = [
    {
      id: 1,
      reviewer: "Dr. Michael Rodriguez",
      status: "Approved",
      date: "March 14, 2024",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
    {
      id: 2,
      reviewer: "Dr. Lisa Wang",
      status: "Approved",
      date: "March 13, 2024",
      statusColor: "text-green-600",
      statusBg: "bg-green-100",
    },
  ];

  // Version History Data
  const versions = [
    {
      version: "2.1",
      status: "Current",
      description: "Updated reagent concentrations",
      date: "March 15, 2024",
      statusColor: "text-blue-600",
      statusBg: "bg-blue-100",
    },
    {
      version: "2.0",
      status: "Previous",
      description: "Major revision with updated methodology",
      date: "February 18, 2024",
      statusColor: "text-gray-600",
      statusBg: "bg-gray-100",
    },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-12">
      {/* Peer Review & Version History Section */}
      <section>
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Peer Review & Version History
        </h2>

        <div className="bg-gray-50 rounded-xl p-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Review Status */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <User className="w-5 h-5" />
                Review Status
              </h3>
              <div className="space-y-3">
                {reviews.map((review) => (
                  <div
                    key={review.id}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span className="font-medium text-gray-900">
                          {review.reviewer}
                        </span>
                      </div>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${review.statusBg} ${review.statusColor}`}
                      >
                        {review.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Reviewed {review.date}
                    </p>
                  </div>
                ))}

                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center justify-center gap-1 py-2">
                  <FileText className="w-4 h-4" />
                  View Full Review History
                </button>
              </div>
            </div>

            {/* Version History */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <Clock className="w-5 h-5" />
                Version History
              </h3>
              <div className="space-y-3">
                {versions.map((version, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-lg p-4 shadow-sm"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-gray-900">
                        Version {version.version}
                      </span>
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-medium ${version.statusBg} ${version.statusColor}`}
                      >
                        {version.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 mb-1">
                      {version.description}
                    </p>
                    <p className="text-xs text-gray-500">
                      Published {version.date}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PeerReviewSection;
