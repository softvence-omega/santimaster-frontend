import Banner from "../../components/Home/Banner/Banner";
import LatestProtocols from "../../components/Home/LatestProtocols/LatestProtocols";
import NeedSupport from "../../components/Home/NeedSuport/NeedSupport";
import ScientificDiscovery from "../../components/Home/ScientificDiscovery/ScientificDiscovery";
import WhatCanWeDo from "../../components/Home/Whatcanwedo/Whatcanwedo";

const Home = () => {
  return (
    <>
      <Banner />
      <WhatCanWeDo />
      <LatestProtocols />
      <ScientificDiscovery />
      <NeedSupport />
    </>
  );
};

export default Home;
