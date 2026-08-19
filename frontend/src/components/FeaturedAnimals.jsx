import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { getAllAnimals } from "../services/AnimalService";

import cowImg from "../assets/cowimg.png";
import buffaloImg from "../assets/buffal.jpg";
import goatImg from "../assets/goat1.jpg";
import sheepImg from "../assets/sheep.jpg";

import BoerGoat from "../assets/BoerGoat.png";
import Gaur from "../assets/Gaur.png";
import Jersey from "../assets/jersey.png";
import KathiawariHorse from "../assets/KathiawariHorse.png";
import MarwariHorse from "../assets/MarwariHorse.png";
import MurrahBuffalo from "../assets/MurrahBuffalo.png";
import OsmanabadiGoat from "../assets/OsmanabadiGoat.png";
import PandharpuriBuffalo from "../assets/PandharpuriBuffalo.png";
import Raja from "../assets/Raja.png";
import SirohiGoat from "../assets/SirohiGoat.png";


// =====================================================
// FEATURED / LATEST ANIMALS
// =====================================================

function FeaturedAnimals() {

    const navigate = useNavigate();


    // =================================================
    // STATES
    // =================================================

    const [animals, setAnimals] = useState([]);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState("");


    // =================================================
    // LOCAL ANIMAL IMAGE MAP
    // =================================================

    const animalImages = {

        cow: cowImg,

        buffalo: buffaloImg,

        goat: goatImg,

        sheep: sheepImg,

        horse: KathiawariHorse,

        dog: Raja,

        cat: Raja,

        poultry: Raja,

        boer: BoerGoat,

        gaur: Gaur,

        jersey: Jersey,

        kathiawari: KathiawariHorse,

        marwari: MarwariHorse,

        murrah: MurrahBuffalo,

        osmanabadi: OsmanabadiGoat,

        pandharpuri: PandharpuriBuffalo,

        sirohi: SirohiGoat,

    };


    // =================================================
    // GET IMAGE BASED ON ANIMAL DATA
    // =================================================

    const getAnimalImage = (animal) => {

        // ---------------------------------------------
        // 1. BACKEND IMAGE URL
        // ---------------------------------------------

        if (
            animal?.imageUrl &&
            animal.imageUrl.trim() !== ""
        ) {

            return animal.imageUrl;

        }


        // ---------------------------------------------
        // CATEGORY
        // ---------------------------------------------

        const category =
            String(
                animal?.category || ""
            )
                .toLowerCase()
                .trim();


        // ---------------------------------------------
        // BREED
        // ---------------------------------------------

        const breed =
            String(
                animal?.breed || ""
            )
                .toLowerCase()
                .trim();


        // ---------------------------------------------
        // BREED FIRST
        // ---------------------------------------------

        if (breed.includes("boer")) {

            return BoerGoat;

        }

        if (breed.includes("gaur")) {

            return Gaur;

        }

        if (breed.includes("jersey")) {

            return Jersey;

        }

        if (breed.includes("kathiawari")) {

            return KathiawariHorse;

        }

        if (breed.includes("marwari")) {

            return MarwariHorse;

        }

        if (breed.includes("murrah")) {

            return MurrahBuffalo;

        }

        if (breed.includes("osmanabadi")) {

            return OsmanabadiGoat;

        }

        if (breed.includes("pandharpuri")) {

            return PandharpuriBuffalo;

        }

        if (breed.includes("sirohi")) {

            return SirohiGoat;

        }


        // ---------------------------------------------
        // CATEGORY IMAGE
        // ---------------------------------------------

        if (animalImages[category]) {

            return animalImages[category];

        }


        // ---------------------------------------------
        // DEFAULT IMAGE
        // ---------------------------------------------

        return cowImg;

    };


    // =================================================
    // LOAD ALL ANIMALS
    // =================================================

    const loadAnimals = async () => {

        try {

            setLoading(true);

            setError("");


            const response =
                await getAllAnimals();


            console.log(
                "HOME PAGE ANIMALS:",
                response.data
            );


            if (
                Array.isArray(
                    response.data
                )
            ) {

                setAnimals(
                    response.data
                );

            } else {

                setAnimals([]);

            }

        } catch (err) {

            console.error(
                "LOAD ANIMALS ERROR:",
                err
            );


            setError(
                "Unable to load animals from server."
            );

        } finally {

            setLoading(false);

        }

    };


    // =================================================
    // LOAD WHEN HOME PAGE OPENS
    // =================================================

    useEffect(() => {

        loadAnimals();

    }, []);


    // =================================================
    // LOADING
    // =================================================

    if (loading) {

        return (

            <section className="py-5 bg-light">

                <div className="container text-center">

                    <div
                        className="spinner-border text-success mb-3"
                        role="status"
                    >
                    </div>

                    <h5 className="fw-bold">
                        Loading Animals...
                    </h5>

                    <p className="text-muted mb-0">
                        Please wait while we load the latest animals.
                    </p>

                </div>

            </section>

        );

    }


    // =================================================
    // ERROR
    // =================================================

    if (error) {

        return (

            <section className="py-5 bg-light">

                <div className="container">

                    <div className="alert alert-danger text-center">

                        {error}

                        <br />

                        <button
                            className="btn btn-outline-danger btn-sm mt-2"
                            onClick={loadAnimals}
                        >
                            Try Again
                        </button>

                    </div>

                </div>

            </section>

        );

    }


    // =================================================
    // MAIN UI
    // =================================================

    return (

        <section
            className="py-5 bg-light"
            id="latest-animals"
        >

            <div className="container">


                {/* =================================================
                        SECTION HEADER
                ================================================= */}

                <div className="d-flex justify-content-between align-items-center mb-4">

                    <div>

                        <h2 className="fw-bold mb-1">
                            Latest Animals
                        </h2>

                        <p className="text-muted mb-0">
                            Find healthy animals from trusted sellers
                        </p>

                    </div>


                    {animals.length > 0 && (

                        <span className="badge bg-success fs-6">

                            {animals.length} Animals

                        </span>

                    )}

                </div>


                {/* =================================================
                        NO ANIMALS
                ================================================= */}

                {animals.length === 0 ? (

                    <div className="text-center py-5">

                        <div
                            style={{
                                fontSize: "55px"
                            }}
                        >
                            🐄
                        </div>

                        <h4 className="fw-bold mt-3">
                            No Animals Available
                        </h4>

                        <p className="text-muted">
                            Seller listings will appear here.
                        </p>

                    </div>

                ) : (


                    /* =================================================
                            MULTIPLE ANIMAL CARDS
                    ================================================= */

                    <div className="row g-4">


                        {animals.map(
                            (animal) => (

                                <div
                                    className="col-xl-3 col-lg-4 col-md-6 col-sm-6"
                                    key={animal.id}
                                >

                                    <div
                                        className="card h-100 border-0 shadow-sm"
                                        style={{
                                            borderRadius: "12px",
                                            overflow: "hidden",
                                            cursor: "pointer"
                                        }}
                                        onClick={() =>
                                            navigate(
                                                `/animal/${animal.id}`
                                            )
                                        }
                                    >


                                        {/* =================================
                                                ANIMAL IMAGE
                                        ================================= */}

                                        <div
                                            style={{
                                                height: "220px",
                                                backgroundColor: "#f5f5f5",
                                                overflow: "hidden"
                                            }}
                                        >

                                            <img
                                                src={
                                                    getAnimalImage(
                                                        animal
                                                    )
                                                }
                                                alt={
                                                    animal.animalName ||
                                                    animal.breed ||
                                                    "Animal"
                                                }
                                                style={{
                                                    width: "100%",
                                                    height: "100%",
                                                    objectFit: "cover"
                                                }}
                                                onError={(e) => {

                                                    e.currentTarget.src =
                                                        cowImg;

                                                }}
                                            />

                                        </div>


                                        {/* =================================
                                                CARD BODY
                                        ================================= */}

                                        <div className="card-body">


                                            {/* CATEGORY */}

                                            <div className="d-flex justify-content-between align-items-center mb-2">

                                                <span
                                                    className="badge bg-success"
                                                >
                                                    {animal.category ||
                                                        "Animal"}
                                                </span>


                                                {animal.available !==
                                                    false && (

                                                    <small className="text-success fw-semibold">

                                                        Available

                                                    </small>

                                                )}

                                            </div>


                                            {/* ANIMAL NAME */}

                                            <h5
                                                className="fw-bold mb-1"
                                            >

                                                {animal.animalName ||
                                                    "Animal"}

                                            </h5>


                                            {/* BREED */}

                                            {animal.breed && (

                                                <p className="text-muted mb-2">

                                                    Breed:{" "}

                                                    <strong>
                                                        {animal.breed}
                                                    </strong>

                                                </p>

                                            )}


                                            {/* AGE + GENDER */}

                                            <div
                                                className="d-flex gap-2 mb-2"
                                            >

                                                {animal.age && (

                                                    <small
                                                        className="text-muted"
                                                    >
                                                        Age:{" "}
                                                        {animal.age}
                                                    </small>

                                                )}


                                                {animal.gender && (

                                                    <small
                                                        className="text-muted"
                                                    >
                                                        •{" "}
                                                        {animal.gender}
                                                    </small>

                                                )}

                                            </div>


                                            {/* PRICE */}

                                            <h5
                                                className="fw-bold text-success mb-2"
                                            >

                                                ₹
                                                {animal.price
                                                    ? Number(
                                                        animal.price
                                                    ).toLocaleString(
                                                        "en-IN"
                                                    )
                                                    : "Price not available"
                                                }

                                            </h5>


                                            {/* LOCATION */}

                                            {(
                                                animal.location ||
                                                animal.city
                                            ) && (

                                                <p
                                                    className="text-muted mb-3"
                                                >

                                                    📍{" "}

                                                    {
                                                        animal.location ||
                                                        animal.city
                                                    }

                                                </p>

                                            )}


                                            {/* VIEW BUTTON */}

                                            <button
                                                type="button"
                                                className="btn btn-success w-100 fw-semibold"
                                                onClick={(e) => {

                                                    e.stopPropagation();

                                                    navigate(
                                                        `/animal/${animal.id}`
                                                    );

                                                }}
                                            >

                                                View Animal

                                            </button>

                                        </div>

                                    </div>

                                </div>

                            )
                        )}

                    </div>

                )}

            </div>

        </section>

    );

}


export default FeaturedAnimals;