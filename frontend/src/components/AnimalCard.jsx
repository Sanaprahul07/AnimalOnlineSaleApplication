import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AnimalCard({ animal }) {

    const navigate = useNavigate();

    // ==========================================
    // SELLER UPLOADED FRONT PHOTO
    // ==========================================

    const frontImageUrl =
        typeof animal?.frontImageUrl === "string"
            ? animal.frontImageUrl.trim()
            : "";

    // ==========================================
    // IMAGE ERROR STATE
    // ==========================================

    const [imageError, setImageError] = useState(false);

    // ==========================================
    // CARD
    // ==========================================

    return (
        <div className="card shadow-sm h-100 border-0 rounded-4">

            {/* ==================================
                SELLER UPLOADED FRONT IMAGE
            ================================== */}

            <div
                style={{
                    width: "100%",
                    height: "220px",
                    backgroundColor: "#f5f5f5",
                    overflow: "hidden"
                }}
            >

                {frontImageUrl && !imageError ? (

                    <img
                        src={frontImageUrl}
                        alt={
                            animal?.animalName ||
                            animal?.breed ||
                            "Animal"
                        }
                        className="card-img-top"
                        style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover"
                        }}
                        onError={() => {
                            setImageError(true);
                        }}
                    />

                ) : (

                    <div
                        className="d-flex align-items-center justify-content-center h-100 text-muted"
                        style={{
                            fontSize: "14px",
                            fontWeight: "600"
                        }}
                    >
                        Image not available
                    </div>

                )}

            </div>

            <div className="card-body">

                {/* ==================================
                    PRICE
                ================================== */}

                <h4 className="text-success fw-bold">
                    ₹{" "}
                    {animal?.price
                        ? Number(
                            animal.price
                        ).toLocaleString("en-IN")
                        : "Price not available"}
                </h4>

                {/* ==================================
                    ANIMAL NAME
                ================================== */}

                <h5 className="fw-bold">
                    {animal?.animalName || "Animal"}
                </h5>

                {/* ==================================
                    BREED
                ================================== */}

                <p className="mb-1">
                    <strong>Breed :</strong>{" "}
                    {animal?.breed || "Not available"}
                </p>

                {/* ==================================
                    CATEGORY
                ================================== */}

                <p className="mb-1">
                    <strong>Category :</strong>{" "}
                    {animal?.category || "Not available"}
                </p>

                {/* ==================================
                    LOCATION
                ================================== */}

                <p className="mb-3">
                    📍{" "}
                    {animal?.location ||
                        "Location not available"}
                </p>

                {/* ==================================
                    VIEW DETAILS
                ================================== */}

                <button
                    type="button"
                    className="btn btn-success w-100 rounded-pill"
                    onClick={() =>
                        navigate(
                            `/animal/${animal?.id}`
                        )
                    }
                >
                    View Details
                </button>

            </div>

        </div>
    );
}

export default AnimalCard;