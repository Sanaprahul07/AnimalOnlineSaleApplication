import { useNavigate } from "react-router-dom";
import goatImg from "../assets/goat1.jpg";

// =====================================================
// SELL CTA BANNER
// =====================================================

function SellCTA() {
    const navigate = useNavigate();

    return (
        <section className="as-section">
            <div className="container">
                <div className="as-cta">
                    <div>
                        <h3>Want to Sell Your Animal?</h3>
                        <p>
                            Join thousands of satisfied sellers. List your animal
                            today and reach potential buyers across India.
                        </p>
                        <button
                            type="button"
                            className="btn as-btn-green btn-lg px-4"
                            onClick={() => navigate("/seller/register")}
                        >
                            List Your Animal Now
                        </button>
                    </div>

                    <img
                        src={goatImg}
                        alt="Sell your animal"
                        className="d-none d-md-block rounded-4"
                        style={{
                            width: 200,
                            height: 150,
                            objectFit: "cover"
                        }}
                    />
                </div>
            </div>
        </section>
    );
}

export default SellCTA;
