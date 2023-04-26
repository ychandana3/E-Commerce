import FeatureProduct from "./components/FeatureProduct";
import HeroSection from "./components/HeroSection";
import Services from "./components/Services";
import Trusted from "./components/Trusted";

const Home = () => {
  const data = {
    name: "Yamini store",
  };

  return (
    <>
      <HeroSection myName="Yamini store" />
      <FeatureProduct />
      <Services />
      <Trusted />
    </>
  );
};

export default Home;
