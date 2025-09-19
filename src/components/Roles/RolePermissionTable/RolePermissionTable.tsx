import SectionHeader from "../../../utils/SectionHeading";

interface PermissionRowProps {
  role: string;
  canSubmit?: boolean | string;
  canEdit?: boolean | string;
  canPublish?: boolean | string;
  canManageUsers?: boolean | string;
}

const PermissionRow = ({
  role,
  canSubmit,
  canEdit,
  canPublish,
  canManageUsers,
}: PermissionRowProps) => {
  const renderCell = (value?: boolean | string) => {
    if (typeof value === "boolean") {
      return value ? (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M12 0C15.2024 0.0568338 18.2541 1.3461 20.4983 3.59035C22.7426 5.8346 24 8.85444 24 12C24 15.1456 22.7426 18.1654 20.4983 20.4096C18.2541 22.6539 15.2024 23.9432 12 24C8.7976 23.9432 5.74592 22.6539 3.50167 20.4096C1.25742 18.1654 0 15.1456 0 12C0 8.85444 1.25742 5.8346 3.50167 3.59035C5.74592 1.3461 8.7976 0.0568338 12 0ZM9.46248 15.8981L6.47012 12.9567C6.22518 12.7153 6.08764 12.3885 6.08764 12.0477C6.08764 11.7069 6.22518 11.38 6.47012 11.1386C6.7163 10.8983 7.04931 10.7634 7.39642 10.7634C7.74353 10.7634 8.07653 10.8983 8.32272 11.1386L10.4307 13.2114L15.6773 8.05878C15.9231 7.81822 16.2559 7.68315 16.6029 7.68315C16.9499 7.68315 17.2828 7.81822 17.5286 8.05878C17.7732 8.30033 17.9105 8.62716 17.9105 8.96784C17.9105 9.30852 17.7732 9.63534 17.5286 9.8769L11.355 15.9399C11.2297 16.0624 11.0804 16.1587 10.9163 16.2231C10.7521 16.2875 10.5764 16.3187 10.3997 16.3148C10.2229 16.3109 10.0488 16.272 9.88777 16.2004C9.72672 16.1288 9.58207 16.026 9.46248 15.8981Z"
            fill="#34C759"
          />
        </svg>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24C18.6274 24 24 18.6274 24 12C23.9928 5.37553 18.6245 0.00717187 12 0ZM16 14.587C16.4063 14.961 16.4326 15.5936 16.0586 16C15.6846 16.4063 15.0519 16.4326 14.6456 16.0586C14.6252 16.0399 14.6057 16.0203 14.587 16L12 13.414L9.414 16C9.01673 16.3837 8.38369 16.3726 8.00002 15.9754C7.62577 15.5879 7.62577 14.9735 8.00002 14.586L10.586 12L8.00002 9.414C7.61634 9.01673 7.62736 8.38369 8.02462 8.00002C8.41214 7.62577 9.02648 7.62577 9.414 8.00002L12 10.586L14.587 8.00002C14.961 7.59366 15.5936 7.56741 16 7.94142C16.4063 8.31544 16.4326 8.94806 16.0586 9.35442C16.0399 9.37477 16.0203 9.39427 16 9.41302L13.414 12L16 14.587Z"
            fill="#FF3B30"
          />
        </svg>
      );
    }
    if (typeof value === "string") {
      return (
        <span className="text-[#4A7BFF] text-sm font-medium underline cursor-pointer">
          {value}
        </span>
      );
    }
    return null;
  };

  return (
    <tr className="border border-gray-200 text-gray-700 text-lg">
      <td className="px-4 py-3 text-left font-medium border border-gray-200">
        {role}
      </td>
      <td className="px-4 py-3 text-center border border-gray-200">
        {renderCell(canSubmit)}
      </td>
      <td className="px-4 py-3 text-center border border-gray-200">
        {renderCell(canEdit)}
      </td>
      <td className="px-4 py-3 text-center border border-gray-200">
        {renderCell(canPublish)}
      </td>
      <td className="px-4 py-3 text-center border border-gray-200">
        {renderCell(canManageUsers)}
      </td>
    </tr>
  );
};

export default function RolePermissionsTable() {
  return (
    <section className="py-12 px-6 max-w-5xl mx-auto">
      {/* <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800">
        Role Permissions Overview
      </h2>
      <p className="text-gray-600 text-center mt-2 mb-8">
        Understanding what each role can do within the Open Gene platform
      </p> */}
      <SectionHeader
        title="Role Permissions Overview"
        subtitle="  Understanding what each role can do within the Open Gene platform"
      ></SectionHeader>

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50 text-[#1C1C1E] font-semibold text-lg">
            <tr>
              <th className="px-4 py-3 text-left font-semibold">Role</th>
              <th className="px-4 py-3 font-semibold">Can Submit</th>
              <th className="px-4 py-3 font-semibold">Can Edit</th>
              <th className="px-4 py-3 font-semibold">Can Publish</th>
              <th className="px-4 py-3 font-semibold">Can Manage Users</th>
            </tr>
          </thead>
          <tbody>
            <PermissionRow
              role="Admin"
              canSubmit={true}
              canEdit={true}
              canPublish={true}
              canManageUsers={true}
            />
            <PermissionRow
              role="Reviewer/Editor"
              canSubmit={false}
              canEdit={true}
              canPublish={true}
              canManageUsers={false}
            />
            <PermissionRow
              role="Contributor"
              canSubmit="Draft Only"
              canEdit="Draft Only"
              canPublish={false}
              canManageUsers={false}
            />
            <PermissionRow
              role="Member/Subscriber"
              canSubmit={false}
              canEdit={false}
              canPublish={false}
              canManageUsers={false}
            />
          </tbody>
        </table>
      </div>

      <p className="text-lg text-[#636363] mt-4">
        * Reviewer can edit & publish protocols; Contributors create Drafts
        only.
      </p>
    </section>
  );
}
