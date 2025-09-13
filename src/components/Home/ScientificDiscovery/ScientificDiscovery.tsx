import scientificimg from "../../../assets/Homeimg/scientificDiscovery.png";
const ScientificDiscovery = () => {
  return (
    <div className="bg-teal-50 min-h-screen flex items-center justify-center p-6">
      <div className="max-w-7xl mx-auto text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          Accelerating Scientific Discovery
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Our open-source approach is transforming how researchers collaborate
          and share knowledge
        </p>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-green-700">250+</h2>
            <p className="text-gray-600">Protocols Published</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700">45</h2>
            <p className="text-gray-600">Countries Represented</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700">1,200+</h2>
            <p className="text-gray-600">Active Researchers</p>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-700">98%</h2>
            <p className="text-gray-600">Reproducibility Rate</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="text-left max-w-md">
            <h2 className="text-2xl font-semibold text-green-700 mb-4">
              Peer Review That Works
            </h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✔</span> Expert Review
                Process
                <span className="ml-2">
                  Every protocol undergoes rigorous peer review by domain
                  experts.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✔</span> Reproducibility
                Testing
                <span className="ml-2">
                  Independent labs validate protocols before publication.
                </span>
              </li>
              <li className="flex items-start">
                <span className="text-green-700 mr-2">✔</span> Continuous
                Updates
                <span className="ml-2">
                  Protocols evolve with community feedback and improvements.
                </span>
              </li>
            </ul>
          </div>
          <div className="relative">
            <img
              src={scientificimg}
              alt="Scientific Discovery"
              className="rounded-lg shadow-lg"
            />
            <div className="absolute -bottom-6 -right-6 bg-green-700 text-white p-4 rounded-lg shadow-md w-64">
              <div className="flex items-center mb-2">
                <span className="text-2xl">🌐</span>
                <h3 className="ml-2 text-xl font-semibold">Quality Assured</h3>
              </div>
              <p className="text-sm">
                Every protocol meets our rigorous standards for clarity, safety,
                and reproducibility
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScientificDiscovery;
