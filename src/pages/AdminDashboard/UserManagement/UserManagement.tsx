import { Search, Trash2 } from "lucide-react";
import { useMemo, useState } from "react";
import { useDeleteUserAdminMutation } from "../../../redux/features/auth/auth.api";
import toast from "react-hot-toast";
import SectionHeader from "../../../utils/SectionHeading";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
  submissions: number;
  avatar?: string;
}

interface UserManagementProps {
  users?: User[];
}

const UserManagement: React.FC<UserManagementProps> = ({ users = [] }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteUser, { isLoading: isDeleting }] = useDeleteUserAdminMutation();

  // ✅ Fixed: only one delete handler
  const handleDelete = async (id: string) => {
    if (toast.custom("Are you sure you want to delete this user?")) {
      try {
        await deleteUser(id).unwrap();
        toast.success("User deleted successfully!");
      } catch (error: any) {
        console.error("Failed to delete user:", error);
        toast.error("Failed to delete user. Please try again.");
      }
    }
  };

  // Filter users by search term
  const filteredUsers = useMemo(
    () =>
      users.filter(
        (user) =>
          user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          user.email.toLowerCase().includes(searchTerm.toLowerCase())
      ),
    [users, searchTerm]
  );

  const getRoleBadgeStyle = (role: string) => {
    switch (role) {
      case "Administrator":
        return "bg-orange-100 text-orange-800";
      case "Reviewer":
        return "bg-purple-100 text-purple-800";
      case "Researcher":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusBadgeStyle = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-emerald-100 text-emerald-800";
      case "Inactive":
        return "bg-gray-100 text-gray-600";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="rounded-xl shadow-sm p-6 py-16">
      {/* Header */}
      <div className="mb-6">
        <SectionHeader
          title="  User Management"
          subtitle="Manage researchers, reviewers, and administrators"
        ></SectionHeader>
      </div>

      {/* Search */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none w-64"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Name
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Role
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Status
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Last Login
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Submissions
              </th>
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr
                key={user.id}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="py-4 px-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">
                        {user.name}
                      </div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeStyle(
                      user.role
                    )}`}
                  >
                    {user.role}
                  </span>
                </td>
                <td className="py-4 px-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusBadgeStyle(
                      user.status
                    )}`}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 px-4 text-gray-600">{user.lastLogin}</td>
                <td className="py-4 px-4 text-gray-900 font-medium">
                  {user.submissions}
                </td>
                <td className="text-center">
                  <button
                    disabled={isDeleting}
                    onClick={() => handleDelete(user.id)}
                    className="p-1 text-gray-400 hover:text-red-600 transition-colors disabled:opacity-50"
                  >
                    <Trash2 size={16} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
