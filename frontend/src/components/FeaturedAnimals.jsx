import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAnimals } from "../services/AnimalService";

// Fallback sample images (used only when the API returns nothing)
import hfImg from "../assets/HF.png";
import cowImg from "../assets/cowimg.png";
import murrahImg from "../assets/MurrahBuffalo.png";
import goatImg from "../assets/goat1.jpg";
import dogImg from "../assets/Dog.png";

// =====================================================
// FEATURED ANIMALS
// Loads real listings; falls back to samples if empty.
// Shows 10 animals per page.
// =====================================================

const SAMPLE_ANIMALS = [
    {
        id: "s1",
        animalName: "HF Cow",
        price: 65000,
        age: "2 Years",
        gender: "Female",
        location: "Punjab",
        image: hfImg
    },
    {
        id: "s2",
        animalName: "Sahiwal Cow",
        price: 55000,
        age: "3 Years",
        gender: "Female",
        location: "Haryana",
        image: cowImg
    },
    {
        id: "s3",
        animalName: "Murrah Buffalo",
        price: 75000,
        age: "4 Years",
        gender: "Female",
        location: "Uttar Pradesh",
        image: murrahImg
    },
    {
        id: "s4",
        animalName: "Beetal Goat",
        price: 8500,
        age: "1.5 Years",
        gender: "Male",
        location: "Rajasthan",
        image: goatImg
    },
    {
        id: "s5",
        animalName: "Golden Retriever",
        price: 18000,
        age: "8 Months",
        gender: "Male",
        location: "Maharashtra",
        image: dogImg
    }
];

// Number of animals shown on one page
const ANIMALS_PER_PAGE = 10;

function FeaturedAnimals() {
    const navigate = useNavigate();

    const [animals, setAnimals] = useState([]);
    const [usingSamples, setUsingSamples] = useState(false);
    const [loading, setLoading] = useState(true);

    // Current page
    const [currentPage, setCurrentPage] = useState(0);

    useEffect(() => {
        let active = true;

        const loadAnimals = async () => {
            try {
                setLoading(true);

                const response = await getAllAnimals();

                if (!active) return;

                if (
                    Array.isArray(response.data) &&
                    response.data.length > 0
                ) {
                    // Existing backend data - NO backend changes
                    setAnimals(response.data);
                    setUsingSamples(false);
                } else {
                    // Existing fallback behavior
                    setAnimals(SAMPLE_ANIMALS);
                    setUsingSamples(true);
                }
            } catch (err) {
                // Backend unavailable — existing fallback behavior
                console.error("LOAD ANIMALS ERROR:", err);

                if (active) {
                    setAnimals(SAMPLE_ANIMALS);
                    setUsingSamples(true);
                }
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadAnimals();

        return () => {
            active = false;
        };
    }, []);

    // =====================================================
    // PAGINATION
    // Only Featured Animals pagination is handled here.
    // =====================================================

    const totalPages = Math.ceil(
        animals.length / ANIMALS_PER_PAGE
    );

    const startIndex = currentPage * ANIMALS_PER_PAGE;

    const currentAnimals = animals.slice(
        startIndex,
        startIndex + ANIMALS_PER_PAGE
    );

    const goToNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    const openAnimal = (animal) => {
        // Samples have no real detail page.
        if (usingSamples) return;

        navigate(`/animal/${animal.id}`);
    };

    const priceText = (price) =>
        price
            ? `₹${Number(price).toLocaleString("en-IN")}`
            : "Price on request";

    const imageOf = (animal) =>
        animal.image || animal.frontImageUrl;

    return (
        <section className="as-section as-section-alt">
            <div className="container">

                {/* HEADER */}
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="as-section-title">
                        Featured Animals
                    </h2>

                    <button
                        type="button"
                        className="as-link-green btn btn-link p-0"
                        onClick={() => navigate("/animals/all")}
                    >
                        View All Animals
                    </button>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div
                            className="spinner-border as-text-green"
                            role="status"
                        />
                    </div>
                ) : (
                    <>
                        {/* =====================================================
                            FEATURED ANIMALS
                            Only 10 animals are rendered for the current page.
                        ====================================================== */}

                        <div
                            className="row g-3"
                        >
                            {currentAnimals.map((animal) => (
                                <div
                                    className="col-12 col-sm-6 col-md-4 col-lg-3 col-xl"
                                    key={animal.id}
                                >
                                    <div
                                        className="as-animal-card h-100"
                                        onClick={() =>
                                            openAnimal(animal)
                                        }
                                        style={{
                                            cursor: usingSamples
                                                ? "default"
                                                : "pointer"
                                        }}
                                    >
                                        <div className="as-animal-media">
                                            <span className="as-featured-badge">
                                                Featured
                                            </span>

                                            {imageOf(animal) ? (
                                                <img
                                                    src={imageOf(animal)}
                                                    alt={
                                                        animal.animalName ||
                                                        "Animal"
                                                    }
                                                    onError={(e) => {
                                                        e.currentTarget.onerror =
                                                            null;
                                                        e.currentTarget.src =
                                                            cowImg;
                                                    }}
                                                />
                                            ) : (
                                                <div className="d-flex align-items-center justify-content-center h-100 text-muted">
                                                    No image
                                                </div>
                                            )}
                                        </div>

                                        <div className="as-animal-body">
                                            <h6 className="as-animal-name">
                                                {animal.animalName ||
                                                    "Animal"}
                                            </h6>

                                            <div className="as-animal-price">
                                                {priceText(
                                                    animal.price
                                                )}
                                            </div>

                                            <p className="as-animal-meta">
                                                {[
                                                    animal.age,
                                                    animal.gender
                                                ]
                                                    .filter(Boolean)
                                                    .join(" • ")}
                                            </p>

                                            <p className="as-animal-meta">
                                                {animal.location ||
                                                    animal.city ||
                                                    ""}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* =====================================================
                            PAGINATION BUTTONS
                            Buttons are shown BELOW the animals.
                        ====================================================== */}

                        {totalPages > 1 && (
                            <div
                                className="d-flex justify-content-center align-items-center gap-3 mt-4"
                            >
                                {/* PREVIOUS */}
                                <button
                                    type="button"
                                    className="btn btn-outline-success px-4"
                                    onClick={goToPreviousPage}
                                    disabled={currentPage === 0}
                                >
                                    ← Previous
                                </button>

                                {/* PAGE NUMBER */}
                                <span
                                    className="fw-semibold"
                                    style={{
                                        minWidth: "90px",
                                        textAlign: "center"
                                    }}
                                >
                                    {currentPage + 1} / {totalPages}
                                </span>

                                {/* NEXT */}
                                <button
                                    type="button"
                                    className="btn btn-success px-4"
                                    onClick={goToNextPage}
                                    disabled={
                                        currentPage === totalPages - 1
                                    }
                                >
                                    Next →
                                </button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
}

export default FeaturedAnimals;
