import { Heart, Award, FileText, Users } from "lucide-react";

const SupportMission: React.FC = () => {
  // JSON data for donation benefits
  const donationBenefits = [
    {
      id: 1,
      text: "Fund platform development and maintenance",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0C15.2024 0.0568338 18.2541 1.3461 20.4983 3.59035C22.7426 5.8346 24 8.85444 24 12C24 15.1456 22.7426 18.1654 20.4983 20.4096C18.2541 22.6539 15.2024 23.9432 12 24C8.7976 23.9432 5.74592 22.6539 3.50167 20.4096C1.25742 18.1654 0 15.1456 0 12C0 8.85444 1.25742 5.8346 3.50167 3.59035C5.74592 1.3461 8.7976 0.0568338 12 0ZM9.46248 15.8981L6.47012 12.9567C6.22518 12.7153 6.08764 12.3885 6.08764 12.0477C6.08764 11.7069 6.22518 11.38 6.47012 11.1386C6.7163 10.8983 7.04931 10.7634 7.39642 10.7634C7.74353 10.7634 8.07653 10.8983 8.32272 11.1386L10.4307 13.2114L15.6773 8.05878C15.9231 7.81822 16.2559 7.68315 16.6029 7.68315C16.9499 7.68315 17.2828 7.81822 17.5286 8.05878C17.7732 8.30033 17.9105 8.62716 17.9105 8.96784C17.9105 9.30852 17.7732 9.63534 17.5286 9.8769L11.355 15.9399C11.2297 16.0624 11.0804 16.1587 10.9163 16.2231C10.7521 16.2875 10.5764 16.3187 10.3997 16.3148C10.2229 16.3109 10.0488 16.272 9.88777 16.2004C9.72672 16.1288 9.58207 16.026 9.46248 15.8981Z"
            fill="#FF3B30"
          />
        </svg>
      ),
    },
    {
      id: 2,
      text: "Support independent protocol audits",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0C15.2024 0.0568338 18.2541 1.3461 20.4983 3.59035C22.7426 5.8346 24 8.85444 24 12C24 15.1456 22.7426 18.1654 20.4983 20.4096C18.2541 22.6539 15.2024 23.9432 12 24C8.7976 23.9432 5.74592 22.6539 3.50167 20.4096C1.25742 18.1654 0 15.1456 0 12C0 8.85444 1.25742 5.8346 3.50167 3.59035C5.74592 1.3461 8.7976 0.0568338 12 0ZM9.46248 15.8981L6.47012 12.9567C6.22518 12.7153 6.08764 12.3885 6.08764 12.0477C6.08764 11.7069 6.22518 11.38 6.47012 11.1386C6.7163 10.8983 7.04931 10.7634 7.39642 10.7634C7.74353 10.7634 8.07653 10.8983 8.32272 11.1386L10.4307 13.2114L15.6773 8.05878C15.9231 7.81822 16.2559 7.68315 16.6029 7.68315C16.9499 7.68315 17.2828 7.81822 17.5286 8.05878C17.7732 8.30033 17.9105 8.62716 17.9105 8.96784C17.9105 9.30852 17.7732 9.63534 17.5286 9.8769L11.355 15.9399C11.2297 16.0624 11.0804 16.1587 10.9163 16.2231C10.7521 16.2875 10.5764 16.3187 10.3997 16.3148C10.2229 16.3109 10.0488 16.272 9.88777 16.2004C9.72672 16.1288 9.58207 16.026 9.46248 15.8981Z"
            fill="#FF3B30"
          />
        </svg>
      ),
    },
    {
      id: 3,
      text: "Enable community outreach programs",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0C15.2024 0.0568338 18.2541 1.3461 20.4983 3.59035C22.7426 5.8346 24 8.85444 24 12C24 15.1456 22.7426 18.1654 20.4983 20.4096C18.2541 22.6539 15.2024 23.9432 12 24C8.7976 23.9432 5.74592 22.6539 3.50167 20.4096C1.25742 18.1654 0 15.1456 0 12C0 8.85444 1.25742 5.8346 3.50167 3.59035C5.74592 1.3461 8.7976 0.0568338 12 0ZM9.46248 15.8981L6.47012 12.9567C6.22518 12.7153 6.08764 12.3885 6.08764 12.0477C6.08764 11.7069 6.22518 11.38 6.47012 11.1386C6.7163 10.8983 7.04931 10.7634 7.39642 10.7634C7.74353 10.7634 8.07653 10.8983 8.32272 11.1386L10.4307 13.2114L15.6773 8.05878C15.9231 7.81822 16.2559 7.68315 16.6029 7.68315C16.9499 7.68315 17.2828 7.81822 17.5286 8.05878C17.7732 8.30033 17.9105 8.62716 17.9105 8.96784C17.9105 9.30852 17.7732 9.63534 17.5286 9.8769L11.355 15.9399C11.2297 16.0624 11.0804 16.1587 10.9163 16.2231C10.7521 16.2875 10.5764 16.3187 10.3997 16.3148C10.2229 16.3109 10.0488 16.272 9.88777 16.2004C9.72672 16.1288 9.58207 16.026 9.46248 15.8981Z"
            fill="#FF3B30"
          />
        </svg>
      ),
    },
    {
      id: 4,
      text: "Provide grants for underrepresented researchers",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0C15.2024 0.0568338 18.2541 1.3461 20.4983 3.59035C22.7426 5.8346 24 8.85444 24 12C24 15.1456 22.7426 18.1654 20.4983 20.4096C18.2541 22.6539 15.2024 23.9432 12 24C8.7976 23.9432 5.74592 22.6539 3.50167 20.4096C1.25742 18.1654 0 15.1456 0 12C0 8.85444 1.25742 5.8346 3.50167 3.59035C5.74592 1.3461 8.7976 0.0568338 12 0ZM9.46248 15.8981L6.47012 12.9567C6.22518 12.7153 6.08764 12.3885 6.08764 12.0477C6.08764 11.7069 6.22518 11.38 6.47012 11.1386C6.7163 10.8983 7.04931 10.7634 7.39642 10.7634C7.74353 10.7634 8.07653 10.8983 8.32272 11.1386L10.4307 13.2114L15.6773 8.05878C15.9231 7.81822 16.2559 7.68315 16.6029 7.68315C16.9499 7.68315 17.2828 7.81822 17.5286 8.05878C17.7732 8.30033 17.9105 8.62716 17.9105 8.96784C17.9105 9.30852 17.7732 9.63534 17.5286 9.8769L11.355 15.9399C11.2297 16.0624 11.0804 16.1587 10.9163 16.2231C10.7521 16.2875 10.5764 16.3187 10.3997 16.3148C10.2229 16.3109 10.0488 16.272 9.88777 16.2004C9.72672 16.1288 9.58207 16.026 9.46248 15.8981Z"
            fill="#FF3B30"
          />
        </svg>
      ),
    },
  ];

  // JSON data for donor benefits
  const donorBenefits = [
    {
      id: 1,
      title: "Recognition",
      description: "Donor badge on profile and acknowledgment in publications",
      icon: "award",
    },
    {
      id: 2,
      title: "Impact Reports",
      description:
        "Regular updates on how your contribution is making a difference",
      icon: "report",
    },
    {
      id: 3,
      title: "Community Access",
      description:
        "Exclusive access to donor community and early feature previews",
      icon: "community",
    },
  ];

  const getIcon = (iconType: string, size: number = 20) => {
    const iconProps = { size, className: "text-red-500" };

    switch (iconType) {
      case "heart":
        return <Heart {...iconProps} fill="currentColor" />;
      case "award":
        return <Award size={size} className="text-gray-700" />;
      case "report":
        return <FileText size={size} className="text-gray-700" />;
      case "community":
        return <Users size={size} className="text-gray-700" />;
      default:
        return <Heart {...iconProps} fill="currentColor" />;
    }
  };

  return (
    <div className=" py-26 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">
            Support Our Mission
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Your contribution accelerates genetic research and democratizes
            access to scientific protocols
          </p>
        </div>

        {/* Main Content Section */}
        <div className="bg-red-50 rounded-2xl p-8 sm:p-12 mb-12">
          <div className="flex flex-col lg:flex-row items-start justify-between gap-12">
            {/* Left Side - Why Donations Matter */}
            <div className="flex-1 bg-[#FFF5F5]">
              <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-8">
                Why Donations Matter
              </h2>

              <div className="space-y-4">
                {donationBenefits.map((benefit) => (
                  <div key={benefit.id} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">{benefit.icon}</div>
                    <span className="text-gray-700 text-lg leading-relaxed">
                      {benefit.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Side - Donation Button and Heart Icon */}
            <div className="flex-shrink-0 text-center">
              <div className="mb-6">
                <div className="w-20 h-20  rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="25"
                    height="25"
                    viewBox="0 0 25 25"
                    fill="none"
                  >
                    <g clip-path="url(#clip0_171_3740)">
                      <path
                        d="M10.208 13.05C9.96515 12.8258 9.67526 12.6587 9.35954 12.561C9.04382 12.4632 8.71024 12.4372 8.38319 12.485C8.05615 12.5327 7.74391 12.6529 7.4693 12.8369C7.19468 13.0208 6.96465 13.2637 6.796 13.548C6.308 14.358 6.446 15.403 7.041 16.137L8.829 18.441C8.9095 18.5447 8.96878 18.6633 9.00345 18.79C9.03812 18.9166 9.04751 19.0489 9.03107 19.1791C9.01464 19.3094 8.9727 19.4352 8.90766 19.5493C8.84262 19.6633 8.75575 19.7635 8.652 19.844C8.54826 19.9245 8.42967 19.9838 8.30302 20.0184C8.17637 20.0531 8.04412 20.0625 7.91384 20.046C7.65073 20.0129 7.41158 19.8765 7.249 19.667L5.461 17.363C4.339 15.98 4.176 14.018 5.083 12.515C5.20623 12.3146 5.3457 12.1246 5.5 11.947V6.10298C5.5 4.79498 4.559 3.60398 3.258 3.47298C2.90977 3.43685 2.55784 3.47426 2.22499 3.58279C1.89215 3.69132 1.5858 3.86855 1.3258 4.103C1.0658 4.33745 0.857947 4.6239 0.715691 4.94379C0.573434 5.26368 0.499951 5.60988 0.5 5.95998L0.5 16.507C0.5 18.641 1.353 20.687 2.869 22.19L4.661 23.965C5.031 24.308 5.516 24.498 6.021 24.498H13.5C13.7652 24.498 14.0196 24.3926 14.2071 24.2051C14.3946 24.0175 14.5 23.7632 14.5 23.498V19.678C14.5 18.859 14.3323 18.0487 14.0072 17.2969C13.6822 16.5452 13.2067 15.868 12.61 15.307L10.208 13.049V13.05ZM21.742 3.47498C20.441 3.60498 19.5 4.79698 19.5 6.10498V11.949C19.651 12.126 19.793 12.312 19.917 12.517C20.823 14.02 20.661 15.982 19.539 17.365L16.501 20.389V23.501C16.501 23.853 16.429 24.187 16.317 24.501H18.981C19.4853 24.5011 19.9711 24.3108 20.341 23.968L22.131 22.196C22.8823 21.4521 23.4786 20.5666 23.8856 19.5908C24.2925 18.615 24.5021 17.5682 24.502 16.511V5.96198C24.5021 5.61188 24.4286 5.26568 24.2863 4.94579C24.1441 4.6259 23.9362 4.33945 23.6762 4.105C23.4162 3.87055 23.1099 3.69332 22.777 3.58479C22.4442 3.47626 22.0922 3.43885 21.744 3.47498H21.742ZM18.204 13.549C18.0354 13.2647 17.8053 13.0218 17.5307 12.8379C17.2561 12.6539 16.9439 12.5337 16.6168 12.486C16.2898 12.4382 15.9562 12.4642 15.6405 12.562C15.3247 12.6597 15.0349 12.8268 14.792 13.051L13.96 13.833L13.98 13.852C15.1106 14.9246 15.9039 16.3035 16.263 17.82L17.958 16.138C18.553 15.404 18.691 14.358 18.203 13.549H18.204ZM17.503 3.25098C17.503 5.41398 14.683 8.10198 13.278 9.22898C13.0581 9.40506 12.7847 9.501 12.503 9.501C12.2213 9.501 11.9479 9.40506 11.728 9.22898C10.323 8.10098 7.503 5.41398 7.503 3.25098C7.47119 2.55513 7.71643 1.87503 8.18499 1.35961C8.65356 0.844181 9.30728 0.535436 10.003 0.500977C10.6987 0.535436 11.3524 0.844181 11.821 1.35961C12.2896 1.87503 12.5348 2.55513 12.503 3.25098C12.4712 2.55513 12.7164 1.87503 13.185 1.35961C13.6536 0.844181 14.3073 0.535436 15.003 0.500977C15.6987 0.535436 16.3524 0.844181 16.821 1.35961C17.2896 1.87503 17.5348 2.55513 17.503 3.25098Z"
                        fill="#FF3B30"
                      />
                    </g>
                    <defs>
                      <clipPath id="clip0_171_3740">
                        <rect
                          width="24"
                          height="24"
                          fill="white"
                          transform="translate(0.5 0.5)"
                        />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>

              <button className="bg-red-500 hover:bg-red-600 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl">
                Donate Now
              </button>
            </div>
          </div>
        </div>

        {/* Donor Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8  ">
          {donorBenefits.map((benefit) => (
            <div key={benefit.id} className="bg-[#FAFAFA] rounded-xl p-6  ">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                  {getIcon(benefit.icon, 20)}
                </div>
                <h3 className="text-xl font-semibold text-[#1C1C1E]">
                  {benefit.title}
                </h3>
              </div>

              <p className="text-gray-600 leading-relaxed">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SupportMission;
