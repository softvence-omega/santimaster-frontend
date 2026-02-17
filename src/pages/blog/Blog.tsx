import { useEffect, useState } from "react";
import { useGetBlogsQuery } from "../../redux/features/Blog/blog.api";
import type { Blog } from "../../types/blog.types";
import BlogCard from "./BlogCard";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const limit = 6;

  const { data, isLoading } = useGetBlogsQuery({
    search: searchTerm,
    page: currentPage,
    limit,
  });

  const total = data?.meta?.total || 0;
  const totalPages = Math.ceil(total / limit);

  /* Reset to page 1 when searching */
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search */}
        <header className="mb-12 flex flex-col md:flex-row justify-between md:items-center gap-6">
          <h1 className="font-bar-low text-3xl md:text-5xl font-semibold text-[#0A251D]">
            Our Latest Stories
          </h1>

          <input
            type="text"
            placeholder="Search articles..."
            className="w-full md:w-80 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>

        {/* Blog Grid */}
        {isLoading ? (
          <div className="text-center py-20 text-gray-500">
            Loading articles...
          </div>
        ) : (
          <>
            {data?.data?.length === 0 ? (
              <div className="text-center py-20 text-gray-400">
                No blogs found.
              </div>
            ) : (
              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {data?.data?.map((blog: Blog) => (
                  <BlogCard key={blog._id} blog={blog} />
                ))}
              </div>
            )}
          </>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="mt-16 flex justify-center items-center gap-4">
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((prev) => prev - 1)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Previous
            </button>

            <span className="text-gray-600 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((prev) => prev + 1)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-md disabled:opacity-50 hover:bg-gray-50"
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
