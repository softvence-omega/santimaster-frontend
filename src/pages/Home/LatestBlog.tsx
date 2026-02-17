import { useGetBlogsQuery } from "../../redux/features/Blog/blog.api";
import type { Blog } from "../../types/blog.types";
import SectionHeader from "../../utils/SectionHeading";
import BlogCard from "../blog/BlogCard";
export default function LatestBlog() {
  const { data, isLoading } = useGetBlogsQuery({ limit: 6 });

  if (isLoading) return;
  return (
    <div className="mt-12 max-w-6xl mx-auto px-4 py-8">
      <SectionHeader
        title="Latest Blog"
        subtitle="Recently published blog posts from our community of researchers and developers"
      />
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {data?.data?.map((blog: Blog, index: number) => (
          <BlogCard key={index} blog={blog} />
        ))}
      </div>
    </div>
  );
}
