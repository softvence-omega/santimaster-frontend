import { useState } from "react";
import SectionHeader from "../../../utils/SectionHeading";

export default function FaqMvp() {
  const [isOpen, setIsOpen] = useState<number | null>(null);
const dataArr = [
  {
    title: "Who can submit protocols to Open Gene?",
    description:
      "Any registered researcher, student, or contributor with relevant scientific protocols can submit. Submissions should meet our community guidelines and include enough detail for reproducibility.",
  },
  {
    title: "How long does the review process take?",
    description:
      "On average, the initial review takes 2–3 weeks, depending on complexity and reviewer availability. Some protocols may require revisions, which can extend the timeline. We provide status updates throughout the process.",
  },
  {
    title: "What file types and formats are allowed?",
    description:
      "We currently accept protocols in text-based formats (Markdown, DOCX, PDF) and support associated data files such as CSV, XLSX, or images (PNG, JPG). Large datasets can be linked externally if needed.",
  },
  {
    title: "How can I donate to support Open Gene?",
    description:
      "You can donate securely via our donations page using credit card, PayPal, or bank transfer. Monthly and one-time contributions are available, and all funds go directly toward platform development and community support.",
  },
  {
    title: "Will there be API access for institutional integration?",
    description:
      "Yes. We are developing an API for institutions to integrate submissions, reviews, and protocol data directly into their systems. Early access will be available to partners, with full documentation at launch.",
  },
  {
    title: "What are the next steps after MVP launch?",
    description:
      "Following MVP launch, we plan to expand protocol categories, introduce collaborative tools, release API access, and roll out advanced search and recommendation features. Feedback from early users will guide the roadmap.",
  },
];
  

  const toggle = (idx: number) => {
    setIsOpen((prevIdx) => (prevIdx === idx ? null : idx));
  };

  return (
    <div className="mx-auto w-full py-14 max-w-[500px] rounded-lg">
      <SectionHeader
        title="Frequently Asked Questions"
        subtitle="Everything you need to know about the MVP"
      ></SectionHeader>
      {dataArr.map((PerAccordion, idx) => (
        <div
          key={idx}
          className="my-2 rounded-lg  bg-[#F5F5F7] p-3 py-3 *:mix-blend-difference "
        >
          <button
            onClick={() => toggle(idx)}
            className="flex h-full w-full items-center justify-between font-medium text-white outline-none"
          >
            <span>{PerAccordion.title}</span>
            <span className="rounded-full">
              <svg
                className="ml-8 size-3 shrink-0 fill-white"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  y="5"
                  width="12"
                  height="2"
                  rx="1"
                  className={`origin-center transform transition duration-200 ease-out ${
                    isOpen === idx && "!rotate-180"
                  }`}
                />
                <rect
                  y="5"
                  width="12"
                  height="2"
                  rx="1"
                  className={`origin-center rotate-90 transform transition duration-200 ease-out ${
                    isOpen === idx && "!rotate-180"
                  }`}
                />
              </svg>
            </span>
          </button>
          <div
            className={`grid overflow-hidden text-zinc-400 transition-all duration-300 ease-in-out ${
              isOpen === idx
                ? "grid-rows-[1fr] pb-1 pt-3 opacity-100"
                : "grid-rows-[0fr] opacity-0"
            }`}
          >
            <div className="overflow-hidden pr-4 text-sm">
              {PerAccordion.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
