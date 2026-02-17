import { useNavigate, useParams } from "react-router-dom";
import { useGetBlogByIdQuery } from "../../redux/features/Blog/blog.api";

export default function BlogDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, isLoading } = useGetBlogByIdQuery(id);

  const blog = data?.data;

  if (isLoading) {
    return <div className="p-6">Loading...</div>;
  }

  if (!blog) {
    return <div className="p-6 text-center text-red-500">Blog not found</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4 mt-20">
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Back Button */}
        <div className="p-6 pb-0">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline text-sm"
          >
            ← Back
          </button>
        </div>

        {/* Blog Image */}
        <img
          src={blog?.blogImage}
          alt={blog?.blogTitle}
          className="w-full h-72 md:h-96 object-cover"
        />

        <div className="p-6 md:p-10 space-y-6">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold leading-tight">
            {blog?.blogTitle}
          </h1>

          {/* Short Description */}
          <p className="text-gray-600 text-lg">{blog?.blogShortDesc}</p>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {blog?.blogTags.map((tag: string, index: number) => (
              <span
                key={index}
                className="bg-gray-200 text-sm px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Divider */}
          <div className="border-t pt-6" />

          {/* Rich Text Content */}
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{
              __html: blog?.blogDescription,
            }}
          />
        </div>
      </div>
    </div>
  );
}
