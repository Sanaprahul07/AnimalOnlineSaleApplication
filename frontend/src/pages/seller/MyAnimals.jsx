import { useEffect, useState } from "react";

import {
    getAnimalsBySeller,
    deleteAnimal
} from "../../services/AnimalService";

function MyAnimals() {

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // =====================================
    // GET LOGGED-IN SELLER ID
    // =====================================

    const sellerId = localStorage.getItem("sellerId");

    console.log("Logged-in Seller ID:", sellerId);

    // =====================================
    // LOAD SELLER ANIMALS
    // =====================================

    const loadSellerAnimals = () => {

        setLoading(true);
        setError("");

        // =====================================
        // SELLER ID VALIDATION
        // =====================================

        if (!sellerId) {

            setError(
                "Seller information not found. Please login again."
            );

            setLoading(false);

            return;
        }

        console.log(
            "Loading animals for Seller ID:",
            sellerId
        );

        // =====================================
        // CALL BACKEND
        // =====================================

        getAnimalsBySeller(sellerId)
            .then((response) => {

                console.log(
                    "Seller Animals Response:",
                    response.data
                );

                // =====================================
                // CHECK RESPONSE
                // =====================================

                if (Array.isArray(response.data)) {

                    setAnimals(response.data);

                } else {

                    setAnimals([]);
                }
            })
            .catch((error) => {

                console.error(
                    "Error loading seller animals:",
                    error
                );

                if (error.response) {

                    console.error(
                        "Backend Status:",
                        error.response.status
                    );

                    console.error(
                        "Backend Response:",
                        error.response.data
                    );
                }

                setError(
                    "Unable to load seller animals."
                );
            })
            .finally(() => {

                setLoading(false);
            });
    };

    // =====================================
    // DELETE ANIMAL
    // =====================================

    const handleDelete = (id) => {

        const confirmDelete = window.confirm(
            "Are you sure you want to delete this animal?"
        );

        if (!confirmDelete) {
            return;
        }

        deleteAnimal(id)
            .then((response) => {

                console.log(
                    "Delete Animal Response:",
                    response.data
                );

                alert(
                    "Animal deleted successfully."
                );

                // =====================================
                // RELOAD SELLER ANIMALS
                // =====================================

                loadSellerAnimals();
            })
            .catch((error) => {

                console.error(
                    "Error deleting animal:",
                    error
                );

                alert(
                    "Unable to delete animal."
                );
            });
    };

    // =====================================
    // PAGE LOAD
    // =====================================

    useEffect(() => {

        loadSellerAnimals();

    }, []);

    // =====================================
    // UI
    // =====================================

    return (

        <div className="container-fluid p-4">

            {/* =====================================
                HEADER
            ===================================== */}

            <div className="d-flex justify-content-between align-items-center mb-4">

                <div>

                    <h2 className="fw-bold text-success">
                        My Animals 🐄
                    </h2>

                    <p className="text-muted mb-0">
                        Animals added by seller
                    </p>

                </div>

                <a
                    href="/seller/add-animal"
                    className="btn btn-success"
                >
                    ➕ Add Animal
                </a>

            </div>


            {/* =====================================
                ERROR
            ===================================== */}

            {error && (

                <div className="alert alert-danger">

                    {error}

                </div>

            )}


            {/* =====================================
                LOADING
            ===================================== */}

            {loading && (

                <div className="text-center p-5">

                    <div
                        className="spinner-border text-success"
                        role="status"
                    >
                    </div>

                    <p className="mt-2">
                        Loading animals...
                    </p>

                </div>

            )}


            {/* =====================================
                NO ANIMALS
            ===================================== */}

            {!loading &&
                !error &&
                animals.length === 0 && (

                    <div className="alert alert-info">

                        No animals found for this seller.

                    </div>

                )}


            {/* =====================================
                ANIMAL TABLE
            ===================================== */}

            {!loading &&
                animals.length > 0 && (

                    <div className="card shadow border-0">

                        {/* CARD HEADER */}

                        <div className="card-header bg-success text-white">

                            <h5 className="mb-0">

                                My Animals ({animals.length})

                            </h5>

                        </div>


                        {/* CARD BODY */}

                        <div className="card-body p-0">

                            <div className="table-responsive">

                                <table className="table table-bordered table-hover mb-0">

                                    {/* TABLE HEADER */}

                                    <thead className="table-light">

                                        <tr>

                                            <th>
                                                ID
                                            </th>

                                            <th>
                                                Animal
                                            </th>

                                            <th>
                                                Category
                                            </th>

                                            <th>
                                                Breed
                                            </th>

                                            <th>
                                                Age
                                            </th>

                                            <th>
                                                Gender
                                            </th>

                                            <th>
                                                Price
                                            </th>

                                            <th>
                                                Location
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                            <th>
                                                Action
                                            </th>

                                        </tr>

                                    </thead>


                                    {/* TABLE BODY */}

                                    <tbody>

                                        {animals.map((animal) => (

                                            <tr key={animal.id}>

                                                {/* ID */}

                                                <td>
                                                    {animal.id}
                                                </td>


                                                {/* ANIMAL NAME */}

                                                <td className="fw-bold">
                                                    {animal.animalName}
                                                </td>


                                                {/* CATEGORY */}

                                                <td>
                                                    {animal.category}
                                                </td>


                                                {/* BREED */}

                                                <td>
                                                    {animal.breed}
                                                </td>


                                                {/* AGE */}

                                                <td>
                                                    {animal.age} Years
                                                </td>


                                                {/* GENDER */}

                                                <td>
                                                    {animal.gender}
                                                </td>


                                                {/* PRICE */}

                                                <td className="fw-bold">
                                                    ₹{animal.price}
                                                </td>


                                                {/* LOCATION */}

                                                <td>
                                                    {animal.location}
                                                </td>


                                                {/* STATUS */}

                                                <td>

                                                    {animal.available ? (

                                                        <span className="badge bg-success">
                                                            Available
                                                        </span>

                                                    ) : (

                                                        <span className="badge bg-danger">
                                                            Not Available
                                                        </span>

                                                    )}

                                                </td>


                                                {/* ACTION */}

                                                <td>

                                                    <div className="d-flex gap-2">

                                                        {/* EDIT */}

                                                        <a
                                                            href={`/seller/edit-animal/${animal.id}`}
                                                            className="btn btn-sm btn-primary"
                                                        >
                                                            ✏️ Edit
                                                        </a>


                                                        {/* DELETE */}

                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                handleDelete(
                                                                    animal.id
                                                                )
                                                            }
                                                        >
                                                            🗑️ Delete
                                                        </button>

                                                    </div>

                                                </td>

                                            </tr>

                                        ))}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>

                )}

        </div>
    );
}

export default MyAnimals;


