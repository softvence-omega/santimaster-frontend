import { useGetUserDashboardQuery } from "../../redux/userdasboad/userdashboard";
import ContainerWrapper from "../../utils/ContainerWrapper";
import DraftProtocols from "./DraftProtocols/DraftProtocols";
import RecentNotification from "./RecentNotification/RecentNotification";
import RecommendedForYou from "./Recommendation/Recommendation";
import ReviewQueue from "./ReviewQueue/ReviewQueue";
import SubmittedProtocols from "./SubmittedProtocols/SubmittedProtocols";
import UserDashboardOverview from "./UserDashboardOverview/UserDashboardOverview";
import UserNavbar from "./UserNavbar/UserNavbar";

const UserDashboard = () => {
  const { data: userDashboard, isLoading, error } = useGetUserDashboardQuery();

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading dashboard</p>;

  return (
    <ContainerWrapper>
      <UserNavbar />

      {/* Pass overview to Overview */}
      <UserDashboardOverview  />

      {/* Pass protocols to notifications */}
      <RecentNotification protocols={userDashboard?.data?.protocols} />

      <DraftProtocols drafts={userDashboard?.data?.protocols?.draft || []} />
    <SubmittedProtocols published={userDashboard?.data?.protocols?.published?.map(protocol => ({
        title: protocol.protocolTitle,
        description: protocol.protocolDescription,
        reviewer: {
          name: "Dr. Reviewer", // This would need to come from API if available
        },
        submitted: new Date(protocol.createdAt).toLocaleDateString(),
        status: {
          label: protocol.status,
          type: protocol.status.toLowerCase() as "under-review" | "published" | "pending"
        }
      })) || []} />
      <ReviewQueue /> 
      <RecommendedForYou />
    </ContainerWrapper>
  );
};

export default UserDashboard;
