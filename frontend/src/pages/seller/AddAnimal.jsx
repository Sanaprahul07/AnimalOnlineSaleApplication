import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnimal } from "../../services/AnimalService";

function AddAnimal() {

    const navigate = useNavigate();

    // ==========================================
    // SELLER ID
    // ==========================================

    const sellerId = 9;


    // ==========================================
    // FORM DATA
    // ==========================================

    const [animal, setAnimal] = useState({

        animalName: "",
        category: "",
        breed: "",
        age: "",
        price: "",
        gender: "",
        description: "",
        location: "",
        imageUrl: "",
        sellerId: sellerId

    });


    // ==========================================
    // MESSAGE
    // ==========================================

    const [errorMessage, setErrorMessage] = useState("");

    const [loading, setLoading] = useState(false);


    // ==========================================
    // CATEGORY LIST
    // ==========================================

    const categories = [

        "Cow",
        "Buffalo",
        "Goat",
        "Sheep",
        "Horse",
        "Dog",
        "Cat",
        "Rabbit"

    ];


    // ==========================================
    // BREED LIST
    // ==========================================

    const breedList = {

        Cow: [
            "HF",
            "Jersey",
            "Gir"
        ],

        Buffalo: [
            "Murrah",
            "Pandharpuri"
        ],

        Goat: [
            "Osmanabadi",
            "Sirohi",
            "Boer"
        ],

        Sheep: [
            "Deccani",
            "Madgyal"
        ],

        Horse: [
            "Marwari",
            "Kathiawari"
        ],

        Dog: [
            "Labrador",
            "German Shepherd",
            "Golden Retriever"
        ],

        Cat: [
            "Persian",
            "Siamese",
            "Bengal"
        ],

        Rabbit: [
            "New Zealand White",
            "Californian",
            "Dutch"
        ]

    };


    // ==========================================
    // CATEGORY CHANGE
    // ==========================================

    const handleChange = (e) => {

        const { name, value } = e.target;


        // Category change झाल्यावर
        // Breed reset करायचा

        if (name === "category") {

            setAnimal({

                ...animal,

                category: value,

                breed: ""

            });

            return;
        }


        setAnimal({

            ...animal,

            [name]: value

        });

    };


    // ==========================================
    // SUBMIT
    // ==========================================

    const handleSubmit = async (e) => {

        e.preventDefault();


        // Previous error clear

        setErrorMessage("");


        // ======================================
        // VALIDATION
        // ======================================

        if (!animal.animalName.trim()) {

            setErrorMessage(
                "Please enter animal name."
            );

            return;
        }


        if (!animal.category) {

            setErrorMessage(
                "Please select category."
            );

            return;
        }


        if (!animal.breed) {

            setErrorMessage(
                "Please select breed."
            );

            return;
        }


        if (!animal.age) {

            setErrorMessage(
                "Please enter animal age."
            );

            return;
        }


        if (!animal.price) {

            setErrorMessage(
                "Please enter animal price."
            );

            return;
        }


        if (!animal.gender) {

            setErrorMessage(
                "Please select gender."
            );

            return;
        }


        if (!animal.location.trim()) {

            setErrorMessage(
                "Please enter location."
            );

            return;
        }


        // ======================================
        // REQUEST DATA
        // ======================================

        const requestData = {

            animalName: animal.animalName,

            category: animal.category,

            breed: animal.breed,

            age: Number(animal.age),

            price: Number(animal.price),

            gender: animal.gender,

            description: animal.description,

            location: animal.location,

            imageUrl: animal.imageUrl,

            sellerId: sellerId

        };


        console.log(
            "Add Animal Request:",
            requestData
        );


        // ======================================
        // API CALL
        // ======================================

        try {

            setLoading(true);


            const response =
                await addAnimal(requestData);


            console.log(
                "Add Animal Response:",
                response.data
            );


            // ==================================
            // SUCCESS
            // ==================================

            alert(
                "Animal added successfully!"
            );


            // ==================================
            // IMPORTANT
            // ==================================
            // Save successful झाल्यानंतर
            // My Animals page वर जा

            navigate("/seller/animals");


        } catch (error) {

            console.error(
                "Error adding animal:",
                error
            );


            // ==================================
            // BACKEND ERROR
            // ==================================

            if (error.response) {

                console.error(
                    "Backend Response:",
                    error.response.data
                );


                setErrorMessage(

                    error.response.data?.message ||
                    "Failed to add animal."

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


    // ==========================================
    // CANCEL
    // ==========================================

    const handleCancel = () => {

        navigate("/seller/animals");

    };


    // ==========================================
    // UI
    // ==========================================

    return (

        <div className="container-fluid p-4">


            {/* ==================================
                HEADER
            ================================== */}

            <div className="mb-4">

                <h2 className="fw-bold text-success">

                    Add Animal

                </h2>

                <p className="text-muted">

                    Add a new animal for sale.

                </p>

            </div>


            {/* ==================================
                ERROR
            ================================== */}

            {errorMessage && (

                <div className="alert alert-danger">

                    <strong>
                        Error!
                    </strong>

                    {" "}

                    {errorMessage}

                </div>

            )}


            {/* ==================================
                FORM CARD
            ================================== */}

            <div className="card shadow border-0">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row">


                            {/* ==================================
                                ANIMAL NAME
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Animal Name

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>


                                <input

                                    type="text"

                                    name="animalName"

                                    value={animal.animalName}

                                    onChange={handleChange}

                                    className="form-control"

                                    placeholder="Enter animal name"

                                />

                            </div>


                            {/* ==================================
                                CATEGORY
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Category

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>


                                <select

                                    name="category"

                                    value={animal.category}

                                    onChange={handleChange}

                                    className="form-select"

                                >

                                    <option value="">

                                        Select Category

                                    </option>


                                    {categories.map(
                                        (category) => (

                                            <option
                                                key={category}
                                                value={category}
                                            >

                                                {category}

                                            </option>

                                        )
                                    )}

                                </select>

                            </div>


                            {/* ==================================
                                BREED
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Breed

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>


                                <select

                                    name="breed"

                                    value={animal.breed}

                                    onChange={handleChange}

                                    className="form-select"

                                    disabled={!animal.category}

                                >

                                    <option value="">

                                        {animal.category
                                            ? "Select Breed"
                                            : "First Select Category"
                                        }

                                    </option>


                                    {animal.category &&

                                        breedList[
                                            animal.category
                                        ]?.map(

                                            (breed) => (

                                                <option
                                                    key={breed}
                                                    value={breed}
                                                >

                                                    {breed}

                                                </option>

                                            )

                                        )

                                    }

                                </select>

                            </div>


                            {/* ==================================
                                AGE
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Age

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>


                                <input

                                    type="number"

                                    name="age"

                                    value={animal.age}

                                    onChange={handleChange}

                                    className="form-control"

                                    placeholder="Enter age"

                                    min="0"

                                />

                            </div>


                            {/* ==================================
                                PRICE
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Price

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>


                                <input

                                    type="number"

                                    name="price"

                                    value={animal.price}

                                    onChange={handleChange}

                                    className="form-control"

                                    placeholder="Enter price"

                                    min="0"

                                />

                            </div>


                            {/* ==================================
                                GENDER
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Gender

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>


                                <select

                                    name="gender"

                                    value={animal.gender}

                                    onChange={handleChange}

                                    className="form-select"

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


                            {/* ==================================
                                LOCATION
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Location

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>


                                <input

                                    type="text"

                                    name="location"

                                    value={animal.location}

                                    onChange={handleChange}

                                    className="form-control"

                                    placeholder="Enter location"

                                />

                            </div>


                            {/* ==================================
                                IMAGE URL
                            ================================== */}

                            <div className="col-md-6 mb-3">

                                <label className="form-label fw-bold">

                                    Image URL

                                </label>


                                <input

                                    type="text"

                                    name="imageUrl"

                                    value={animal.imageUrl}

                                    onChange={handleChange}

                                    className="form-control"

                                    placeholder="Example: cow.jpg"

                                />

                            </div>


                            {/* ==================================
                                DESCRIPTION
                            ================================== */}

                            <div className="col-12 mb-3">

                                <label className="form-label fw-bold">

                                    Description

                                </label>


                                <textarea

                                    name="description"

                                    value={animal.description}

                                    onChange={handleChange}

                                    className="form-control"

                                    rows="4"

                                    placeholder="Enter animal description"

                                ></textarea>

                            </div>


                            {/* ==================================
                                BUTTONS
                            ================================== */}

                            <div className="col-12 mt-3">


                                <button

                                    type="submit"

                                    className="btn btn-success me-2"

                                    disabled={loading}

                                >

                                    {loading

                                        ? "Saving..."

                                        : "➕ Add Animal"

                                    }

                                </button>


                                <button

                                    type="button"

                                    className="btn btn-secondary"

                                    onClick={handleCancel}

                                    disabled={loading}

                                >

                                    Cancel

                                </button>


                            </div>

                        </div>

                    </form>

                </div>

            </div>

        </div>

    );

}

export default AddAnimal;