import { useGetUserDashboardQuery } from "../../redux/userdasboad/userdashboard";
import SkeletonLoader from "../../shared/SkeletonLoader";
import ContainerWrapper from "../../utils/ContainerWrapper";

import DraftProtocols from "./DraftProtocols/DraftProtocols";
import RecentNotification from "./RecentNotification/RecentNotification";
import RecommendedForYou from "./Recommendation/Recommendation";
import ReviewQueue from "./ReviewQueue/ReviewQueue";
import SubmittedProtocols from "./SubmittedProtocols/SubmittedProtocols";
import UserDashboardOverview from "./UserDashboardOverview/UserDashboardOverview";

const UserDashboard = () => {
  const { data: userDashboard, isLoading, error } = useGetUserDashboardQuery();

  if (isLoading)
    return (
      <div className="grid text-center">
        <SkeletonLoader />
      </div>
    );

  if (error)
    return (
      <div className="grid text-center">
        <p>
          Error:{" "}
          {error && "data" in error
            ? JSON.stringify(error.data)
            : "Something went wrong"}
        </p>
      </div>
    );

  return (
    <ContainerWrapper>
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
            status: protocol.status as
              | "PUBLISHED"
              | "DRAFT"
              | "REJECTED"
              | "PENDING",
          })) || []
        }
      />
      <ReviewQueue queue={userDashboard?.data?.protocols?.pending || []} />

      <RecommendedForYou />
    </ContainerWrapper>
  );
};

export default UserDashboard;
