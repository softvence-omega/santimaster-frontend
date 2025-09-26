import ContainerWrapper from "../../utils/ContainerWrapper";
import DraftProtocols from "./DraftProtocols/DraftProtocols";
import RecentNotification from "./RecentNotification/RecentNotification";
import RecommendedForYou from "./Recommendation/Recommendation";
import ReviewQueue from "./ReviewQueue/ReviewQueue";
import SubmittedProtocols from "./SubmittedProtocols/SubmittedProtocols";
import UserDashboardOverview from "./UserDashboardOverview/UserDashboardOverview";
import UserNavbar from "./UserNavbar/UserNavbar";

const UserDashboard = () => {
  return (
    <ContainerWrapper>
      <UserNavbar />
      <UserDashboardOverview />
      <RecentNotification />
      <DraftProtocols />
      <SubmittedProtocols />
      <ReviewQueue />
      <RecommendedForYou />
    </ContainerWrapper>
  );
};

export default UserDashboard;
