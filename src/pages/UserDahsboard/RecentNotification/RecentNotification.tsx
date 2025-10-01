interface Protocol {
  _id: string;
  protocolTitle: string;
  status: "DRAFT" | "PENDING" | "PUBLISHED" | "REJECTED";
  createdAt: string;
}

interface RecentNotificationProps {
  protocols?: {
    draft?: Protocol[];
    pending?: Protocol[];
    published?: Protocol[];
    rejected?: Protocol[];
  };
}

const RecentNotification = ({ protocols }: RecentNotificationProps) => {
  const notifications = [
    ...(protocols?.published?.map((p) => ({
      id: p._id,
      type: "approved" as const,
      title: "Protocol Approved",
      description: `Your protocol "${p.protocolTitle}" has been approved and published.`,
      time: new Date(p.createdAt).toLocaleString(),
    })) || []),
    ...(protocols?.pending?.map((p) => ({
      id: p._id,
      type: "review" as const,
      title: "Review Required",
      description: `Your protocol "${p.protocolTitle}" is pending review.`,
      time: new Date(p.createdAt).toLocaleString(),
    })) || []),
  ].slice(0, 5);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Notifications</h2>
        <button className="text-emerald-600 text-sm hover:underline">
          View All
        </button>
      </div>

      {notifications.length === 0 ? (
        <p className="text-gray-500 text-sm">No recent notifications</p>
      ) : (
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
      )}
    </div>
  );
};

export default RecentNotification;
