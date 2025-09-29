import { useState, useMemo } from "react";
import { Search, Eye, Trash2 } from "lucide-react";

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
  users?: User[]; // received from Redux query
}

const UserManagement: React.FC<UserManagementProps> = ({ users = [] }) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    if (checked) {
      setSelectedUsers([...selectedUsers, userId]);
    } else {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    }
  };

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

  const isAllSelected =
    filteredUsers.length > 0 &&
    selectedUsers.length === filteredUsers.length;
  const isSomeSelected =
    selectedUsers.length > 0 && selectedUsers.length < filteredUsers.length;

  return (
    <div className="rounded-xl shadow-sm p-6 py-16">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          User Management
        </h1>
        <p className="text-gray-600">
          Manage researchers, reviewers, and administrators
        </p>
      </div>

      {/* Search and Selection Info */}
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
        {selectedUsers.length > 0 && (
          <div className="text-sm text-gray-600">{selectedUsers.length} selected</div>
        )}
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-900">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    checked={isAllSelected}
                    ref={(el) => {
                      if (el) el.indeterminate = isSomeSelected;
                    }}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                  />
                  User
                </div>
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
                    <input
                      type="checkbox"
                      checked={selectedUsers.includes(user.id)}
                      onChange={(e) =>
                        handleSelectUser(user.id, e.target.checked)
                      }
                      className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                    />
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <span className="text-emerald-600 font-medium text-sm">
                        {user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{user.name}</div>
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
                <td className="py-4 px-4">
                  <div className="flex items-center gap-2">
                    <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors">
                      <Eye size={16} />
                    </button>
                    <button className="p-1 text-gray-400 hover:text-red-600 transition-colors">
                      <Trash2 size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">
              {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""} selected
            </span>
            <div className="flex gap-2">
              <button className="px-3 py-1.5 text-sm font-medium text-emerald-700 bg-emerald-100 rounded-lg hover:bg-emerald-200 transition-colors">
                Export Selected
              </button>
              <button className="px-3 py-1.5 text-sm font-medium text-red-700 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                Deactivate Selected
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
