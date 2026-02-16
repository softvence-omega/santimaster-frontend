import Banner from "../../components/Home/Banner/Banner";
import LatestProtocols from "../../components/Home/LatestProtocols/LatestProtocols";
import NeedSupport from "../../components/Home/NeedSuport/NeedSupport";
import ScientificDiscovery from "../../components/Home/ScientificDiscovery/ScientificDiscovery";
import Testimonial from "../../components/Home/Testimonial/Testimonial";
import WhatCanWeDo from "../../components/Home/Whatcanwedo/Whatcanwedo";
import LatestBlog from "./LatestBlog";

const Home = () => {
  return (
    <>
      <Banner />
      <WhatCanWeDo />
      <LatestProtocols />
      <LatestBlog />
      <ScientificDiscovery />
      <Testimonial />
      <NeedSupport />
    </>
  );
};

export default Home;
