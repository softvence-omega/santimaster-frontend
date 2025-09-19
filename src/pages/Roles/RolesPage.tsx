import ApplicationProcess from "../../components/Roles/ApplicationProcess/ApplicationProcess";
import ChooseYourRole from "../../components/Roles/ChooseYourRole/ChooseYourRole";
import CommunityImpact from "../../components/Roles/CommunityImpact/CommunityImpact";
import ReviewerOnboarding from "../../components/Roles/ReviewerOnboarding/ReviewerOnboarding";
import RolePermissionsTable from "../../components/Roles/RolePermissionTable/RolePermissionTable";
import SupportMission from "../../components/Roles/SupportMission/SupportMission";
import ContainerWrapper from "../../utils/ContainerWrapper";

const RolesPage = () => {
  return (
    <ContainerWrapper>
      <ChooseYourRole />
      <RolePermissionsTable />
      <ApplicationProcess />
      <ReviewerOnboarding />
      <CommunityImpact />
      <SupportMission />
    </ContainerWrapper>
  );
};

export default RolesPage;
