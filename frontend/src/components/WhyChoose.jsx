import {
    PawIcon,
    ShieldCheck,
    TagIcon,
    LeafIcon,
    LockIcon
} from "./Icons";

// =====================================================
// WHY CHOOSE ANIMALSALE — 5 feature cards
// =====================================================

function WhyChoose() {
    const features = [
        {
            icon: <PawIcon />,
            title: "Wide Variety",
            text: "30+ animal categories"
        },
        {
            icon: <ShieldCheck />,
            title: "Verified Sellers",
            text: "All sellers are verified"
        },
        {
            icon: <TagIcon />,
            title: "Best Prices",
            text: "Competitive prices guaranteed"
        },
        {
            icon: <LeafIcon />,
            title: "Healthy Animals",
            text: "Quality animals assured"
        },
        {
            icon: <LockIcon />,
            title: "Safe & Secure",
            text: "100% secure transactions"
        }
    ];

    return (
        <section className="as-section as-section-alt">
            <div className="container">
                <h2 className="as-section-title center mb-5">
                    Why Choose AnimalSale?
                </h2>

                <div className="row g-4">
                    {features.map((feature) => (
                        <div
                            className="col-lg col-md-4 col-sm-6"
                            key={feature.title}
                        >
                            <div className="as-why-card">
                                <div className="as-why-icon">{feature.icon}</div>
                                <h6>{feature.title}</h6>
                                <p>{feature.text}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyChoose;
