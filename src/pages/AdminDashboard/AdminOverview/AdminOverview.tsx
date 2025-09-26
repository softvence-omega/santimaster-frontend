import { FileText, Users, DollarSign, Shield, Download } from "lucide-react";

const AdminOverview = () => {
  const metrics = [
    {
      icon: FileText,
      value: "47",
      label: "Pending Submissions",
      sublabel: "12 require immediate review",
      change: "+12%",
      changeType: "positive",
    },
    {
      icon: Shield,
      value: "23",
      label: "Draft Protocols",
      sublabel: "8 abandoned > 30 days",
      change: "-3%",
      changeType: "negative",
    },
    {
      icon: Users,
      value: "156",
      label: "New Users",
      sublabel: "34 this week",
      change: "+28%",
      changeType: "positive",
    },
    {
      icon: DollarSign,
      value: "$12.4k",
      label: "Monthly Donations",
      sublabel: "Target: $15k",
      change: "+15%",
      changeType: "positive",
    },
  ];

  return (
    <div className="py-15 ">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              AdminOverview
            </h1>
            <p className="text-gray-600">
              Monitor your biotech research platform's key metrics
            </p>
          </div>
          <button className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
            <Download size={18} />
            Export Report
          </button>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 py-10">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div
                key={index}
                className="bg-[#F5F5F7] rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-3 bg-[#1D6953] rounded-lg">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <span
                    className={`text-sm font-medium px-2 py-1 rounded-full ${
                      metric.changeType === "positive"
                        ? "text-black bg-[#DDE9E5]"
                        : "text-red-700 bg-red-100"
                    }`}
                  >
                    {metric.change}
                  </span>
                </div>

                <div className="space-y-1">
                  <h3 className="text-2xl font-bold text-gray-900">
                    {metric.value}
                  </h3>
                  <p className="text-gray-900 font-medium">{metric.label}</p>
                  <p className="text-gray-500 text-sm">{metric.sublabel}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
