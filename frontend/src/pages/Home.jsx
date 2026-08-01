import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CategorySection from "../components/CategorySection";
import FeaturedAnimals from "../components/FeaturedAnimals";


function Home() {
  return (
    <>
      <Header />
      <Navbar />
      <Hero />
      <CategorySection />
      <FeaturedAnimals />
    </>
  );
}

export default Home;