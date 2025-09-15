const TechnicalSummary = () => {
  return (
    <div className="min-h-screen  py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Technical Summary & Acceptance Criteria
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Built on modern, scalable technology stack with performance
            guarantees
          </p>
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Technology Stack */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-xl mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    d="M3.5 21C4.978 21 6.131 20.791 7 20.467V22.769C7 23.269 5.985 24 3.5 24C1.015 24 0 23.269 0 22.769V20.505C0.846 20.808 1.991 21 3.5 21ZM21.5 15.049V14C21.5 12.622 20.378 11.5 19 11.5H13V9.99999H14.048C16.238 9.99999 17.832 8.84099 18.107 7.04899C18.229 6.2575 18.0796 5.44801 17.683 4.75224C17.2865 4.05648 16.6662 3.51538 15.923 3.21699C15.538 1.27699 13.784 -0.114012 11.787 0.00598829C9.663 0.116988 8 1.94599 8 4.16999C7.33739 4.40114 6.77736 4.85829 6.41822 5.4612C6.05907 6.06411 5.92375 6.77425 6.036 7.46699C6.257 8.91099 7.577 9.99999 9.108 9.99999H11V11.5H5C4.3372 11.5008 3.70178 11.7644 3.23311 12.2331C2.76444 12.7018 2.50079 13.3372 2.5 14V15.049C0.746 15.216 0 15.805 0 16.231V18.264C0.216 18.471 1.178 19 3.5 19C5.755 19 6.75 18.454 7 18.225V16.231C7 15.805 6.254 15.216 4.5 15.049V14C4.5 13.8674 4.55268 13.7402 4.64645 13.6464C4.74021 13.5527 4.86739 13.5 5 13.5H11V15.049C9.246 15.216 8.5 15.805 8.5 16.231V18.264C8.716 18.471 9.678 19 12 19C14.255 19 15.25 18.454 15.5 18.225V16.231C15.5 15.805 14.754 15.216 13 15.049V13.5H19C19.1326 13.5 19.2598 13.5527 19.3536 13.6464C19.4473 13.7402 19.5 13.8674 19.5 14V15.049C17.746 15.216 17 15.805 17 16.231V18.264C17.216 18.471 18.178 19 20.5 19C22.755 19 23.75 18.454 24 18.225V16.231C24 15.805 23.254 15.216 21.5 15.049ZM17 20.505V22.769C17 23.269 18.015 24 20.5 24C22.985 24 24 23.269 24 22.769V20.467C23.131 20.791 21.978 21 20.5 21C18.991 21 17.846 20.807 17 20.505ZM8.5 20.505V22.769C8.5 23.269 9.515 24 12 24C14.485 24 15.5 23.269 15.5 22.769V20.467C14.631 20.791 13.478 21 12 21C10.491 21 9.346 20.807 8.5 20.505Z"
                    fill="#F5F5F7"
                  />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-gray-900">
                Technology Stack
              </h2>
            </div>

            <div className="space-y-6">
              {[
                {
                  label: "Custom Fields",
                  value: "Advanced Custom Fields (ACF)",
                },
                { label: "Post Types", value: "Custom Post Type (CPT)" },
                { label: "Search & Filter", value: "Search Filter Pro" },
                { label: "Security", value: "reCAPTCHA v3" },
                { label: "Caching", value: "Redis + Object Cache" },
              ].map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
                >
                  <span className="text-[#636363] font-medium">
                    {item.label}
                  </span>
                  <span className="text-[ #1C1C1E] font-semibold text-right">
                    {item.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Targets */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8">
            <div className="flex items-center mb-8">
              <div className="flex items-center justify-center w-12 h-12 bg-emerald-600 rounded-xl mr-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <g clip-path="url(#clip0_125_113)">
                    <path
                      d="M3.5 21C4.978 21 6.131 20.791 7 20.467V22.769C7 23.269 5.985 24 3.5 24C1.015 24 0 23.269 0 22.769V20.505C0.846 20.808 1.991 21 3.5 21ZM21.5 15.049V14C21.5 12.622 20.378 11.5 19 11.5H13V9.99999H14.048C16.238 9.99999 17.832 8.84099 18.107 7.04899C18.229 6.2575 18.0796 5.44801 17.683 4.75224C17.2865 4.05648 16.6662 3.51538 15.923 3.21699C15.538 1.27699 13.784 -0.114012 11.787 0.00598829C9.663 0.116988 8 1.94599 8 4.16999C7.33739 4.40114 6.77736 4.85829 6.41822 5.4612C6.05907 6.06411 5.92375 6.77425 6.036 7.46699C6.257 8.91099 7.577 9.99999 9.108 9.99999H11V11.5H5C4.3372 11.5008 3.70178 11.7644 3.23311 12.2331C2.76444 12.7018 2.50079 13.3372 2.5 14V15.049C0.746 15.216 0 15.805 0 16.231V18.264C0.216 18.471 1.178 19 3.5 19C5.755 19 6.75 18.454 7 18.225V16.231C7 15.805 6.254 15.216 4.5 15.049V14C4.5 13.8674 4.55268 13.7402 4.64645 13.6464C4.74021 13.5527 4.86739 13.5 5 13.5H11V15.049C9.246 15.216 8.5 15.805 8.5 16.231V18.264C8.716 18.471 9.678 19 12 19C14.255 19 15.25 18.454 15.5 18.225V16.231C15.5 15.805 14.754 15.216 13 15.049V13.5H19C19.1326 13.5 19.2598 13.5527 19.3536 13.6464C19.4473 13.7402 19.5 13.8674 19.5 14V15.049C17.746 15.216 17 15.805 17 16.231V18.264C17.216 18.471 18.178 19 20.5 19C22.755 19 23.75 18.454 24 18.225V16.231C24 15.805 23.254 15.216 21.5 15.049ZM17 20.505V22.769C17 23.269 18.015 24 20.5 24C22.985 24 24 23.269 24 22.769V20.467C23.131 20.791 21.978 21 20.5 21C18.991 21 17.846 20.807 17 20.505ZM8.5 20.505V22.769C8.5 23.269 9.515 24 12 24C14.485 24 15.5 23.269 15.5 22.769V20.467C14.631 20.791 13.478 21 12 21C10.491 21 9.346 20.807 8.5 20.505Z"
                      fill="#F5F5F7"
                    />
                  </g>
                  <defs>
                    <clipPath id="clip0_125_113">
                      <rect width="24" height="24" fill="white" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-[#1C1C1E]">
                Performance Targets
              </h2>
            </div>

            {/* Page Load Speed */}
            <div
              className="mb-8 flex flex-col items-start gap-4 p-6 w-full 
            rounded-[12px] border-l-3 border-[#1D6953] 
            bg-[#FAFAFA]"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-3">
                Page Load Speed
              </h3>
              <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                Protocol library pages must load in under 1.5 seconds with 200+
                cached protocols
              </p>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-500">Progress</span>
                <span className="text-sm font-semibold text-gray-700">
                  Target: &lt;1.5s
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div
                  className="bg-emerald-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: "85%" }}
                ></div>
              </div>
            </div>

            {/* Core Web Vitals */}
            <div
              className="mb-8 flex flex-col items-start gap-4 p-6 w-full 
            rounded-[12px] border-l-3 border-[#1D6953] 
            bg-[#FAFAFA]"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Core Web Vitals
              </h3>
              <div className="space-y-4">
                {[
                  {
                    metric: "Largest Contentful Paint (LCP)",
                    value: "<2.5s",
                    status: "good",
                  },
                  {
                    metric: "First Input Delay (FID)",
                    value: "<100ms",
                    status: "good",
                  },
                  {
                    metric: "Cumulative Layout Shift (CLS)",
                    value: "<0.1",
                    status: "good",
                  },
                ].map((vital, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-2"
                  >
                    <span className="text-gray-600 text-sm">
                      {vital.metric}
                    </span>
                    <span className="text-emerald-600 font-semibold text-sm">
                      {vital.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Infrastructure Requirements */}
            <div
              className="flex flex-col items-start gap-4 p-6 w-full 
            rounded-[12px] border-l-3 border-[#1D6953] 
            bg-[#FAFAFA]"
            >
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Infrastructure Requirements
              </h3>
              <div className="space-y-3">
                {[
                  "Staging environment required",
                  "CDN integration (Cloudflare)",
                  "SSL certificate & HTTPS",
                ].map((requirement, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full mr-3"></div>
                    <span className="text-gray-600 text-sm">{requirement}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TechnicalSummary;
