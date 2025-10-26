
const SkeletonLoader = () => {
  return (
    <section className="">
      <div className="container px-6 mx-auto animate-pulse">

        <div className="grid grid-cols-1 gap-8 xl:gap-12 md:grid-cols-2">
          {Array.from({ length: 6 }).map((_, index) => (
            <div key={index} className="w-full">
              <div className="w-full h-64 bg-gray-300 rounded-lg dark:bg-gray-600"></div>

              <h1 className="w-56 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></h1>
              <p className="w-24 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-700"></p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkeletonLoader;
