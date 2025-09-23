import React from "react";
import { Check } from "lucide-react";
import SectionHeader from "../../utils/SectionHeading";

interface SponsorshipTier {
  id: string;
  name: string;
  price: number;
  commitment: string;
  bgColor: string;
  iconColor: string;
  priceColor: string;
  benefits: string[];
}

const sponsorshipTiers: SponsorshipTier[] = [
  {
    id: "bronze",
    name: "Bronze Sponsor",
    price: 5000,
    commitment: "Annual commitment",
    bgColor: "bg-orange-100",
    iconColor: "bg-orange-500",
    priceColor: "text-orange-500",
    benefits: [
      "Logo on website footer",
      "Quarterly impact reports",
      "Social media recognition",
      "Tax deduction certificate",
    ],
  },
  {
    id: "silver",
    name: "Silver Sponsor",
    price: 15000,
    commitment: "Annual commitment",
    bgColor: "bg-slate-200",
    iconColor: "bg-slate-600",
    priceColor: "text-slate-600",
    benefits: [
      "All Bronze benefits",
      "Logo on protocol pages",
      "Newsletter mentions",
      "Conference booth partnership",
    ],
  },
  {
    id: "gold",
    name: "Gold Sponsor",
    price: 50000,
    commitment: "Annual commitment",
    bgColor: "bg-yellow-100",
    iconColor: "bg-yellow-500",
    priceColor: "text-yellow-600",
    benefits: [
      "All Gold benefits",
      "Homepage logo placement",
      "Dedicated blog post",
      "Custom integration options",
    ],
  },
];

const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

const SponsorshipCard: React.FC<{ tier: SponsorshipTier }> = ({ tier }) => {
  return (
    <div
      className={`${tier.bgColor} rounded-3xl p-8 h-full flex flex-col shadow-sm`}
    >
      {/* Icon */}
      <div className="flex justify-center mb-8">
        <div
          className={`${tier.iconColor} rounded-2xl w-20 h-20 flex items-center justify-center shadow-sm`}
        >
          <div className="text-white text-3xl">🧬</div>
        </div>
      </div>

      {/* Title */}
      <h3 className="text-3xl font-bold text-gray-800 text-center mb-6">
        {tier.name}
      </h3>

      {/* Price */}
      <div className={`${tier.priceColor} text-6xl font-bold text-center mb-2`}>
        {formatPrice(tier.price)}
      </div>

      {/* Commitment */}
      <p className="text-gray-600 text-center mb-10 text-lg">
        {tier.commitment}
      </p>

      {/* Benefits */}
      <div className="flex-1">
        <ul className="space-y-5">
          {tier.benefits.map((benefit, index) => (
            <li key={index} className="flex items-start gap-4">
              <Check className="text-green-600 w-6 h-6 mt-0.5 flex-shrink-0 stroke-2" />
              <span className="text-gray-700 text-lg leading-relaxed">
                {benefit}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const CorporateSponsorship: React.FC = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          
          <SectionHeader
            title="Corporate Sponsorship"
            subtitle="Partner with Open Gene to advance open science research and gain visibility in
            the scientific community"
          ></SectionHeader>
        </div>

        {/* Sponsorship Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {sponsorshipTiers.map((tier) => (
            <SponsorshipCard key={tier.id} tier={tier} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CorporateSponsorship;
