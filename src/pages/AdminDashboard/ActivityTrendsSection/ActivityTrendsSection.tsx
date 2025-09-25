import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import * as Chart from "chart.js";

// Register Chart.js components
Chart.Chart.register(
  Chart.CategoryScale,
  Chart.LinearScale,
  Chart.PointElement,
  Chart.LineElement,
  Chart.Title,
  Chart.Tooltip,
  Chart.Legend,
  Chart.Filler
);

const ActivityTrendsSection = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart.Chart | null>(null);
  const [chartKey, setChartKey] = useState(0);

  const activities = [
    {
      title:
        'Protocol "DNA Sequencing Optimization" was approved by Dr. Sarah Chen',
      time: "2 minutes ago",
    },
    {
      title: "New researcher Dr. Emily Johnson joined the platform",
      time: "15 minutes ago",
    },
    {
      title: 'Protocol revision requested for "Cell Culture Techniques"',
      time: "1 hour ago",
    },
    {
      title: "Monthly analytics report generated successfully",
      time: "3 hours ago",
    },
    {
      title: "Security alert: Multiple failed login attempts detected",
      time: "5 hours ago",
    },
  ];

  useEffect(() => {
    const initChart = () => {
      if (!chartRef.current) return;

      const ctx = chartRef.current.getContext("2d");
      if (!ctx) return;

      // Destroy existing chart instance if it exists
      if (chartInstanceRef.current) {
        chartInstanceRef.current.destroy();
        chartInstanceRef.current = null;
      }

      // Small delay to ensure cleanup is complete
      setTimeout(() => {
        try {
          // Sample data for the chart
          const chartData = {
            labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
            datasets: [
              {
                label: "Submissions",
                data: [25, 30, 28, 35],
                borderColor: "#ef4444",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                fill: true,
                tension: 0.4,
                pointBackgroundColor: "#ef4444",
                pointBorderColor: "#ffffff",
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 6,
              },
            ],
          };

          const config: Chart.ChartConfiguration = {
            type: "line",
            data: chartData,
            options: {
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  backgroundColor: "rgba(0, 0, 0, 0.8)",
                  titleColor: "#ffffff",
                  bodyColor: "#ffffff",
                  borderColor: "#ef4444",
                  borderWidth: 1,
                },
              },
              scales: {
                x: {
                  grid: {
                    display: false,
                  },
                  border: {
                    display: false,
                  },
                  ticks: {
                    color: "#6b7280",
                    font: {
                      size: 12,
                    },
                  },
                },
                y: {
                  display: false,
                  min: 15,
                  max: 45,
                },
              },
              elements: {
                line: {
                  borderWidth: 2,
                },
              },
            },
          };

          if (chartRef.current) {
            chartInstanceRef.current = new Chart.Chart(
              chartRef.current,
              config
            );
          }
        } catch (error) {
          console.error("Error creating chart:", error);
          // If there's still an error, try recreating the canvas
          setChartKey((prev) => prev + 1);
        }
      }, 10);
    };

    initChart();

    // Cleanup function
    return () => {
      if (chartInstanceRef.current) {
        try {
          chartInstanceRef.current.destroy();
          chartInstanceRef.current = null;
        } catch (error) {
          console.error("Error destroying chart:", error);
        }
      }
    };
  }, [chartKey]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 py-16">
      {/* Recent Activity Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Activity
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Latest platform events and user actions
            </p>
          </div>
          <button className="text-emerald-600 hover:text-emerald-700 font-medium text-sm transition-colors">
            View All
          </button>
        </div>

        <div className="space-y-4">
          {activities.map((activity, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="flex-shrink-0 mt-1">
                <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                  <div className="w-2 h-2 bg-emerald-600 rounded-full"></div>
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-gray-900 text-sm font-medium leading-relaxed">
                  {activity.title}
                </p>
                <p className="text-gray-500 text-xs mt-1">{activity.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Submission Trends Section */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Submission Trends
            </h2>
            <p className="text-gray-600 text-sm mt-1">
              Protocol submissions over time
            </p>
          </div>
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors">
            <span>Last 30 days</span>
            <ChevronDown size={16} className="text-gray-500" />
          </div>
        </div>

        {/* Chart Container */}
        <div className="h-48 mb-6">
          <canvas ref={chartRef} key={chartKey}></canvas>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">342</div>
            <div className="text-gray-600 text-sm">Total Submissions</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">89%</div>
            <div className="text-gray-600 text-sm">Approval Rate</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-900">4.2</div>
            <div className="text-gray-600 text-sm">Avg Review Days</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityTrendsSection;
