import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getAnimalById } from "../services/AnimalService";

function AnimalDetails() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [animal, setAnimal] = useState(null);
    const [loading, setLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    // ==========================================
    // GET ANIMAL DETAILS
    // ==========================================

    useEffect(() => {

        const fetchAnimal = async () => {

            try {

                setLoading(true);
                setErrorMessage("");

                const response = await getAnimalById(id);

                console.log(
                    "Animal Details Response:",
                    response.data
                );

                setAnimal(response.data);

            } catch (error) {

                console.error(
                    "Error getting animal details:",
                    error
                );

                if (error.response) {

                    setErrorMessage(
                        error.response.data?.message ||
                        "Animal details not found."
                    );

                } else {

                    setErrorMessage(
                        "Backend server is not running."
                    );
                }

            } finally {

                setLoading(false);
            }
        };

        fetchAnimal();

    }, [id]);


    // ==========================================
    // LOADING
    // ==========================================

    if (loading) {

        return (
            <div className="container mt-5">

                <div className="text-center">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    ></div>

                    <p className="mt-3">
                        Loading animal details...
                    </p>

                </div>

            </div>
        );
    }


    // ==========================================
    // ERROR
    // ==========================================

    if (errorMessage) {

        return (
            <div className="container mt-5">

                <div className="alert alert-danger">

                    <strong>Error:</strong>{" "}
                    {errorMessage}

                </div>

                <button
                    className="btn btn-secondary"
                    onClick={() => navigate(-1)}
                >
                    ← Back
                </button>

            </div>
        );
    }


    // ==========================================
    // ANIMAL NOT FOUND
    // ==========================================

    if (!animal) {

        return (
            <div className="container mt-5">

                <div className="alert alert-warning">
                    Animal not found.
                </div>

            </div>
        );
    }


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="container mt-4 mb-5">

            {/* ==================================
                BACK BUTTON
            ================================== */}

            <button
                className="btn btn-secondary mb-3"
                onClick={() => navigate(-1)}
            >
                ← Back
            </button>


            {/* ==================================
                MAIN CARD
            ================================== */}

            <div className="card shadow border-0">

                <div className="card-body p-4">

                    <h2 className="text-success fw-bold mb-4">
                        {animal.animalName}
                    </h2>


                    {/* ==================================
                        ANIMAL PHOTOS
                    ================================== */}

                    <h5 className="fw-bold mb-3">
                        Animal Photos
                    </h5>

                    <div className="row mb-4">

                        {/* FRONT PHOTO */}

                        <div className="col-md-4 mb-3">

                            <div className="card h-100">

                                {animal.frontImageUrl ? (

                                    <img
                                        src={animal.frontImageUrl}
                                        className="card-img-top"
                                        alt="Front Animal"
                                        style={{
                                            height: "250px",
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="d-flex align-items-center justify-content-center bg-light"
                                        style={{
                                            height: "250px"
                                        }}
                                    >
                                        No Front Photo
                                    </div>

                                )}

                                <div className="card-body text-center">

                                    <strong>
                                        Front Photo
                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* SIDE PHOTO */}

                        <div className="col-md-4 mb-3">

                            <div className="card h-100">

                                {animal.sideImageUrl ? (

                                    <img
                                        src={animal.sideImageUrl}
                                        className="card-img-top"
                                        alt="Side Animal"
                                        style={{
                                            height: "250px",
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="d-flex align-items-center justify-content-center bg-light"
                                        style={{
                                            height: "250px"
                                        }}
                                    >
                                        No Side Photo
                                    </div>

                                )}

                                <div className="card-body text-center">

                                    <strong>
                                        Side Photo
                                    </strong>

                                </div>

                            </div>

                        </div>


                        {/* BACK PHOTO */}

                        <div className="col-md-4 mb-3">

                            <div className="card h-100">

                                {animal.backImageUrl ? (

                                    <img
                                        src={animal.backImageUrl}
                                        className="card-img-top"
                                        alt="Back Animal"
                                        style={{
                                            height: "250px",
                                            objectFit: "cover"
                                        }}
                                    />

                                ) : (

                                    <div
                                        className="d-flex align-items-center justify-content-center bg-light"
                                        style={{
                                            height: "250px"
                                        }}
                                    >
                                        No Back Photo
                                    </div>

                                )}

                                <div className="card-body text-center">

                                    <strong>
                                        Back Photo
                                    </strong>

                                </div>

                            </div>

                        </div>

                    </div>


                    {/* ==================================
                        ANIMAL DETAILS
                    ================================== */}

                    <h5 className="fw-bold text-success mb-3">
                        Animal Details
                    </h5>

                    <div className="row">

                        <div className="col-md-6 mb-3">
                            <strong>Animal ID:</strong>
                            <br />
                            {animal.id}
                        </div>


                        <div className="col-md-6 mb-3">
                            <strong>Animal Name:</strong>
                            <br />
                            {animal.animalName}
                        </div>


                        <div className="col-md-6 mb-3">
                            <strong>Category:</strong>
                            <br />
                            {animal.category}
                        </div>


                        <div className="col-md-6 mb-3">
                            <strong>Breed:</strong>
                            <br />
                            {animal.breed}
                        </div>


                        <div className="col-md-6 mb-3">
                            <strong>Age:</strong>
                            <br />
                            {animal.age}
                        </div>


                        <div className="col-md-6 mb-3">
                            <strong>Gender:</strong>
                            <br />
                            {animal.gender}
                        </div>


                        <div className="col-md-6 mb-3">
                            <strong>Price:</strong>
                            <br />

                            <span className="text-success fw-bold">
                                ₹ {animal.price}
                            </span>

                        </div>


                        <div className="col-md-6 mb-3">
                            <strong>Location:</strong>
                            <br />
                            {animal.location}
                        </div>


                        <div className="col-12 mb-3">

                            <strong>
                                Description:
                            </strong>

                            <p className="mt-2">
                                {animal.description ||
                                    "No description available."}
                            </p>

                        </div>


                        <div className="col-12">

                            <strong>
                                Availability:
                            </strong>

                            <span
                                className={
                                    animal.available
                                        ? "badge bg-success ms-2"
                                        : "badge bg-danger ms-2"
                                }
                            >
                                {animal.available
                                    ? "Available"
                                    : "Not Available"}
                            </span>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default AnimalDetails;