import React, { useEffect, useState } from "react";
import type { Blog } from "../../types/blog.types";
import BlogCard from "./BlogCard";

const blog = [
  {
    blogTitle: "Mastering Tailwind CSS in 2026",
    blogShortDesc:
      "Learn how to build beautiful interfaces faster than ever using utility-first CSS.",
    blogDescription: "Full content goes here...",
    blogImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",
    blogTags: ["React", "Tailwind", "Frontend"],
    createdAt: "2026-02-10T10:00:00Z",

    updatedAt: "2026-02-11T10:00:00Z",
  },

  {
    blogTitle: "Mastering Tailwind CSS in 2026",

    blogShortDesc:
      "Learn how to build beautiful interfaces faster than ever using utility-first CSS.",

    blogDescription: "Full content goes here...",

    blogImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",

    blogTags: ["React", "Tailwind", "Frontend"],

    createdAt: "2026-02-10T10:00:00Z",

    updatedAt: "2026-02-11T10:00:00Z",
  },

  {
    blogTitle: "Mastering Tailwind CSS in 2026",

    blogShortDesc:
      "Learn how to build beautiful interfaces faster than ever using utility-first CSS.",

    blogDescription: "Full content goes here...",

    blogImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",

    blogTags: ["React", "Tailwind", "Frontend"],

    createdAt: "2026-02-10T10:00:00Z",

    updatedAt: "2026-02-11T10:00:00Z",
  },

  {
    blogTitle: "Mastering Tailwind CSS in 2026",

    blogShortDesc:
      "Learn how to build beautiful interfaces faster than ever using utility-first CSS.",

    blogDescription: "Full content goes here...",

    blogImage: "https://images.unsplash.com/photo-1587620962725-abab7fe55159",

    blogTags: ["React", "Tailwind", "Frontend"],

    createdAt: "2026-02-10T10:00:00Z",

    updatedAt: "2026-02-11T10:00:00Z",
  },

  // Add more blog objects here
];

export default function Blog() {
  const [blogs, setBlogs] = useState<Blog[]>(blog);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from your API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Example API call: /api/blogs?search=tailwind&page=1
      const response = await fetch(
        `/api/blogs?search=${searchTerm}&page=${currentPage}`,
      );
      const data = await response.json();

      setBlogs(data.blogs);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes or search is submitted
  useEffect(() => {
    fetchBlogs();
  }, [currentPage]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Reset to page 1 on new search
    fetchBlogs();
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8 mt-20">
      <div className="max-w-7xl mx-auto">
        {/* Header & Search */}
        <header className="mb-12 flex justify-between items-center">
          <h1 className="font-bar-low text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold leading-snug sm:leading-normal md:leading-normal text-[#0A251D] mb-4">
            Our Latest Stories
          </h1>

          <input
            type="text"
            placeholder="Search articles..."
            className="w-sm px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </header>

        {/* Blog Grid */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading articles...
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {blogs.map((blog, index) => (
              <BlogCard key={index} blog={blog} />
            ))}
          </div>
        )}

        {/* Pagination Controls */}
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
      </div>
    </div>
  );
}
