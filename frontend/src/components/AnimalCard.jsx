import { useNavigate } from "react-router-dom";

// ==========================================
// COW IMAGES
// ==========================================
import cowImg from "../assets/cowimg.png";
import hfImg from "../assets/HF.png";
import jerseyImg from "../assets/jersey.png";
import gaurImg from "../assets/Gaur.png";
import rajaImg from "../assets/Raja.png";

// ==========================================
// BUFFALO IMAGES
// ==========================================
import buffaloImg from "../assets/buffal.jpg";
import murrahBuffaloImg from "../assets/MurrahBuffalo.png";
import pandharpuriBuffaloImg from "../assets/PandharpuriBuffalo.png";

// ==========================================
// GOAT IMAGES
// ==========================================
import goatImg from "../assets/goat1.jpg";
import boerGoatImg from "../assets/BoerGoat.png";
import osmanabadiGoatImg from "../assets/OsmanabadiGoat.png";
import sirohiGoatImg from "../assets/SirohiGoat.png";

// ==========================================
// SHEEP IMAGE
// ==========================================
import sheepImg from "../assets/sheep.jpg";

// ==========================================
// HORSE IMAGES
// ==========================================
import marwariHorseImg from "../assets/MarwariHorse.png";
import kathiawariHorseImg from "../assets/KathiawariHorse.png";


function AnimalCard({ animal }) {

    const navigate = useNavigate();

    // ==========================================
    // GET ANIMAL DATA
    // ==========================================

    const animalName =
        animal.animalName?.toLowerCase() || "";

    const breed =
        animal.breed?.toLowerCase() || "";

    const category =
        animal.category?.toLowerCase() || "";


    // ==========================================
    // DEFAULT IMAGE
    // ==========================================

    let image = cowImg;


    // ==========================================
    // COW
    // ==========================================

    if (category === "cow") {

        // HF Cow / Holstein Friesian
        if (
            animalName.includes("hf") ||
            animalName.includes("holstein") ||
            breed.includes("hf") ||
            breed.includes("holstein")
        ) {

            image = hfImg;

        }

        // Jersey Cow
        else if (
            animalName.includes("jersey") ||
            breed.includes("jersey")
        ) {

            image = jerseyImg;

        }

        // Gaur
        else if (
            animalName.includes("gaur") ||
            breed.includes("gaur")
        ) {

            image = gaurImg;

        }

        // Raja
        else if (
            animalName.includes("raja")
        ) {

            image = rajaImg;

        }

        // Normal Cow
        else {

            image = cowImg;

        }
    }


    // ==========================================
    // BUFFALO
    // ==========================================

    else if (category === "buffalo") {

        // Murrah Buffalo
        if (
            animalName.includes("murrah") ||
            breed.includes("murrah")
        ) {

            image = murrahBuffaloImg;

        }

        // Pandharpuri Buffalo
        else if (
            animalName.includes("pandharpuri") ||
            breed.includes("pandharpuri")
        ) {

            image = pandharpuriBuffaloImg;

        }

        // Normal Buffalo
        else {

            image = buffaloImg;

        }
    }


    // ==========================================
    // GOAT
    // ==========================================

    else if (category === "goat") {

        // Boer Goat
        if (
            animalName.includes("boer") ||
            breed.includes("boer")
        ) {

            image = boerGoatImg;

        }

        // Osmanabadi Goat
        else if (
            animalName.includes("osmanabadi") ||
            breed.includes("osmanabadi")
        ) {

            image = osmanabadiGoatImg;

        }

        // Sirohi Goat
        else if (
            animalName.includes("sirohi") ||
            breed.includes("sirohi")
        ) {

            image = sirohiGoatImg;

        }

        // Normal Goat
        else {

            image = goatImg;

        }
    }


    // ==========================================
    // SHEEP
    // ==========================================

    else if (category === "sheep") {

        image = sheepImg;

    }


    // ==========================================
    // HORSE
    // ==========================================

    else if (category === "horse") {

        // Marwari Horse
        if (
            animalName.includes("marwari") ||
            breed.includes("marwari")
        ) {

            image = marwariHorseImg;

        }

        // Kathiawari Horse
        else if (
            animalName.includes("kathiawari") ||
            breed.includes("kathiawari")
        ) {

            image = kathiawariHorseImg;

        }

        // Default Horse
        else {

            image = marwariHorseImg;

        }
    }


    // ==========================================
    // RETURN CARD
    // ==========================================

    return (

        <div className="card shadow-sm h-100 border-0 rounded-4">

            {/* Animal Image */}

            <img
                src={image}
                alt={animal.animalName}
                className="card-img-top"
                style={{
                    height: "220px",
                    objectFit: "cover"
                }}
            />


            <div className="card-body">

                {/* Price */}

                <h4 className="text-success fw-bold">
                    ₹ {animal.price}
                </h4>


                {/* Animal Name */}

                <h5 className="fw-bold">
                    {animal.animalName}
                </h5>


                {/* Breed */}

                <p className="mb-1">
                    <strong>Breed :</strong>{" "}
                    {animal.breed}
                </p>


                {/* Category */}

                <p className="mb-1">
                    <strong>Category :</strong>{" "}
                    {animal.category}
                </p>


                {/* Location */}

                <p className="mb-3">
                    📍 {animal.location}
                </p>


                {/* View Details */}

                <button
                    className="btn btn-success w-100 rounded-pill"
                    onClick={() =>
                        navigate(`/animal/${animal.id}`)
                    }
                >
                    View Details
                </button>

            </div>

        </div>
    );
}


export default AnimalCard;