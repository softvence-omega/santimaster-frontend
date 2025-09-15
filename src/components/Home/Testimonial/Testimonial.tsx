import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import SectionHeader from "../../../utils/SectionHeading";

const testimonials = [
  {
    quote:
      "OpenGene has revolutionized how we share protocols in our lab. The peer review process ensures quality while the open format accelerates collaboration.",
    name: "Dr. Sarah Chen",
    title: "CRISPR Researcher, MIT",
    image:
      "https://www.ultimatebeaver.com/wp-content/uploads/bb-plugin/cache/photo-gallery-img-02-circle.jpg",
  },
  {
    quote:
      "The reproducibility of protocols on OpenGene is outstanding. We've successfully implemented multiple AAV production protocols with consistent results.",
    name: "Marcus Rodriguez",
    title: "Gene Therapy Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    quote:
      "As a junior researcher, OpenGene has been invaluable for learning established techniques and contributing my own improvements to the community.",
    name: "Dr. Emma Thompson",
    title: "CAR-T Researcher, UCSF",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    quote:
      "OpenGene has revolutionized how we share protocols in our lab. The peer review process ensures quality while the open format accelerates collaboration.",
    name: "Dr. Sarah Chen",
    title: "CRISPR Researcher, MIT",
    image:
      "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    quote:
      "The reproducibility of protocols on OpenGene is outstanding. We've successfully implemented multiple AAV production protocols with consistent results.",
    name: "Marcus Rodriguez",
    title: "Gene Therapy Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    quote:
      "The reproducibility of protocols on OpenGene is outstanding. We've successfully implemented multiple AAV production protocols with consistent results.",
    name: "Marcus Rodriguez",
    title: "Gene Therapy Lead",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
  {
    quote:
      "As a junior researcher, OpenGene has been invaluable for learning established techniques and contributing my own improvements to the community.",
    name: "Dr. Emma Thompson",
    title: "CAR-T Researcher, UCSF",
    image:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=150&h=150&q=80",
  },
];

const StarRating = () => (
  <div className="flex space-x-1 mt-1">
    {[...Array(5)].map((_, i) => (
      <svg
        key={i}
        className="w-4 h-4 text-yellow-400 fill-current"
        viewBox="0 0 24 24"
      >
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const Testimonial = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerSlide = 3;

  const totalSlides = Math.ceil(testimonials.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto relative">
        {/* Header */}
        <div className="text-center mb-12">
          <SectionHeader
            title="Trusted by Researchers Worldwide"
            subtitle="See what leading scientists are saying about OpenGene"
          />
        </div>

        {/* Carousel */}
        <div className="relative">
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2 bg-white rounded-full shadow hover:bg-gray-100 z-10"
          >
            <ChevronRight className="w-6 h-6 text-gray-700" />
          </button>

          {/* Slides */}
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {testimonials.map((t, index) => (
                <div key={index} className="flex-shrink-0 w-full md:w-1/3 px-4">
                  <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-100 relative h-full flex flex-col justify-between">
                    <div className="text-emerald-600 mb-4">
                      <svg
                        className="w-12 h-12"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                      </svg>
                    </div>
                    <blockquote className="text-gray-700 text-lg leading-relaxed mb-6">
                      "{t.quote}"
                    </blockquote>
                    <div className="flex items-center">
                      <img
                        src={t.image}
                        alt={t.name}
                        className="w-16 h-16 rounded-full object-cover mr-4 ring-4 ring-emerald-100"
                      />
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">
                          {t.name}
                        </h4>
                        <p className="text-gray-600 text-sm">{t.title}</p>
                        <StarRating />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Dots */}
        <div className="flex justify-center mt-6 space-x-2">
          {Array.from({ length: totalSlides }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`w-3 h-3 rounded-full ${
                idx === currentIndex ? "bg-emerald-600" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Testimonial;
