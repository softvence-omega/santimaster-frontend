import { useGetProtocolByIdQuery } from "../../../redux/features/protocols/potocols.api";
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

const ProtocolDeatils = ({ id }: { id: string }) => {
 
  const { data: singleProtocol, isLoading, error } = useGetProtocolByIdQuery(id);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Failed to load protocol.</p>;
  if (!singleProtocol) return <p>No protocol found.</p>;

  return (
    <ContainerWrapper>
      <CrisprDeatils protocol={singleProtocol} />
     <TableMaterials materials={singleProtocol.materials} />
      <Equipment  />
      <ProtocalStapper  />
      <FilesAttachments  />
      <TroubleshootingTips  />
      <AuthorInfo  />
      <PeerReviewSection  />
      <RelatedProtocols  />
      <References  />
    </ContainerWrapper>
  );
};

export default ProtocolDeatils;
