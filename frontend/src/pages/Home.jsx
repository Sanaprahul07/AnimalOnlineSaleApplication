import "../styles/home.css";

import Header from "../components/Header";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import TrustBar from "../components/TrustBar";
import CategorySection from "../components/CategorySection";
import FeaturedAnimals from "../components/FeaturedAnimals";
import HowItWorks from "../components/HowItWorks";
import WhyChoose from "../components/WhyChoose";
import SellCTA from "../components/SellCTA";
import Footer from "../components/Footer";

function Home() {
    return (
        <main className="home-page">
            <Header />
            <Navbar />
            <Hero />
            <TrustBar />
            <CategorySection />
            <FeaturedAnimals />
            <HowItWorks />
            <WhyChoose />
            <SellCTA />
            <Footer />
        </main>
    );
}

export default Home;
