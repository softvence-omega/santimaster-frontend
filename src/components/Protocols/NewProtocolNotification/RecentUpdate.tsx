import communityicon from "../../../assets/icon/community.png";
import libaryicon from "../../../assets/icon/libary.png";
import microrna from "../../../assets/icon/microrna.png";
import SectionHeader from "../../../utils/SectionHeading";

interface UpdateItemProps {
  type: "new" | "updated";
  title: string;
  timeAgo: string;
  description: string;
  author: string;
  institution: string;
  biosafetyLevel: string;
  clinicalPhase: string;
  icon: string;
  authorImg: string;
}

const updates: UpdateItemProps[] = [
  {
    type: "new",
    title: "Advanced CRISPR Base Editing for Sickle Cell Disease",
    timeAgo: "2 hours ago",
    description:
      "A comprehensive protocol for therapeutic base editing in patient-derived hematopoietic stem cells.",
    author: "Dr. James Wilson",
    institution: "Johns Hopkins",
    biosafetyLevel: "2",
    clinicalPhase: "Clinical Phase",
    icon: microrna,
    authorImg: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    type: "updated",
    title: "CAR-T Cell Manufacturing Protocol v2.1",
    timeAgo: "6 hours ago",
    description:
      "Added new quality control checkpoints and updated reagent specifications based on recent FDA guidance.",
    author: "Dr. Sarah Chen",
    institution: "MIT Cancer Center",
    biosafetyLevel: "2",
    clinicalPhase: "Clinical Phase",
    icon: communityicon,
    authorImg: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    type: "new",
    title: "High-Throughput RNA Sequencing Workflow",
    timeAgo: "1 day ago",
    description:
      "Optimized protocol for library preparation and sequencing of small RNA molecules.",
    author: "Dr. Emily Carter",
    institution: "Harvard Medical School",
    biosafetyLevel: "1",
    clinicalPhase: "Pre-Clinical",
    icon: libaryicon,
    authorImg: "https://randomuser.me/api/portraits/women/65.jpg",
  },
];

const NewProtocolNotification = () => {
  return (
    <div className="p-4 rounded-lg">
      <SectionHeader
        title="Recent Updates"
        subtitle="Latest protocol additions and revisions from the community"
      />

      {updates.map((update, idx) => {
        const {
          type,
          title,
          timeAgo,
          description,
          author,
          institution,
          biosafetyLevel,
          clinicalPhase,
          icon,
          authorImg,
        } = update;

        const badgeText = type === "new" ? "New" : "Updated";
        const badgeColor =
          type === "new"
            ? "bg-green-100 text-green-800"
            : "bg-gray-100 text-gray-800";

        return (
          <div
            key={idx}
            className="max-w-6xl mx-auto p-4 rounded-lg shadow mb-4 relative bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              {/* ------icon & title-- */}
              <div className="flex items-center relative">
                <div className="bg-green-800 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                  <img
                    src={icon}
                    alt={title}
                    className="w-6 h-6 object-contain"
                  />
                </div>
                <div className="grid gap-1 ml-3">
                  <h3 className="text-sm font-medium text-gray-900">{title}</h3>
                  <p className="text-xs text-gray-600">{timeAgo}</p>
                </div>
              </div>

              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${badgeColor}`}
              >
                {badgeText}
              </span>
            </div>

            <p className="text-sm text-gray-700 mb-2">{description}</p>

            <div className="flex items-center text-sm text-gray-500">
              <img
                src={authorImg}
                alt={`${author} avatar`}
                className="w-6 h-6 rounded-full mr-2"
              />
              <span>
                {author} - {institution}
              </span>
              <span className="ml-2">BSL-{biosafetyLevel}</span>
              <span className="ml-2">{clinicalPhase}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default NewProtocolNotification;
