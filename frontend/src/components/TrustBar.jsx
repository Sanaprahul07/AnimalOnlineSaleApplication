import {
    ShieldCheck,
    CreditCard,
    BoxIcon,
    HeadsetIcon
} from "./Icons";

// =====================================================
// TRUST BAR — 4 reassurance items
// =====================================================

function TrustBar() {
    const items = [
        {
            icon: <ShieldCheck />,
            title: "Verified Sellers",
            text: "Trusted & verified sellers only"
        },
        {
            icon: <CreditCard />,
            title: "Secure Payments",
            text: "100% safe & secure transactions"
        },
        {
            icon: <BoxIcon />,
            title: "Easy Ordering",
            text: "Simple & hassle-free ordering process"
        },
        {
            icon: <HeadsetIcon />,
            title: "24/7 Support",
            text: "We're here to help you anytime"
        }
    ];

    return (
        <section className="as-trustbar">
            <div className="container">
                <div className="row g-4">
                    {items.map((item) => (
                        <div className="col-lg-3 col-md-6" key={item.title}>
                            <div className="as-trust-item">
                                <div className="as-trust-icon">{item.icon}</div>
                                <div>
                                    <h6>{item.title}</h6>
                                    <p>{item.text}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default TrustBar;
