import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const Dashboard = () => {
  const activities = [
    {
      text: "Protocol 'DNA Sequencing Optimization' was approved by Dr. Sarah Chen",
      time: "2 minutes ago",
      icon: "📋",
    },
    {
      text: "New researcher Dr. Emily Johnson joined the platform",
      time: "15 minutes ago",
      icon: "👥",
    },
    {
      text: "Protocol revision requested for 'Cell Culture Techniques'",
      time: "1 hour ago",
      icon: "📝",
    },
    {
      text: "Monthly analytics report generated successfully",
      time: "3 hours ago",
      icon: "📊",
    },
    {
      text: "Security alert: Multiple failed login attempts detected",
      time: "3 hours ago",
      icon: "🔒",
    },
  ];

  const chartData = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        data: [
          22, 25, 27, 24, 22, 25, 28, 26, 24, 22, 25, 28, 30, 32, 28, 25, 28,
          32, 35,
        ],
        borderColor: "#ef4444",
        backgroundColor: "rgba(239, 68, 68, 0.1)",
        fill: true,
        tension: 0.4,
        borderWidth: 2,
        pointRadius: 3,
        pointBackgroundColor: "#ef4444",
        pointBorderColor: "#ffffff",
        pointBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: false,
        grid: {
          display: false,
        },
      },
      y: {
        display: false,
        grid: {
          display: false,
        },
        min: 15,
        max: 40,
      },
    },
    elements: {
      point: {
        hoverRadius: 0,
      },
    },
    interaction: {
      intersect: false,
      mode: "index" as const,
    },
  };

  return (
    <div className=" py-16 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Activity Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Recent Activity
                </h2>
                <p className="text-sm text-gray-500">
                  Latest platform events and user actions
                </p>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                View All
              </button>
            </div>

            <div className="space-y-4">
              {activities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="flex-shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <div className="w-4 h-4 bg-green-600 rounded-sm flex items-center justify-center">
                      <div className="w-2 h-2 bg-white rounded-sm"></div>
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 font-medium leading-5">
                      {activity.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Submission Trends Section */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Submission Trends
                </h2>
                <p className="text-sm text-gray-500">
                  Protocol submissions over time
                </p>
              </div>
              <select className="text-sm border border-gray-300 rounded-md px-3 py-1 bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                <option>Last 30 days</option>
                <option>Last 7 days</option>
                <option>Last 90 days</option>
              </select>
            </div>

            {/* Chart */}
            <div className="h-48 mb-8">
              <Line data={chartData} options={chartOptions} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">342</div>
                <div className="text-sm text-gray-500">Total Submissions</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">89%</div>
                <div className="text-sm text-gray-500">Approval Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">4.2</div>
                <div className="text-sm text-gray-500">Avg Review Days</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
