import {
  Download,
  FileText,
  BarChart3,
  Database,
  Edit,
  Trash2,
} from "lucide-react";
import { useGetAdminDashboardQuery } from "../../../redux/features/admindashboard/admindashboard";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import SectionHeader from "../../../utils/SectionHeading";

const DataExportManagement = () => {
  const { data: adminDashboardData } = useGetAdminDashboardQuery();

  // 🔹 Function to generate PDF
  const handleDownloadPDF = (type: string) => {
    if (!adminDashboardData) return;

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Admin Dashboard Report", 14, 20);

    if (type === "user-data") {
      doc.setFontSize(14);
      doc.text("👥 Users", 14, 30);
      autoTable(doc, {
        startY: 35,
        head: [["Name", "Email", "Role", "Status"]],
        body:
          adminDashboardData?.data?.users?.map((user) => [
            user.fullName,
            user.email,
            user.role,
            user.accountStatus,
          ]) || [],
      });
    }

    if (type === "analytics-report") {
      doc.setFontSize(14);
      doc.text("📊 Overview Analytics", 14, 30);
      autoTable(doc, {
        startY: 35,
        head: [
          [
            "Pending Protocol",
            "Draft Protocol",
            "Total Users",
            "Total Donations",
          ],
        ],
        body: [
          [
            adminDashboardData?.data?.overview?.pendingProtocol || 0,
            adminDashboardData?.data?.overview?.draftProtocol || 0,
            adminDashboardData?.data?.overview?.totalUser || 0,
            adminDashboardData?.data?.overview?.totalDonation || 0,
          ],
        ],
      });
    }

    if (type === "protocol-submissions") {
      doc.setFontSize(14);
      doc.text("📄 Protocol Submissions", 14, 30);
      autoTable(doc, {
        startY: 35,
        head: [["Title", "Category", "Status"]],
        body:
          adminDashboardData?.data?.pendingProtocol?.map((protocol) => [
            protocol.protocolTitle,
            protocol.category,
            protocol.status,
          ]) || [],
      });
    }

    // Save File
    doc.save(`${type}.pdf`);
  };

  const recentExports = [
    {
      icon: FileText,
      title: "User Data Export",
      subtitle: "Generated 2 hours ago • 24 MB",
      id: "user-data",
    },
    {
      icon: BarChart3,
      title: "Monthly Analytics Report",
      subtitle: "Generated 1 day ago • 6.1 MB",
      id: "analytics-report",
    },
    {
      icon: Database,
      title: "Protocol Submissions",
      subtitle: "Generated 3 days ago • 1.8 MB",
      id: "protocol-submissions",
    },
  ];

  const scheduledReports = [
    {
      title: "Weekly User Activity",
      schedule: "Every Monday at 9:00 AM",
      status: "Active",
    },
    {
      title: "Monthly System Health",
      schedule: "First day of month at 8:00 AM",
      status: "Active",
    },
  ];

  return (
    <div className="py-16 mt-10 rounded-xl shadow-sm border border-gray-200 p-6">
      {/* Header */}
      <div className="mb-8">
        <SectionHeader
          title="Data Export & Management"
          subtitle="Export data, manage archives, and schedule reports"
        ></SectionHeader>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Exports Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Recent Exports
          </h2>
          <div className="space-y-4">
            {recentExports.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-emerald-100 rounded-lg">
                      <IconComponent className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div>
                      <h3 className="font-medium text-gray-900">
                        {item.title}
                      </h3>
                      <p className="text-sm text-gray-500">{item.subtitle}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDownloadPDF(item.id)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                  >
                    <Download size={16} />
                    Download
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Scheduled Reports Section */}
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-6">
            Scheduled Reports
          </h2>
          <div className="space-y-4">
            {scheduledReports.map((report, index) => (
              <div
                key={index}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">
                      {report.title}
                    </h3>
                    <p className="text-sm text-gray-500">{report.schedule}</p>
                  </div>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
                    {report.status}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-orange-700 bg-orange-100 rounded-full hover:bg-orange-200 transition-colors">
                    <Edit size={12} className="mr-1" />
                    Edit
                  </button>
                  <button className="inline-flex items-center px-3 py-1.5 text-xs font-medium text-red-700 bg-red-100 rounded-full hover:bg-red-200 transition-colors">
                    <Trash2 size={12} className="mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataExportManagement;
