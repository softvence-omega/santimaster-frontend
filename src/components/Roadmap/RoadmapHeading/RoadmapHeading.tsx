import RoadmapHeadingimg from "../../../assets/Roadmap/roadmap.png";
import SectionHeader from "../../../utils/SectionHeading";
const RoadmapHeading = () => {
  return (
    <div className="py-32">
      {/* -------heading--------- */}
      <div className="mx-w-xl justify-items-start">
        <div>
          <SectionHeader
            title="Product RoadmapHeading"
            subtitle="Here's What we're building and when — starting With the MVP and expanding in
phases. Our commitment to transparency drives everything we do."
          ></SectionHeader>
        </div>

        {/* --------right flow stepper--------------- */}
        <div className="p-4 rounded-lg flex flex-col md:flex-row items-center justify-center gap-4">
          {/* -------submit----------- */}
          <button className="text-[#1C1C1E] p-2 rounded-2xl bg-[#DDE9E5] flex items-center">
            <span className="">Planned</span>
          </button>
          {/* --------arrow-------- */}
          <span className="text-[#1D6953] rotate-90 md:rotate-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="24"
              viewBox="0 0 39 24"
              fill="none"
            >
              <path
                d="M37.57 9.90999L31.2812 5.99999C31.1302 5.90626 30.9505 5.83187 30.7524 5.7811C30.5544 5.73033 30.342 5.70419 30.1275 5.70419C29.913 5.70419 29.7006 5.73033 29.5026 5.7811C29.3045 5.83187 29.1248 5.90626 28.9737 5.99999C28.6711 6.18735 28.5012 6.44081 28.5012 6.70499C28.5012 6.96918 28.6711 7.22263 28.9737 7.40999L34.7587 11H1.625C1.19402 11 0.780698 11.1053 0.475951 11.2929C0.171205 11.4804 0 11.7348 0 12C0 12.2652 0.171205 12.5196 0.475951 12.7071C0.780698 12.8946 1.19402 13 1.625 13H34.8562L28.9737 16.61C28.8214 16.703 28.7005 16.8136 28.618 16.9354C28.5355 17.0573 28.4931 17.188 28.4931 17.32C28.4931 17.452 28.5355 17.5827 28.618 17.7046C28.7005 17.8264 28.8214 17.937 28.9737 18.03C29.1248 18.1237 29.3045 18.1981 29.5026 18.2489C29.7006 18.2997 29.913 18.3258 30.1275 18.3258C30.342 18.3258 30.5544 18.2997 30.7524 18.2489C30.9505 18.1981 31.1302 18.1237 31.2812 18.03L37.57 14.15C38.4829 13.5875 38.9957 12.825 38.9957 12.03C38.9957 11.235 38.4829 10.4725 37.57 9.90999Z"
                fill="#1D6953"
              />
            </svg>
          </span>
          {/* ---------------upload---------------- */}
          <button className="text-[#1C1C1E] p-2 rounded-2xl bg-[#DDE9E5] flex items-center">
            <span className="ml-2">In Progress</span>
          </button>
          {/* ---------published------------- */}
          {/* ----arrow-- */}
          <span className="text-[#1D6953] rotate-90 md:rotate-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="24"
              viewBox="0 0 39 24"
              fill="none"
            >
              <path
                d="M37.57 9.90999L31.2812 5.99999C31.1302 5.90626 30.9505 5.83187 30.7524 5.7811C30.5544 5.73033 30.342 5.70419 30.1275 5.70419C29.913 5.70419 29.7006 5.73033 29.5026 5.7811C29.3045 5.83187 29.1248 5.90626 28.9737 5.99999C28.6711 6.18735 28.5012 6.44081 28.5012 6.70499C28.5012 6.96918 28.6711 7.22263 28.9737 7.40999L34.7587 11H1.625C1.19402 11 0.780698 11.1053 0.475951 11.2929C0.171205 11.4804 0 11.7348 0 12C0 12.2652 0.171205 12.5196 0.475951 12.7071C0.780698 12.8946 1.19402 13 1.625 13H34.8562L28.9737 16.61C28.8214 16.703 28.7005 16.8136 28.618 16.9354C28.5355 17.0573 28.4931 17.188 28.4931 17.32C28.4931 17.452 28.5355 17.5827 28.618 17.7046C28.7005 17.8264 28.8214 17.937 28.9737 18.03C29.1248 18.1237 29.3045 18.1981 29.5026 18.2489C29.7006 18.2997 29.913 18.3258 30.1275 18.3258C30.342 18.3258 30.5544 18.2997 30.7524 18.2489C30.9505 18.1981 31.1302 18.1237 31.2812 18.03L37.57 14.15C38.4829 13.5875 38.9957 12.825 38.9957 12.03C38.9957 11.235 38.4829 10.4725 37.57 9.90999Z"
                fill="#1D6953"
              />
            </svg>
          </span>
          <button className="text-[#1C1C1E] p-2 rounded-2xl bg-[#DDE9E5] flex items-center">
            <span className="">Complete</span>
          </button>

          <span className="text-[#1D6953] rotate-90 md:rotate-0">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="39"
              height="24"
              viewBox="0 0 39 24"
              fill="none"
            >
              <path
                d="M37.57 9.90999L31.2812 5.99999C31.1302 5.90626 30.9505 5.83187 30.7524 5.7811C30.5544 5.73033 30.342 5.70419 30.1275 5.70419C29.913 5.70419 29.7006 5.73033 29.5026 5.7811C29.3045 5.83187 29.1248 5.90626 28.9737 5.99999C28.6711 6.18735 28.5012 6.44081 28.5012 6.70499C28.5012 6.96918 28.6711 7.22263 28.9737 7.40999L34.7587 11H1.625C1.19402 11 0.780698 11.1053 0.475951 11.2929C0.171205 11.4804 0 11.7348 0 12C0 12.2652 0.171205 12.5196 0.475951 12.7071C0.780698 12.8946 1.19402 13 1.625 13H34.8562L28.9737 16.61C28.8214 16.703 28.7005 16.8136 28.618 16.9354C28.5355 17.0573 28.4931 17.188 28.4931 17.32C28.4931 17.452 28.5355 17.5827 28.618 17.7046C28.7005 17.8264 28.8214 17.937 28.9737 18.03C29.1248 18.1237 29.3045 18.1981 29.5026 18.2489C29.7006 18.2997 29.913 18.3258 30.1275 18.3258C30.342 18.3258 30.5544 18.2997 30.7524 18.2489C30.9505 18.1981 31.1302 18.1237 31.2812 18.03L37.57 14.15C38.4829 13.5875 38.9957 12.825 38.9957 12.03C38.9957 11.235 38.4829 10.4725 37.57 9.90999Z"
                fill="#1D6953"
              />
            </svg>
          </span>
          <button className="text-[#1C1C1E] p-2 rounded-2xl bg-[#DDE9E5] flex items-center">
            <span className="">Blocked</span>
          </button>
        </div>
      </div>

      {/* ------------- RoadmapHeading overviw---------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6 mt-8">
        {/* Left - Image */}
        <img
          src={RoadmapHeadingimg}
          className="object-cover rounded-sm w-full h-full"
          alt="Product RoadmapHeading"
        />

        {/* Right - Metrics Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center mx-w-62 bg-[#FAFAFA] rounded-lg p-6 flex flex-col justify-center">
            <p className="text-3xl font-bold text-gray-800 mb-2">73%</p>
            <p className="text-sm text-gray-600">MVP scope Complete</p>
          </div>

          <div className="text-center mx-w-62 bg-[#FAFAFA] rounded-lg p-6 flex flex-col justify-center">
            <p className="text-3xl font-bold text-gray-800 mb-2">12</p>
            <p className="text-sm text-gray-600">Protocols Live</p>
          </div>

          <div className="text-center mx-w-62 bg-[#FAFAFA] rounded-lg p-6 flex flex-col justify-center">
            <p className="text-3xl font-bold text-gray-800 mb-2">8</p>
            <p className="text-sm text-gray-600">Open Milestones</p>
          </div>

          <div className="text-center mx-w-62 bg-[#FAFAFA] rounded-lg p-6 flex flex-col justify-center">
            <p className="text-3xl font-bold text-gray-800 mb-2">Mar 3</p>
            <p className="text-sm text-gray-600">Next Target Date</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapHeading;
