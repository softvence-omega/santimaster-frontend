import { useGetUserDashboardQuery } from "../../redux/userdasboad/userdashboard";
import ContainerWrapper from "../../utils/ContainerWrapper";
import Loading from "../../utils/Loading";
import DraftProtocols from "./DraftProtocols/DraftProtocols";
import RecentNotification from "./RecentNotification/RecentNotification";
import RecommendedForYou from "./Recommendation/Recommendation";
import ReviewQueue from "./ReviewQueue/ReviewQueue";
import SubmittedProtocols from "./SubmittedProtocols/SubmittedProtocols";
import UserDashboardOverview from "./UserDashboardOverview/UserDashboardOverview";
import UserNavbar from "./UserNavbar/UserNavbar";

const UserDashboard = () => {
  const { data: userDashboard, isLoading, error } = useGetUserDashboardQuery();

  if (isLoading)
    return (
      <div className="grid text-center">
        <Loading></Loading>
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="grid text-center">
        <p>Error: {error && 'data' in error ? JSON.stringify(error.data) : 'Something went wrong'}</p>
      </div>
    );

  return (
    <ContainerWrapper>
      <UserNavbar />

      {/* Pass overview to Overview */}
      <UserDashboardOverview />

      {/* Pass protocols to notifications */}
      <RecentNotification protocols={userDashboard?.data?.protocols} />

      <DraftProtocols drafts={userDashboard?.data?.protocols?.draft || []} />
      <SubmittedProtocols
        published={
          userDashboard?.data?.protocols?.published?.map((protocol) => ({
            title: protocol.protocolTitle,
            description: protocol.protocolDescription,
            reviewer: {
              name: "Dr. Reviewer", 
            },
            submitted: new Date(protocol.createdAt).toLocaleDateString(),
            status: {
              label: protocol.status,
              type: protocol.status.toLowerCase() as
                | "under-review"
                | "published"
                | "pending",
            },
          })) || []
        }
      />
      <ReviewQueue />
      <RecommendedForYou />
    </ContainerWrapper>
  );
};

export default UserDashboard;
