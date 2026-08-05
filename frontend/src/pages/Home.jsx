import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedAnimals from "../components/FeaturedAnimals";

function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <CategorySection />
      <FeaturedAnimals />
    </>
  );
}

export default Home;