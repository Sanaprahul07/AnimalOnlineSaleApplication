import { useNavigate } from "react-router-dom";

import cowImg from "../assets/cowimg.png";
import buffaloImg from "../assets/buffal.jpg";
import goatImg from "../assets/goat1.jpg";
import sheepImg from "../assets/sheep.jpg";

function AnimalCard({ animal }) {

    const navigate = useNavigate();

    let image = cowImg;

    if (animal.category?.toLowerCase() === "buffalo") {
        image = buffaloImg;
    }
    else if (animal.category?.toLowerCase() === "goat") {
        image = goatImg;
    }
    else if (animal.category?.toLowerCase() === "sheep") {
        image = sheepImg;
    }

    return (

        <div className="card shadow-sm h-100 border-0 rounded-4">

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

                <h4 className="text-success fw-bold">
                    ₹ {animal.price}
                </h4>

                <h5 className="fw-bold">
                    {animal.animalName}
                </h5>

                <p className="mb-1">
                    <strong>Breed :</strong> {animal.breed}
                </p>

                <p className="mb-1">
                    <strong>Category :</strong> {animal.category}
                </p>

                <p className="mb-3">
                    📍 {animal.location}
                </p>

                <button
                    className="btn btn-success w-100 rounded-pill"
                    onClick={() => navigate(`/animal/${animal.id}`)}
                >
                    View Details
                </button>

            </div>

        </div>

    );
}

export default AnimalCard;