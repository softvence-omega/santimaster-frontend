import NewProtocolNotification from "../../components/Protocols/NewProtocolNotification/RecentUpdate";
import PotocolsLibary from "../../components/Protocols/PotocolsLibary/PotocolsLibary";
import ProtocolLibraryStats from "../../components/Protocols/ProtocolLibraryStatistics/ProtocolLibraryStatistics";

const Protocols = () => {
  return (
    <div>
      <PotocolsLibary />
      <NewProtocolNotification />
      <ProtocolLibraryStats />
    </div>
  );
};

export default Protocols;
