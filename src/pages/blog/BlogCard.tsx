import type { Blog } from "../../types/blog.types";

const BlogCard = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm transition-hover hover:shadow-md">
      {/* Blog Image */}
      <img
        src={blog?.blogImage}
        alt={blog?.blogTitle}
        className="h-48 w-full object-cover"
      />

      <div className="flex flex-1 flex-col p-6">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          {blog?.blogTags?.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 text-xs font-medium text-blue-600 bg-blue-50 rounded-full"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Title & Short Desc */}
        <h2 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2">
          {blog?.blogTitle}
        </h2>
        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {blog?.blogShortDesc}
        </p>

        {/* Footer: Date */}
        <div className="mt-auto pt-4 border-t border-gray-100">
          <p className="text-xs text-gray-400">
            Published: {new Date(blog?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
