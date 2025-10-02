import Tabs from "../../utils/Tabs";

const UserDahboardTab = () => {
  const tabOptions = [
    {
      title: "Overview",
      value: "overview",
      href: "/user/overview", 
    },
    {
      title: "My Drafts",
      value: "drafts",
      href: "/user/my-drafts",
    },

    {
      title: "Submitted Protocols",
      value: "submitted",
      href: "/user/submitted",
    },
    {
      title: "Settings",
      value: "settings",
      href: "/user/settings",
    },
  ];

  return (
    <div className="hidden md:flex items-center justify-center gap-4 md:gap-[30px] pt-30">
      <Tabs tabs={tabOptions} />
    </div>
  );
};

export default UserDahboardTab;
