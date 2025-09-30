import { useState } from "react";
import SectionHeader from "../../../utils/SectionHeading";

export default function FaqRoadmap() {
  const [isOpen, setIsOpen] = useState<number | null>(null);
  const dataArr = [
    {
      title: "How often do you update the roadmap?",
      description:
        "We review and update the roadmap on a regular cadence — typically quarterly for major milestones and monthly for minor adjustments. Public updates are published whenever milestone dates or priorities change. Each update includes a short changelog so you can see what moved and why.",
    },
    {
      title: "What's the review timeline for submitted protocols?",
      description:
        "After submission you’ll receive an acknowledgement within 48 hours. Initial triage usually happens within 3–5 business days. A full review depends on complexity but typically takes 2–6 weeks; reviewers may request revisions which can extend the timeline. We provide status updates during the process and offer expedited review for high-priority submissions when possible.",
    },
    {
      title: "How can I request a feature or suggest improvements?",
      description:
        "Use our feature request channel (feature form or issue tracker) and include a short title, a detailed description, the problem you’re solving, expected behavior, and any example data or mockups. You can also suggest ideas in the community forum or email support. Requests are triaged and prioritized by the product team; community upvotes help signal importance.",
    },
    {
      title: "What happens if a milestone is delayed or blocked?",
      description:
        "If a milestone is delayed or blocked we mark it accordingly and publish a short status note that explains the root cause, impact, and mitigation plan. The product team re-evaluates priorities and timelines, and we communicate the revised ETA to stakeholders via the roadmap page and release notes. Contributions (PRs or proposals) that address the blocker are welcomed.",
    },
    {
      title: "Will there be API access for institutional integration?",
      description:
        "Yes — API access is planned. The API will offer authenticated endpoints (API keys / OAuth), proper rate limiting, and documentation for common integration scenarios. For institutional or enterprise needs (higher rate limits, SLAs, custom integrations), contact our support/sales team to discuss access and timelines.",
    },
    {
      title: "How do you prioritize features in the roadmap?",
      description:
        "We prioritize using a mix of user impact, strategic alignment, technical effort, and compliance/risks. Inputs include product metrics, user feedback, community votes, and business priorities. The product and engineering teams run regular triage sessions to score and schedule work — this keeps the roadmap both data-driven and responsive to user needs.",
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
