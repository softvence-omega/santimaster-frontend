import UseCase from "../../components/Mvp/UseCase/UserCase";

import Faq from "../../components/Mvp/Faq/Faq";
import HowitWork from "../../components/Mvp/HowitWork/HowitWork";
import MvpRoadmap from "../../components/Mvp/MvpRoadmap/MvpRoadmap";
import OpenMvp from "../../components/Mvp/OpenMvp/OpemMvp";

import ContainerWrapper from "../../utils/ContainerWrapper";
import TechnicalSummary from "../../components/Mvp/TechnicalSummary/TechnicalSummary";
import MVPAccessCard from "../../components/Mvp/MvpAccessCard/MvpAccessCard";

const Mvp = () => {
  return (
    <>
      <ContainerWrapper>
        <OpenMvp />
        <MvpRoadmap />
        <UseCase />
        <TechnicalSummary />
        <HowitWork />
        <MVPAccessCard />
        <Faq />
      </ContainerWrapper>
    </>
  );
};

export default Mvp;
