
import FaqRoadmap from "../../components/Roadmap/FaqRoadmap/FaqRoadmap";
import GetInvolved from "../../components/Roadmap/GetInvolved/GetInvolved";
import ProjectRoadmap from "../../components/Roadmap/ProjectRoadmap/ProjectRoadmap";
import ReleaseNotes from "../../components/Roadmap/ReleaseNote/ReleaseNote";
import RoadmapHeading from "../../components/Roadmap/RoadmapHeading/RoadmapHeading";
import ContainerWrapper from "../../utils/ContainerWrapper";

const Roadmap = () => {
  return (
    <ContainerWrapper>
      <RoadmapHeading />
      <ProjectRoadmap />
      <ReleaseNotes />
      <GetInvolved />
      <FaqRoadmap /> 
    </ContainerWrapper>
  );
};

export default Roadmap;
