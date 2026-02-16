import { useEffect, useState } from "react";
import type { Blog } from "../../types/blog.types";
import SectionHeader from "../../utils/SectionHeading";
import BlogCard from "../blog/BlogCard";
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
export default function LatestBlog() {
  const [blogs, setBlogs] = useState<Blog[]>(blog);
  const [loading, setLoading] = useState(false);

  // Function to fetch data from your API
  const fetchBlogs = async () => {
    setLoading(true);
    try {
      // Example API call: /api/blogs?search=tailwind&page=1
      const response = await fetch(`/api/blogs`);
      const data = await response.json();

      setBlogs(data.blogs);
    } catch (error) {
      console.error("Failed to fetch blogs:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch when page changes or search is submitted
  useEffect(() => {
    fetchBlogs();
  }, []);

  if (loading) return;
  return (
    <div className="mt-12 max-w-6xl mx-auto px-4 py-8">
      <SectionHeader
        title="Latest Blog"
        subtitle="Recently published blog posts from our community of researchers and developers"
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog, index) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}
