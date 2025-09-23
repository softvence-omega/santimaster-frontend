import SectionHeader from "../../utils/SectionHeading";


type Supporter = {
  name: string;
  role?: string;
  timeAgo: string;
  message: string;
  amount: number;
  avatar: string;
};

const supporters: Supporter[] = [
  {
    name: "Dr. Sarah Chen",
    role: "",
    timeAgo: "2 hours ago",
    message: "Proud to support open access to research protocols.",
    amount: 150,
    avatar: "https://i.pravatar.cc/100?img=1", // demo avatar
  },
  {
    name: "Prof. Michael Rodriguez",
    role: "",
    timeAgo: "5 hours ago",
    message:
      "Essential resource for our lab. Happy to contribute to making protocols.",
    amount: 75,
    avatar: "https://i.pravatar.cc/100?img=2",
  },
  {
    name: "Anonymous Donor",
    role: "",
    timeAgo: "1 day ago",
    message: "Keep up the excellent work in advancing open science initiatives.",
    amount: 75,
    avatar: "https://i.pravatar.cc/100?img=3",
  },
];

const RecentSupporters = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-6 py-12">
      {/* Heading */}
      {/* <h2 className="text-2xl md:text-3xl font-bold text-center">
        Recent Supporters
      </h2>
      <p className="text-gray-500 text-center mt-2">
        Join these amazing individuals supporting open science
      </p> */}

<SectionHeader title="Recent Supporters" subtitle=" Join these amazing individuals supporting open science">

</SectionHeader>
      {/* Supporters list */}
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {supporters.map((supporter, index) => (
          <div
            key={index}
            className="bg-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition"
          >
            {/* Header */}
            <div className="flex items-center gap-3">
              <img
                src={supporter.avatar}
                alt={supporter.name}
                className="w-10 h-10 rounded-full"
              />
              <div>
                <p className="font-semibold">{supporter.name}</p>
                <p className="text-gray-500 text-sm">{supporter.timeAgo}</p>
              </div>
            </div>

            {/* Message */}
            <p className="mt-4 text-gray-700 text-sm leading-relaxed">
              "{supporter.message}"
            </p>

            {/* Amount */}
            <p className="mt-4 text-blue-600 font-semibold text-lg">
              ${supporter.amount}
            </p>
          </div>
        ))}
      </div>

      {/* View all link */}
      <div className="text-center mt-8">
        <a
          href="#"
          className="text-blue-600 font-medium hover:underline inline-flex items-center"
        >
          View all supporters →
        </a>
      </div>
    </section>
  );
};

export default RecentSupporters;
