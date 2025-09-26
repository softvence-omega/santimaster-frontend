const PriorityReviewQueue = () => {
  const submissions = [
    {
      id: "1",
      title: "CRISPR-Cas9 Gene Editing Protocol for Neurological Disorders",
      author: "Dr. Michael Rodriguez",
      submittedTime: "Submitted 2 days ago",
      category: "Gene Therapy",
      riskLevel: "IRB-2",
      priority: "High Priority",
      priorityColor: "bg-orange-100 text-orange-800",
    },
    {
      id: "2",
      title: "Synthetic Biology Approach to Cancer Immunotherapy",
      author: "Dr. Lisa Zhang",
      submittedTime: "Submitted 3 days ago",
      category: "Synthetic Biology",
      riskLevel: "IRB-3",
      priority: "Standard",
      priorityColor: "bg-gray-100 text-gray-800",
    },
    {
      id: "3",
      title: "Protein Folding Analysis using Machine Learning",
      author: "Dr. James Wilson",
      submittedTime: "Submitted 1 week ago",
      category: "Computational Biology",
      riskLevel: "IRB-1",
      priority: "",
      priorityColor: "",
    },
  ];

  const getRiskLevelStyle = (riskLevel: string) => {
    switch (riskLevel) {
      case "IRB-1":
        return "bg-red-100 text-red-800";
      case "IRB-2":
        return "bg-red-100 text-red-800";
      case "IRB-3":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="py-16  p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            Priority Review Queue
          </h1>
          <p className="text-gray-600">
            Submissions requiring immediate attention
          </p>
        </div>
        <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
          View All
        </button>
      </div>

      {/* Submissions List */}
      <div className="space-y-4 shadow-sm">
        {submissions.map((submission) => (
          <div
            key={submission.id}
            className="border border-gray-200 rounded-lg p-5 hover:border-gray-300 hover:shadow-sm transition-all"
          >
            {/* Title and Priority */}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-lg font-semibold text-gray-900 leading-tight pr-4">
                {submission.title}
              </h3>
              <div className="flex items-center gap-2 flex-shrink-0">
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRiskLevelStyle(
                    submission.riskLevel
                  )}`}
                >
                  {submission.riskLevel}
                </span>
                {submission.priority && (
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${submission.priorityColor}`}
                  >
                    {submission.priority}
                  </span>
                )}
              </div>
            </div>

            {/* Submission Details */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {submission.author}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {submission.submittedTime}
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                  {submission.category}
                </span>
              </div>

              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium text-sm transition-colors">
                Approve
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer Actions */}
      <div className="mt-6 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-600">
            Showing 3 of 12 priority submissions
          </div>
          <div className="flex gap-2">
            <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
              Bulk Review
            </button>
            <button className="px-4 py-2 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors">
              Export Queue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PriorityReviewQueue;
