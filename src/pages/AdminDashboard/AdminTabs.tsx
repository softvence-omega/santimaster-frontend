import Tabs from "../../utils/Tabs";

const AdminDahboardTab = () => {
  const tabOptions = [
    {
      title: "Overview",
      value: "overview",
      href: "/admin/dashboard",
    },
    {
      title: "Donation",
      value: "donation",
      href: "/admin/research-funding-overview",
    },
    {
      title: "Messages",
      value: "messages",
      href: "/admin/messages",
    },
    {
      title: "Protocols",
      value: "protocols",
      href: "/admin/protocols",
    },
  ];

  return (
    <div className="hidden md:flex items-center justify-center container mx-auto gap-4 md:gap-[30px] pt-10">
      <Tabs tabs={tabOptions} />
    </div>
  );
};

export default AdminDahboardTab;
