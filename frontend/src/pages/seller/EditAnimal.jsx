import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
    getAnimalById,
    updateAnimal
} from "../../services/AnimalService";


function EditAnimal() {

    const { id } = useParams();
    const navigate = useNavigate();


    // =====================================
    // FORM STATES
    // =====================================

    const [animalName, setAnimalName] = useState("");
    const [category, setCategory] = useState("");
    const [breed, setBreed] = useState("");
    const [age, setAge] = useState("");
    const [price, setPrice] = useState("");
    const [gender, setGender] = useState("");
    const [description, setDescription] = useState("");
    const [location, setLocation] = useState("");
    const [imageUrl, setImageUrl] = useState("");


    // =====================================
    // PAGE STATES
    // =====================================

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");


    // =====================================
    // LOAD ANIMAL
    // =====================================

    useEffect(() => {

        getAnimalById(id)
            .then((response) => {

                const animal = response.data;

                console.log(
                    "Animal Details:",
                    animal
                );


                setAnimalName(
                    animal.animalName || ""
                );

                setCategory(
                    animal.category || ""
                );

                setBreed(
                    animal.breed || ""
                );

                setAge(
                    animal.age || ""
                );

                setPrice(
                    animal.price || ""
                );

                setGender(
                    animal.gender || ""
                );

                setDescription(
                    animal.description || ""
                );

                setLocation(
                    animal.location || ""
                );

                setImageUrl(
                    animal.imageUrl || ""
                );


                setLoading(false);

            })
            .catch((error) => {

                console.error(
                    "Error loading animal:",
                    error
                );

                setError(
                    "Unable to load animal details."
                );

                setLoading(false);

            });

    }, [id]);


    // =====================================
    // UPDATE ANIMAL
    // =====================================

    const handleSubmit = (event) => {

        event.preventDefault();

        setError("");
        setSaving(true);


        const animalData = {

            animalName: animalName,

            category: category,

            breed: breed,

            age: Number(age),

            price: Number(price),

            gender: gender,

            description: description,

            location: location,

            imageUrl: imageUrl

        };


        console.log(
            "Updating Animal:",
            animalData
        );


        updateAnimal(id, animalData)
            .then((response) => {

                console.log(
                    "Animal Updated Successfully:",
                    response.data
                );

                alert(
                    "Animal updated successfully."
                );


                // Go back to My Animals

                navigate("/seller/animals");

            })
            .catch((error) => {

                console.error(
                    "Error updating animal:",
                    error
                );

                setError(
                    "Unable to update animal."
                );

            })
            .finally(() => {

                setSaving(false);

            });

    };


    // =====================================
    // LOADING
    // =====================================

    if (loading) {

        return (

            <div className="container p-5 text-center">

                <div
                    className="spinner-border text-success"
                    role="status"
                >
                </div>

                <p className="mt-3">
                    Loading animal details...
                </p>

            </div>

        );

    }


    // =====================================
    // UI
    // =====================================

    return (

        <div className="container-fluid p-4">


            {/* =====================================
                HEADER
            ===================================== */}

            <div className="mb-4">

                <h2 className="fw-bold text-success">
                    Edit Animal 🐄
                </h2>

                <p className="text-muted">
                    Update animal information
                </p>

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
                FORM
            ===================================== */}

            <div className="card shadow border-0">

                <div className="card-header bg-success text-white">

                    <h5 className="mb-0">
                        Update Animal
                    </h5>

                </div>


                <div className="card-body">


                    <form onSubmit={handleSubmit}>


                        {/* ROW 1 */}

                        <div className="row">


                            {/* ANIMAL NAME */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">
                                    Animal Name *
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={animalName}
                                    onChange={(e) =>
                                        setAnimalName(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* CATEGORY */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">
                                    Category *
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={category}
                                    onChange={(e) =>
                                        setCategory(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>



                        {/* ROW 2 */}

                        <div className="row">


                            {/* BREED */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">
                                    Breed *
                                </label>

                                <input
                                    type="text"
                                    className="form-control"
                                    value={breed}
                                    onChange={(e) =>
                                        setBreed(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* AGE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">
                                    Age *
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={age}
                                    onChange={(e) =>
                                        setAge(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>

                        </div>



                        {/* ROW 3 */}

                        <div className="row">


                            {/* PRICE */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">
                                    Price *
                                </label>

                                <input
                                    type="number"
                                    className="form-control"
                                    value={price}
                                    onChange={(e) =>
                                        setPrice(
                                            e.target.value
                                        )
                                    }
                                    required
                                />

                            </div>


                            {/* GENDER */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">
                                    Gender *
                                </label>

                                <select
                                    className="form-select"
                                    value={gender}
                                    onChange={(e) =>
                                        setGender(
                                            e.target.value
                                        )
                                    }
                                    required
                                >

                                    <option value="">
                                        Select Gender
                                    </option>

                                    <option value="Male">
                                        Male
                                    </option>

                                    <option value="Female">
                                        Female
                                    </option>

                                </select>

                            </div>

                        </div>



                        {/* LOCATION */}

                        <div className="mb-3">

                            <label className="form-label fw-bold">
                                Location *
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={location}
                                onChange={(e) =>
                                    setLocation(
                                        e.target.value
                                    )
                                }
                                required
                            />

                        </div>



                        {/* DESCRIPTION */}

                        <div className="mb-3">

                            <label className="form-label fw-bold">
                                Description
                            </label>

                            <textarea
                                className="form-control"
                                rows="4"
                                value={description}
                                onChange={(e) =>
                                    setDescription(
                                        e.target.value
                                    )
                                }
                            />

                        </div>



                        {/* IMAGE URL */}

                        <div className="mb-4">

                            <label className="form-label fw-bold">
                                Image URL
                            </label>

                            <input
                                type="text"
                                className="form-control"
                                value={imageUrl}
                                onChange={(e) =>
                                    setImageUrl(
                                        e.target.value
                                    )
                                }
                            />

                        </div>



                        {/* BUTTONS */}

                        <div className="d-flex gap-2">


                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={saving}
                            >

                                {saving
                                    ? "Updating..."
                                    : "Update Animal"
                                }

                            </button>


                            <button
                                type="button"
                                className="btn btn-secondary"
                                onClick={() =>
                                    navigate(
                                        "/seller/animals"
                                    )
                                }
                            >

                                Cancel

                            </button>

                        </div>


                    </form>

                </div>

            </div>

        </div>

    );

}


export default EditAnimal;