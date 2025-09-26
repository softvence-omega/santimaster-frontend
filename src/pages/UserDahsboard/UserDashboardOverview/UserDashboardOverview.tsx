import SectionHeader from "../../../utils/SectionHeading";

export default function UserDashboardOverview() {
  return (
    <div className=" py-20">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-[#E8F0EE] via-[#80AB9E] to-[#1D6953] text-white rounded-b-xl shadow p-6 flex justify-between items-center">
        <div>
          <SectionHeader
            title="Welcome back, Dr. Chen!"
            subtitle="You have protocols pending review and new notifications.  "
          ></SectionHeader>
          <button className="mt-4 px-4 py-2 bg-[#17AA80] text-white font-medium rounded-lg shadow hover:bg-gray-100 transition">
            Browse Protocols
          </button>
        </div>
        <div className="grid items-center gap-4 ml-3">
          <img
            src="https://www.ultimatebeaver.com/wp-content/uploads/bb-plugin/cache/photo-gallery-img-02-circle.jpg"
            alt="Dr. Sarah Chen"
            className="w-20 h-20 rounded-full border-2 border-white shadow"
          />
          <div className="">
            <p className="font-medium">Dr. Sarah Chen</p>
            <p className="text-sm">Senior Research Scientist</p>
            <p className="text-xs">MIT Synthetic Biology Lab</p>
            <p className="text-xs">ORCID: 0000-0002-1825-0097</p>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6">
        {[
          { title: "Draft Protocols", value: 7, sub: "12.5% ready" },
          { title: "Under Review", value: 3, sub: "Avg. 5 days" },
          { title: "Published", value: 12, sub: "95% approval rate" },
          { title: "Total Views", value: 12, sub: "170% this month" },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-[#F5F5F7] rounded-xl ga-2 shadow p-4 text-center hover:shadow-md transition"
          >
            <p className="text-3xl font-bold text-emerald-600">{item.value}</p>
            <p className="mt-1 font-medium">{item.title}</p>
            <p className="text-sm text-gray-500">{item.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
