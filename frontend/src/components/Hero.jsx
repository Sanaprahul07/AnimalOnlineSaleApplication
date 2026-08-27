import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchIcon } from "./Icons";
import heroAnimals from "../assets/hero-animals.png";

// =====================================================
// HERO SECTION
// =====================================================

function Hero() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");

    // Show the real banner image when it loads; if the file is missing or
    // empty (0 bytes) the <img> fails to decode and we fall back to a
    // self-contained meadow scene so the hero never looks broken.
    const [bannerOk, setBannerOk] = useState(true);

    const handleSearch = (e) => {
        e.preventDefault();

        const term = query.trim();

        if (term) {
            navigate(`/animals/${encodeURIComponent(term)}`);
        }
    };

    const stats = [
        { num: "5000+", label: "Happy Buyers" },
        { num: "2000+", label: "Verified Sellers" },
        { num: "10000+", label: "Animals Sold" },
        { num: "50+", label: "Categories" }
    ];

    return (
        <section className="as-hero">
            <div className="container">
                <div className="row align-items-center g-5">

                    {/* LEFT */}
                    <div className="col-lg-6">

                        <h1 className="mb-3">
                            Find Your Perfect{" "}
                            <span className="as-text-green">Animal</span>{" "}
                            Companion
                        </h1>

                        <p className="as-hero-sub mb-4">
                            Buy and sell healthy animals safely with trusted
                            sellers across India.
                        </p>

                        {/* SEARCH */}
                        <form
                            className="as-search as-hero-search mb-4"
                            onSubmit={handleSearch}
                        >
                            <input
                                type="text"
                                placeholder="Search animals, breeds, categories..."
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                            />
                            <button
                                type="submit"
                                className="as-search-btn d-flex align-items-center gap-2"
                            >
                                <SearchIcon size={18} />
                                Search
                            </button>
                        </form>

                        {/* STATS */}
                        <div className="as-stats">
                            {stats.map((s) => (
                                <div key={s.label}>
                                    <div className="as-stat-num">{s.num}</div>
                                    <div className="as-stat-label">{s.label}</div>
                                </div>
                            ))}
                        </div>

                    </div>

                    {/* RIGHT */}
                    <div className="col-lg-6 text-center">
                        {bannerOk ? (
                            <img
                                src={heroAnimals}
                                alt="A cow, golden retriever, goat, rabbit and cat together on a green meadow"
                                className="as-hero-img"
                                onError={() => setBannerOk(false)}
                            />
                        ) : (
                            <div
                                className="as-hero-scene"
                                role="img"
                                aria-label="Cow, dog, goat, rabbit and cat together on a green meadow"
                            >
                                <div className="as-hero-animals">
                                    <span className="as-hero-animal cow">🐄</span>
                                    <span className="as-hero-animal dog">🐕</span>
                                    <span className="as-hero-animal goat">🐐</span>
                                    <span className="as-hero-animal rabbit">🐇</span>
                                    <span className="as-hero-animal cat">🐈</span>
                                </div>
                            </div>
                        )}
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;
