import ContainerWrapper from "../../../utils/ContainerWrapper";

import AuthorInfo from "./AuthorInfo";
import CrisprDeatils from "./CrisprDeatils";
import Equipment from "./Equipment";
import FilesAttachments from "./FilesAttachments";
import PeerReviewSection from "./PeerReviewSection";

import ProtocalStapper from "./ProtocolStapper";
import References from "./References";
import RelatedProtocols from "./RelatedProtocol";

import TableMaterials from "./TableMaterials";
import TroubleshootingTips from "./TroubleshootingTips";

const ProtocolDeatils = () => {
  return (
    <ContainerWrapper>
      <CrisprDeatils /> 
      <TableMaterials />
      <Equipment />
      <ProtocalStapper />
      <FilesAttachments />
      <TroubleshootingTips />
      <AuthorInfo />
      <PeerReviewSection />
      <RelatedProtocols />
      <References />
    </ContainerWrapper>
  );
};

export default ProtocolDeatils;
