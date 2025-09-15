import scientificimg from "../../../assets/Homeimg/scientificDiscovery.png";
import SectionHeader from "../../../utils/SectionHeading";

const ScientificDiscovery = () => {
  return (
    <div className="bg-[#E8F0EE] min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-12">
      {/* Section Header */}
      <SectionHeader
        title="Accelerating Scientific Discovery"
        subtitle="Our open-source approach is transforming how researchers collaborate and share knowledge"
      />

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-12 text-center">
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D6953]">
            250+
          </h2>
          <p className="text-[#636363] text-sm sm:text-base">
            Protocols Published
          </p>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D6953]">45</h2>
          <p className="text-[#636363] text-sm sm:text-base">
            Countries Represented
          </p>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D6953]">
            1,200+
          </h2>
          <p className="text-[#636363] text-sm sm:text-base">
            Active Researchers
          </p>
        </div>
        <div>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#1D6953]">98%</h2>
          <p className="text-[#636363] text-sm sm:text-base">
            Reproducibility Rate
          </p>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 md:gap-24 w-full max-w-7xl">
        {/* Left Content */}
        <div className="text-left max-w-md w-full">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-barlow font-semibold text-[#0A251D] mb-4">
            Peer Review That Works
          </h2>

          <ul className="space-y-4 text-gray-600">
            <li className="flex items-start">
              <span className="text-green-700 mt-1 mr-2">✔</span>
              <div>
                <h4 className="font-semibold">Expert Review Process</h4>
                <p className="mt-1 text-gray-600">
                  Every protocol undergoes rigorous peer review by domain
                  experts.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-700 mt-1 mr-2">✔</span>
              <div>
                <h4 className="font-semibold">Reproducibility Testing</h4>
                <p className="mt-1 text-gray-600">
                  Independent labs validate protocols before publication.
                </p>
              </div>
            </li>
            <li className="flex items-start">
              <span className="text-green-700 mt-1 mr-2">✔</span>
              <div>
                <h4 className="font-semibold">Continuous Updates</h4>
                <p className="mt-1 text-gray-600">
                  Protocols evolve with community feedback and improvements.
                </p>
              </div>
            </li>
          </ul>
        </div>

        {/* Right Image Section */}
        <div className="relative w-full md:w-auto flex justify-center md:justify-end">
          <img
            src={scientificimg}
            alt="Scientific Discovery"
            className="rounded-lg shadow-lg w-full md:w-[500px] lg:w-[600px]"
          />

          {/* Content Card */}
          <div className="absolute -bottom-10 -left-4 sm:-left-8 md:-left-32 w-64 sm:w-72 p-6 flex flex-col items-center gap-4 rounded-lg shadow-md bg-[#1D6953] text-white">
            {/* SVG Icon */}
            <div className="flex items-center justify-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
              >
                <g clip-path="url(#clip0_100_373)">
                  <path
                    d="M23.333 15.833C23.333 17.6713 21.838 19.1663 19.9996 19.1663C18.1613 19.1663 16.6663 17.6713 16.6663 15.833C16.6663 13.9946 18.1613 12.4996 19.9996 12.4996C21.838 12.4996 23.333 13.9946 23.333 15.833ZM35.2796 13.6946C34.9143 13.024 34.3887 12.4543 33.7496 12.0363C32.6763 11.343 32.1046 10.068 32.388 8.82295C32.5568 8.06135 32.5293 7.26932 32.308 6.52129C32.0979 5.80839 31.7124 5.15952 31.1869 4.63399C30.6614 4.10847 30.0125 3.72304 29.2996 3.51295C28.5521 3.29169 27.7607 3.26416 26.9996 3.43295C25.753 3.71629 24.478 3.14629 23.7846 2.07129C23.3673 1.43227 22.7981 0.906613 22.128 0.541286C21.4751 0.186087 20.7437 0 20.0005 0C19.2572 0 18.5258 0.186087 17.873 0.541286C17.2025 0.906158 16.6332 1.43191 16.2163 2.07129C15.523 3.14462 14.248 3.71629 13.0013 3.43295C12.2402 3.26416 11.4488 3.29169 10.7013 3.51295C9.98839 3.72304 9.33952 4.10847 8.814 4.63399C8.28847 5.15952 7.90304 5.80839 7.69296 6.52129C7.4717 7.26934 7.44417 8.06135 7.61295 8.82295C7.89629 10.0696 7.32462 11.3446 6.25129 12.0363C5.61143 12.4534 5.08559 13.0233 4.72129 13.6946C4.36111 14.3529 4.17577 15.0926 4.18295 15.843C4.17962 16.588 4.35795 17.333 4.72129 17.9913C5.11962 18.7096 5.64962 19.2596 6.25129 19.6496C7.32462 20.343 7.89629 21.618 7.61295 22.863C7.45129 23.578 7.46129 24.358 7.69296 25.1663C7.90304 25.8792 8.28847 26.5281 8.814 27.0536C9.33952 27.5791 9.98839 27.9645 10.7013 28.1746C11.508 28.4063 12.288 28.4163 13.0013 28.2546C14.248 27.9713 15.523 28.5413 16.2163 29.6163C16.6046 30.218 17.1546 30.748 17.873 31.1463C18.5258 31.5015 19.2572 31.6876 20.0005 31.6876C20.7437 31.6876 21.4751 31.5015 22.128 31.1463C22.8463 30.748 23.3963 30.218 23.7846 29.6163C24.478 28.543 25.753 27.9713 26.9996 28.2546C27.713 28.4163 28.493 28.4063 29.2996 28.1746C30.0125 27.9645 30.6614 27.5791 31.1869 27.0536C31.7124 26.5281 32.0979 25.8792 32.308 25.1663C32.5396 24.3596 32.5496 23.578 32.388 22.863C32.1046 21.6163 32.6763 20.3413 33.7496 19.6496C34.353 19.2613 34.8813 18.7096 35.2796 17.9913C35.6446 17.3346 35.8213 16.588 35.818 15.843C35.8242 15.0927 35.6389 14.3533 35.2796 13.6946ZM19.9813 22.503C16.3046 22.503 13.3146 19.513 13.3146 15.8363C13.3146 12.1596 16.3046 9.16962 19.9813 9.16962C23.658 9.16962 26.648 12.1596 26.648 15.8363C26.648 19.513 23.658 22.503 19.9813 22.503ZM13.5013 31.553C12.2654 31.7886 10.9913 31.7287 9.78295 31.378C8.60915 31.0341 7.53308 30.4181 6.64225 29.58C5.75141 28.7418 5.07098 27.7053 4.65629 26.5546L0.812954 30.2596C-0.807046 31.823 0.137954 34.5663 2.37795 34.798L5.31962 35.1013L5.68295 37.7146C5.98129 39.8663 8.60129 40.7613 10.1546 39.243L15.823 33.7496C14.9013 33.158 14.1013 32.443 13.5013 31.553ZM24.178 33.7496L29.8463 39.243C31.3996 40.7613 34.0196 39.8663 34.318 37.7146L34.6813 35.1013L37.623 34.798C39.863 34.5663 40.808 31.823 39.188 30.2596L35.3446 26.5546C34.9299 27.7053 34.2495 28.7418 33.3587 29.58C32.4678 30.4181 31.3918 31.0341 30.218 31.378C29.0096 31.7287 27.7355 31.7886 26.4996 31.553C25.8996 32.443 25.0996 33.158 24.178 33.7496Z"
                    fill="#F5F5F7"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_100_373">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </div>
            <h3 className="text-xl text-center text-[#F5F5F7] font-semibold">
              Quality Assured
            </h3>
            <p className="text-sm text-center text-[#F5F5F7]">
              Every protocol meets our rigorous standards for clarity, safety,
              and reproducibility.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificDiscovery;
