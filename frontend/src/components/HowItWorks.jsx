import { Fragment } from "react";
import {
    BrowseIcon,
    ChatIcon,
    HandshakeIcon,
    TruckIcon,
    ChevronRight
} from "./Icons";

// =====================================================
// HOW ANIMALSALE WORKS — 4 steps
// =====================================================

function HowItWorks() {
    const steps = [
        {
            icon: <BrowseIcon />,
            title: "Browse Animals",
            text: "Explore thousands of animals across different categories"
        },
        {
            icon: <ChatIcon />,
            title: "Connect with Sellers",
            text: "Chat with verified sellers and ask your questions"
        },
        {
            icon: <HandshakeIcon />,
            title: "Make a Deal",
            text: "Negotiate price and finalize the deal that works for you"
        },
        {
            icon: <TruckIcon />,
            title: "Safe Transaction",
            text: "Complete secure transaction and take your animal home"
        }
    ];

    return (
        <section className="as-section">
            <div className="container">
                <h2 className="as-section-title center mb-5">
                    How AnimalSale Works
                </h2>

                <div className="as-steps">
                    {steps.map((step, index) => (
                        <Fragment key={step.title}>
                            <div className="as-step">
                                <div className="as-step-icon">{step.icon}</div>
                                <h6>{step.title}</h6>
                                <p>{step.text}</p>
                            </div>

                            {index < steps.length - 1 && (
                                <div className="as-step-arrow">
                                    <ChevronRight size={22} />
                                </div>
                            )}
                        </Fragment>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
