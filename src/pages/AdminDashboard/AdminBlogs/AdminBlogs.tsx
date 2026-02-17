import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { Link } from "react-router-dom";
import {
  useDeleteBlogMutation,
  useGetBlogsQuery,
  usePostNewBlogMutation,
  useUpdateBlogMutation,
} from "../../../redux/features/Blog/blog.api";

export type TBlog = {
  _id?: string;
  blogTitle: string;
  blogShortDesc: string;
  blogDescription: string;
  blogImage: string;
  blogTags: string[];
};

export default function AdminBlogs() {
  const [page, setPage] = useState(1);
  const limit = 5;
  const [image, setImage] = useState<File | null>(null);

  const { data, isLoading } = useGetBlogsQuery({ page, limit });

  const blogs = data?.data || [];
  const meta = data?.meta;

  const [addNewBlog] = usePostNewBlogMutation();
  const [updateBlog] = useUpdateBlogMutation();
  const [deleteBlog] = useDeleteBlogMutation();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState<TBlog | null>(null);

  const [formData, setFormData] = useState<TBlog>({
    blogTitle: "",
    blogShortDesc: "",
    blogDescription: "",
    blogImage: "",
    blogTags: [],
  });

  const totalPages = meta?.total ? Math.ceil(meta.total / limit) : 1;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      blogTags: e.target.value.split(",").map((tag) => tag.trim()),
    });
  };

  const handleSubmit = async () => {
    if (selectedBlog?._id) {
      const updateFormData = new FormData();
      updateFormData.append("data", JSON.stringify(formData));
      if (image) updateFormData.append("file", image);
      await updateBlog({ id: selectedBlog?._id, body: updateFormData });
    } else {
      const newFormData = new FormData();
      newFormData.append("data", JSON.stringify(formData));
      if (image) newFormData.append("file", image);
      await addNewBlog(newFormData);
    }
    setIsModalOpen(false);
    setSelectedBlog(null);
  };

  const handleDelete = async () => {
    if (!selectedBlog?._id) return;
    await deleteBlog(selectedBlog._id);
    setIsDeleteOpen(false);
  };

  if (isLoading) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 bg-gray-50 min-h-screen container mx-auto mt-5 z-[600]">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Blog Management</h1>
        <button
          onClick={() => {
            setSelectedBlog(null);
            setFormData({
              blogTitle: "",
              blogShortDesc: "",
              blogDescription: "",
              blogImage: "",
              blogTags: [],
            });
            setIsModalOpen(true);
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          + Add Blog
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto bg-white rounded shadow">
        <table className="min-w-full text-sm">
          <thead className="bg-gray-100 text-left">
            <tr>
              <th className="p-3">Image</th>
              <th className="p-3">Title</th>
              <th className="p-3">Short Desc</th>
              <th className="p-3">Tag's</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog: TBlog) => (
              <tr key={blog?._id} className="border-t">
                <td className="p-3">
                  <img
                    src={blog?.blogImage}
                    className="w-14 h-14 object-cover rounded"
                  />
                </td>
                <td className="p-3">
                  <Link to={`/blog/${blog?._id}`}>{blog?.blogTitle}</Link>
                </td>
                <td className="p-3 truncate max-w-xs">{blog?.blogShortDesc}</td>
                <td className="p-3 truncate max-w-xs">
                  {blog?.blogTags?.map((tag) => `#${tag} `)}
                </td>
                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() => {
                      setSelectedBlog(blog);
                      setFormData(blog);
                      setIsModalOpen(true);
                    }}
                    className="text-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      setSelectedBlog(blog);
                      setIsDeleteOpen(true);
                    }}
                    className="text-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center mt-6 gap-2">
        <button
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Prev
        </button>

        {[...Array(totalPages)].map((_, i) => (
          <button
            key={i}
            onClick={() => setPage(i + 1)}
            className={`px-3 py-1 rounded ${
              page === i + 1 ? "bg-blue-600 text-white" : "border"
            }`}
          >
            {i + 1}
          </button>
        ))}

        <button
          disabled={page === totalPages}
          onClick={() => setPage(page + 1)}
          className="px-3 py-1 border rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>

      {/* Add / Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4 z-100">
          <div className="bg-white w-full max-w-2xl rounded-lg p-6 space-y-4 max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-semibold">
              {selectedBlog ? "Edit Blog" : "Add Blog"}
            </h2>

            <input
              name="blogTitle"
              value={formData.blogTitle}
              onChange={handleChange}
              placeholder="Title"
              className="w-full border p-2 rounded"
            />

            <input
              name="blogShortDesc"
              value={formData.blogShortDesc}
              onChange={handleChange}
              placeholder="Short Description"
              className="w-full border p-2 rounded"
            />

            <div>
              <label className="text-sm font-medium">Description</label>
              <ReactQuill
                theme="snow"
                value={formData.blogDescription}
                onChange={(value) =>
                  setFormData({
                    ...formData,
                    blogDescription: value,
                  })
                }
                className="bg-white"
              />
            </div>

            <input
              name="blogImage"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] as File)}
              placeholder="Image URL"
              className="w-full border p-2 rounded"
            />

            <input
              value={formData.blogTags.join(",")}
              onChange={handleTagsChange}
              placeholder="Tags (comma separated)"
              className="w-full border p-2 rounded"
            />

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Delete Modal */}
      {isDeleteOpen && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center">
          <div className="bg-white p-6 rounded shadow text-center space-y-4">
            <h2 className="font-semibold">Delete Blog?</h2>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setIsDeleteOpen(false)}
                className="px-4 py-2 border rounded"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
