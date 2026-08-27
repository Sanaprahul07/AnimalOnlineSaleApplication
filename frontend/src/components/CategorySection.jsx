import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    getAllAnimals
} from "../services/AnimalService";

// =====================================================
// EXISTING CATEGORY IMAGES
// =====================================================

import cowImg from "../assets/cowimg.png";
import buffaloImg from "../assets/buffal.jpg";
import goatImg from "../assets/goat1.jpg";
import sheepImg from "../assets/sheep.jpg";
import horseImg from "../assets/MarwariHorse.png";
import dogImg from "../assets/Dog.png";
import catImg from "../assets/Cat.png";

// =====================================================
// AVAILABLE ASSET IMAGES
// =====================================================

import oxImg from "../assets/ox.png";
import bullImg from "../assets/Bull.png";
import donkeyImg from "../assets/Donkey.png";
import camelImg from "../assets/Camel.png";
import rabbitImg from "../assets/rabbit.png";
import pigImg from "../assets/Pig.png";
import elephantImg from "../assets/Elephant.png";
import deerImg from "../assets/Deer.png";
import yakImg from "../assets/Yak.png";
import gooseImg from "../assets/Goose.png";
import ostrichImg from "../assets/Ostrich.png";
import quailImg from "../assets/Quail.png";

// =====================================================
// RELATED AVAILABLE ASSETS
// =====================================================

import rajaImg from "../assets/Raja.png";

// =====================================================
// ANIMAL CATEGORIES
// TOTAL = 30
// =====================================================

function CategorySection() {

    const navigate = useNavigate();

    // =================================================
    // 30 ANIMAL CATEGORIES
    // =================================================

    const categories = [
        {
            name: "Cow",
            image: cowImg
        },
        {
            name: "Buffalo",
            image: buffaloImg
        },
        {
            name: "Ox",
            image: oxImg
        },
        {
            name: "Bull",
            image: bullImg
        },
        {
            name: "Goat",
            image: goatImg
        },
        {
            name: "Sheep",
            image: sheepImg
        },
        {
            name: "Horse",
            image: horseImg
        },
        {
            name: "Donkey",
            image: donkeyImg
        },
        {
            name: "Camel",
            image: camelImg
        },
        {
            name: "Dog",
            image: dogImg
        },
        {
            name: "Cat",
            image: catImg
        },
        {
            name: "Rabbit",
            image: rabbitImg
        },
        {
            name: "Pig",
            image: pigImg
        },
        {
            name: "Elephant",
            image: elephantImg
        },
        {
            name: "Deer",
            image: deerImg
        },
        {
            name: "Yak",
            image: yakImg
        },
        {
            name: "Mule",
            image: rajaImg
        },
        {
            name: "Chicken",
            emoji: "🐔"
        },
        {
            name: "Duck",
            emoji: "🦆"
        },
        {
            name: "Turkey",
            emoji: "🦃"
        },
        {
            name: "Goose",
            image: gooseImg
        },
        {
            name: "Pigeon",
            emoji: "🕊️"
        },
        {
            name: "Parrot",
            emoji: "🦜"
        },
        {
            name: "Peacock",
            emoji: "🦚"
        },
        {
            name: "Quail",
            image: quailImg
        },
        {
            name: "Fish",
            emoji: "🐟"
        },
        {
            name: "Turtle",
            emoji: "🐢"
        },
        {
            name: "Ostrich",
            image: ostrichImg
        },
        {
            name: "Emu",
            emoji: "🐦"
        },
        {
            name: "Guinea Fowl",
            emoji: "🐦"
        }
    ];

    // =================================================
    // CATEGORY COUNTS
    // =================================================

    const [categoryCounts, setCategoryCounts] =
        useState({});

    // =================================================
    // CURRENT PAGE
    // =================================================

    const [currentPage, setCurrentPage] =
        useState(0);

    // =================================================
    // SHOW 14 ANIMALS AT A TIME
    // =================================================

    const categoriesPerPage = 14;

    // =================================================
    // LOAD ANIMALS FROM BACKEND
    // =================================================

    useEffect(() => {

        const loadCategoryCounts = async () => {

            try {

                const response =
                    await getAllAnimals();

                const animals =
                    Array.isArray(response?.data)
                        ? response.data
                        : [];

                // =====================================
                // CREATE COUNTS
                // =====================================

                const counts = {};

                categories.forEach((category) => {

                    counts[category.name] = 0;

                });

                // =====================================
                // AUTOMATIC COUNT
                // =====================================

                animals.forEach((animal) => {

                    if (!animal?.category) {
                        return;
                    }

                    const animalCategory =
                        String(
                            animal.category
                        ).trim();

                    if (
                        Object.prototype.hasOwnProperty.call(
                            counts,
                            animalCategory
                        )
                    ) {

                        counts[animalCategory] += 1;

                    }

                });

                setCategoryCounts(counts);

            } catch (error) {

                console.error(
                    "Failed to load animal category counts:",
                    error
                );

                // =====================================
                // BACKEND ERROR
                // SHOW ZERO
                // =====================================

                const emptyCounts = {};

                categories.forEach((category) => {

                    emptyCounts[category.name] = 0;

                });

                setCategoryCounts(
                    emptyCounts
                );

            }

        };

        loadCategoryCounts();

    }, []);

    // =================================================
    // PAGINATION
    // =================================================

    const startIndex =
        currentPage *
        categoriesPerPage;

    const visibleCategories =
        categories.slice(
            startIndex,
            startIndex + categoriesPerPage
        );

    // =================================================
    // NEXT BUTTON AVAILABLE?
    // =================================================

    const hasNextPage =
        startIndex +
        categoriesPerPage <
        categories.length;

    // =================================================
    // PREVIOUS BUTTON AVAILABLE?
    // =================================================

    const hasPreviousPage =
        currentPage > 0;

    // =================================================
    // CATEGORY CLICK
    // =================================================

    const handleCategoryClick = (name) => {

        navigate(
            `/animals/${encodeURIComponent(name)}`
        );

    };

    // =================================================
    // NEXT
    // =================================================

    const handleNext = () => {

        if (hasNextPage) {

            setCurrentPage(
                currentPage + 1
            );

        }

    };

    // =================================================
    // PREVIOUS
    // =================================================

    const handlePrevious = () => {

        if (hasPreviousPage) {

            setCurrentPage(
                currentPage - 1
            );

        }

    };

    // =================================================
    // UI
    // =================================================

    return (

        <section className="as-section">

            <div className="container">

                {/* =====================================
                    HEADER
                ====================================== */}

                <div
                    className="
                        d-flex
                        justify-content-between
                        align-items-center
                        mb-4
                    "
                >

                    {/* =================================
                        TITLE
                    ================================== */}

                    <h2 className="as-section-title mb-0">

                        Animal Categories

                    </h2>

                    {/* =================================
                        RIGHT SIDE CONTROLS
                    ================================== */}

                    <div
                        className="
                            d-flex
                            align-items-center
                            gap-3
                        "
                    >

                        {/* =============================
                            VIEW ALL
                        ============================== */}

                        <button
                            type="button"
                            className="
                                as-link-green
                                btn
                                btn-link
                                p-0
                            "
                            onClick={() =>
                                navigate(
                                    "/animals/all"
                                )
                            }
                        >

                            View All Categories

                        </button>

                        {/* =============================
                            PREVIOUS BUTTON
                        ============================== */}

                        <button
                            type="button"
                            onClick={handlePrevious}
                            disabled={
                                !hasPreviousPage
                            }
                            aria-label="Previous 14 animals"
                            title="Previous 14"
                            style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                                border:
                                    "1px solid #198754",
                                backgroundColor:
                                    hasPreviousPage
                                        ? "#198754"
                                        : "#e9ecef",
                                color:
                                    hasPreviousPage
                                        ? "#ffffff"
                                        : "#adb5bd",
                                fontSize: "20px",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor:
                                    hasPreviousPage
                                        ? "pointer"
                                        : "not-allowed",
                                padding: 0
                            }}
                        >

                            ◀

                        </button>

                        {/* =============================
                            NEXT BUTTON
                        ============================== */}

                        <button
                            type="button"
                            onClick={handleNext}
                            disabled={
                                !hasNextPage
                            }
                            aria-label="Next 14 animals"
                            title="Next 14"
                            style={{
                                width: "38px",
                                height: "38px",
                                borderRadius: "50%",
                                border:
                                    "1px solid #198754",
                                backgroundColor:
                                    hasNextPage
                                        ? "#198754"
                                        : "#e9ecef",
                                color:
                                    hasNextPage
                                        ? "#ffffff"
                                        : "#adb5bd",
                                fontSize: "20px",
                                fontWeight: "bold",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                cursor:
                                    hasNextPage
                                        ? "pointer"
                                        : "not-allowed",
                                padding: 0
                            }}
                        >

                            ▶

                        </button>

                    </div>

                </div>

                {/* =====================================
                    ANIMAL GRID
                ====================================== */}

                <div className="row g-4">

                    {visibleCategories.map(
                        (category) => (

                            <div
                                className="
                                    col-lg
                                    col-md-3
                                    col-sm-4
                                    col-6
                                "
                                key={category.name}
                            >

                                {/* =========================
                                    CATEGORY CARD
                                ========================== */}

                                <div
                                    className="as-cat-card"
                                    onClick={() =>
                                        handleCategoryClick(
                                            category.name
                                        )
                                    }
                                >

                                    {/* =====================
                                        IMAGE / EMOJI
                                    ====================== */}

                                    <div
                                        className="as-cat-thumb"
                                    >

                                        {category.image ? (

                                            <img
                                                src={
                                                    category.image
                                                }
                                                alt={
                                                    category.name
                                                }
                                            />

                                        ) : (

                                            <span
                                                className="
                                                    as-cat-emoji
                                                "
                                            >

                                                {
                                                    category.emoji
                                                }

                                            </span>

                                        )}

                                    </div>

                                    {/* =====================
                                        ANIMAL NAME
                                    ====================== */}

                                    <h6
                                        className="
                                            as-cat-name
                                        "
                                    >

                                        {
                                            category.name
                                        }

                                    </h6>

                                    {/* =====================
                                        AUTOMATIC COUNT
                                    ====================== */}

                                    <div
                                        className="
                                            as-cat-count
                                        "
                                    >

                                        (
                                        {
                                            categoryCounts[
                                                category.name
                                            ] ?? 0
                                        }
                                        )

                                    </div>

                                </div>

                            </div>

                        )
                    )}

                </div>

            </div>

        </section>

    );

}

export default CategorySection;
