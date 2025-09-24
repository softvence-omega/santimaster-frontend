import { useState } from "react";

interface Notification {
  id: number;
  type: "approved" | "review";
  title: string;
  description: string;
  time: string;
}
const RecentNotification = () => {
    const [notifications] = useState<Notification[]>([
    {
      id: 1,
      type: "approved",
      title: "Protocol Approved",
      description:
        "Your protocol 'CRISPR-Cas9 Gene Editing in E. coli' has been approved and published.",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "review",
      title: "Review Required",
      description:
        "Protocol 'Protein Purification Workflow' needs revision. Reviewer comments available.",
      time: "1 day ago",
    },
  ]);

  return (
    <div>
      <div className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Recent Notifications</h2>
          <button className="text-emerald-600 text-sm hover:underline">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {notifications.map((n) => (
            <div
              key={n.id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-md transition"
            >
              <p className="font-semibold text-gray-800">{n.title}</p>
              <p className="text-sm text-gray-600 mt-1">{n.description}</p>
              <p className="text-xs text-gray-400 mt-2">{n.time}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RecentNotification;
