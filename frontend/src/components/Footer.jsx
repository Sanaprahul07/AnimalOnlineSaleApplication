import { useNavigate } from "react-router-dom";
import {
    PawIcon,
    PhoneIcon,
    MailIcon,
    LocationIcon,
    HeadsetIcon
} from "./Icons";

// =====================================================
// FOOTER
// =====================================================

function Footer() {
    const navigate = useNavigate();

    const goCategory = (category) => navigate(`/animals/${encodeURIComponent(category)}`);

    const quickLinks = ["Home", "About Us", "How It Works", "Contact Us", "Help Center"];

    const categoriesLeft = ["Cows", "Buffaloes", "Goats", "Sheep", "Horses"];
    const categoriesRight = ["Dogs", "Cats", "Birds", "Others"];

    // Footer category label → animal category route.
    const catRoute = {
        Cows: "Cow",
        Buffaloes: "Buffalo",
        Goats: "Goat",
        Sheep: "Sheep",
        Horses: "Horse",
        Dogs: "Dog",
        Cats: "Cat",
        Birds: "Birds",
        Others: "all"
    };

    return (
        <footer className="as-footer">
            <div className="container">
                <div className="row g-4">

                    {/* BRAND */}
                    <div className="col-lg-4 col-md-6">
                        <div className="as-brand mb-3">
                            <span className="as-brand-icon">
                                <PawIcon size={24} />
                            </span>
                            <span>AnimalSale</span>
                        </div>
                        <p>
                            India's most trusted platform for buying and selling
                            animals. Connecting buyers with quality animals since
                            2020.
                        </p>
                        <div className="as-social">
                            <a href="#" aria-label="Facebook">f</a>
                            <a href="#" aria-label="Instagram">◎</a>
                            <a href="#" aria-label="Twitter">t</a>
                            <a href="#" aria-label="YouTube">▶</a>
                        </div>
                    </div>

                    {/* QUICK LINKS */}
                    <div className="col-lg-2 col-md-6">
                        <h6>Quick Links</h6>
                        {quickLinks.map((link) => (
                            <a
                                key={link}
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    navigate("/");
                                }}
                            >
                                {link}
                            </a>
                        ))}
                    </div>

                    {/* CATEGORIES */}
                    <div className="col-lg-3 col-md-6">
                        <h6>Categories</h6>
                        <div className="d-flex gap-4">
                            <div>
                                {categoriesLeft.map((c) => (
                                    <a
                                        key={c}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            goCategory(catRoute[c]);
                                        }}
                                    >
                                        {c}
                                    </a>
                                ))}
                            </div>
                            <div>
                                {categoriesRight.map((c) => (
                                    <a
                                        key={c}
                                        href="#"
                                        onClick={(e) => {
                                            e.preventDefault();
                                            goCategory(catRoute[c]);
                                        }}
                                    >
                                        {c}
                                    </a>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* CONTACT */}
                    <div className="col-lg-3 col-md-6">
                        <h6>Contact Info</h6>
                        <p className="d-flex align-items-center gap-2">
                            <PhoneIcon size={15} /> +91 1234567890
                        </p>
                        <p className="d-flex align-items-center gap-2">
                            <MailIcon size={15} /> support@animalsale.com
                        </p>
                        <p className="d-flex align-items-center gap-2">
                            <LocationIcon size={15} /> All India
                        </p>
                        <p className="d-flex align-items-center gap-2">
                            <HeadsetIcon size={15} /> 24/7 Customer Support
                        </p>

                        <h6 className="mt-3">Download App</h6>
                        <div>
                            <span className="as-store-badge">
                                <span>▶</span>
                                <span>
                                    <span className="store-sub d-block">GET IT ON</span>
                                    <span className="store-main">Google Play</span>
                                </span>
                            </span>
                            <span className="as-store-badge">
                                <span></span>
                                <span>
                                    <span className="store-sub d-block">Download on the</span>
                                    <span className="store-main">App Store</span>
                                </span>
                            </span>
                        </div>
                    </div>

                </div>
            </div>

            {/* BOTTOM BAR */}
            <div className="as-footer-bottom">
                <div className="container d-flex flex-wrap justify-content-between align-items-center">
                    <span>© 2024 AnimalSale. All rights reserved.</span>
                    <span>
                        <a href="#" onClick={(e) => e.preventDefault()}>Privacy Policy</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>Terms of Service</a>
                        <a href="#" onClick={(e) => e.preventDefault()}>Refund Policy</a>
                    </span>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
