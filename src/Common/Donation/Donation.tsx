import Faq from "../../components/Mvp/Faq/Faq";
import ContainerWrapper from "../../utils/ContainerWrapper";
import CorporateSponsorship from "./CorporateSponsorship";
import DonationPaymentFrom from "./DonationPaymentFrom";
import SponsorshipForm from "./FromInterestedSponser";
import FundingGoal from "./FundingGoal";
import RecentSupporters from "./RecentSupporters";

const Donation = () => {
  return (
    <ContainerWrapper>
      <DonationPaymentFrom />
      <FundingGoal/>
      <RecentSupporters/>
       <CorporateSponsorship/>
      <SponsorshipForm/>
     <Faq/>
    </ContainerWrapper>
  );
};

export default Donation;
