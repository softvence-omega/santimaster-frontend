import communityicon from "../../../assets/icon/community.png";
import libaryicon from "../../../assets/icon/libary.png";
import microrna from "../../../assets/icon/microrna.png";
import arrowicon from "../../../assets/icon/arrow.png";
import { Link } from "react-router-dom";
import SectionHeader from "../../../utils/Heading";

const features = [
  {
    id: 1,
    title: "Protocol Library",
    description:
      "Search rigorously reviewed protocols by technique, modality, organism, and phase.",
    icon: libaryicon,
    linkText: "Explore Protocols",
    linkUrl: "",
    isRouterLink: true,
  },
  {
    id: 2,
    title: "AI/mRNA Vision",
    description:
      "See how we'll expand into AI tools and mRNA workflows in the MVP and beyond.",
    icon: microrna,
    linkText: "View MVP Roadmap",
    linkUrl: "#",
    isRouterLink: false,
  },
  {
    id: 3,
    title: "Community",
    description:
      "Join researchers, clinicians, and engineers driving open science forward.",
    icon: communityicon,
    linkText: "Join Community",
    linkUrl: "#",
    isRouterLink: false,
  },
];

const WhatCanWeDo = () => {
  return (
    <div className="max-w-6xl mx-auto px-5 py-16 md:py-24">
      {/* Header Section */}
      <SectionHeader
        title="What you can do here"
        subtitle="Discover, contribute, and collaborate on cutting-edge biotechnology protocols"
      />

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
        {features.map((feature) => {
          return (
            <div
              key={feature.id}
              className="bg-white rounded-xl shadow-sm p-8 flex flex-col transition-all duration-300 hover:-translate-y-2 hover:shadow-xl relative"
            >
              {/*------------- Floating Icon ---------------*/}
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-green-800 rounded-full w-12 h-12 flex items-center justify-center shadow-md">
                <img
                  src={feature.icon}
                  alt={feature.title}
                  className="w-6 h-6 object-contain"
                />
              </div>

              {/* -------Spacer to prevent overlap with icon---------- */}
              <div className="mt-12"></div>

              <h2 className="text-2xl font-semibold text-gray-800 mb-4 text-center">
                {feature.title}
              </h2>
              <p className="text-gray-600 mb-6 flex-grow text-center">
                {feature.description}
              </p>

              {/* ----------Button / Link ------------------*/}
              <Link
                to={feature.linkUrl}
                className="inline-flex gap-3 items-center text-blue-600 font-semibold hover:text-blue-800 transition-colors justify-center"
              >
                <h1 className="text-green-900"> {feature.linkText}</h1>
                <div className="w-8 h-8 bg-green-900 rounded-full flex items-center justify-center">
                  <img
                    src={arrowicon}
                    alt="Arrow"
                    className="w-4 h-4 transition-transform hover:translate-x-1"
                  />
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default WhatCanWeDo;
