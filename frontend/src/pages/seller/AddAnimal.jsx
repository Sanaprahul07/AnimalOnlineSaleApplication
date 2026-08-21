import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addAnimal } from "../../services/AnimalService";

function AddAnimal() {
    const navigate = useNavigate();

    // ==========================================
    // DYNAMIC SELLER ID
    // ==========================================
    const sellerId = localStorage.getItem("sellerId");

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
    // 3 PHOTO FILES
    // ==========================================
    const [photos, setPhotos] = useState({
        front: null,
        side: null,
        back: null
    });

    // ==========================================
    // PHOTO PREVIEW
    // ==========================================
    const [photoPreview, setPhotoPreview] = useState({
        front: "",
        side: "",
        back: ""
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
    // NORMAL INPUT CHANGE
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
    // PHOTO SELECT
    // ==========================================
    const handlePhotoChange = (e) => {
        const selectedFiles = Array.from(e.target.files);

        if (selectedFiles.length === 0) {
            return;
        }

        // Maximum 3 photos
        if (selectedFiles.length > 3) {
            setErrorMessage(
                "Please select maximum 3 photos only."
            );
            e.target.value = "";
            return;
        }

        // ======================================
        // FILE TYPE CHECK
        // ======================================
        const validTypes = [
            "image/jpeg",
            "image/jpg",
            "image/png",
            "image/webp"
        ];

        const invalidFile = selectedFiles.find(
            (file) => !validTypes.includes(file.type)
        );

        if (invalidFile) {
            setErrorMessage(
                "Please select only JPG, JPEG, PNG or WEBP images."
            );
            e.target.value = "";
            return;
        }

        // ======================================
        // SAVE FILES
        // ======================================
        const newPhotos = {
            front: selectedFiles[0] || null,
            side: selectedFiles[1] || null,
            back: selectedFiles[2] || null
        };

        setPhotos(newPhotos);

        // ======================================
        // CREATE PREVIEWS
        // ======================================
        const newPreview = {
            front: selectedFiles[0]
                ? URL.createObjectURL(selectedFiles[0])
                : "",
            side: selectedFiles[1]
                ? URL.createObjectURL(selectedFiles[1])
                : "",
            back: selectedFiles[2]
                ? URL.createObjectURL(selectedFiles[2])
                : ""
        };

        setPhotoPreview(newPreview);

        // Clear old error
        setErrorMessage("");

        // Clear input so same files can be selected again
        e.target.value = "";
    };

    // ==========================================
    // REMOVE PHOTO
    // ==========================================
    const removePhoto = (type) => {
        setPhotos({
            ...photos,
            [type]: null
        });

        setPhotoPreview({
            ...photoPreview,
            [type]: ""
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
        // CHECK SELLER LOGIN
        // ======================================
        const currentSellerId = localStorage.getItem("sellerId");

        if (!currentSellerId) {
            setErrorMessage(
                "Seller information not found. Please login again."
            );

            navigate("/seller/login");
            return;
        }

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
        // PHOTO VALIDATION
        // ======================================
        if (!photos.front) {
            setErrorMessage(
                "Please select Front Photo."
            );
            return;
        }

        if (!photos.side) {
            setErrorMessage(
                "Please select Side Photo."
            );
            return;
        }

        if (!photos.back) {
            setErrorMessage(
                "Please select Back Photo."
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

            // ==================================
            // DYNAMIC SELLER ID
            // ==================================
            sellerId: Number(currentSellerId)
        };

        console.log(
            "================================="
        );

        console.log(
            "ADD ANIMAL REQUEST"
        );

        console.log(
            "Logged-in Seller ID:",
            currentSellerId
        );

        console.log(
            "Request Data:",
            requestData
        );

        console.log(
            "================================="
        );

        console.log(
            "Front Photo:",
            photos.front
        );

        console.log(
            "Side Photo:",
            photos.side
        );

        console.log(
            "Back Photo:",
            photos.back
        );

        // ======================================
        // API CALL
        // ======================================
        try {
            setLoading(true);

            /**
             * IMPORTANT:
             *
             * सध्याचा backend फक्त JSON घेत आहे.
             *
             * Actual 3 image upload आपण backend
             * MultipartFile मध्ये convert केल्यानंतर
             * पूर्णपणे connect करू.
             *
             * त्यामुळे आत्ता existing API call ठेवला आहे.
             */

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

            navigate(
                "/seller/animals"
            );

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
        navigate(
            "/seller/animals"
        );
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

                    <form
                        onSubmit={handleSubmit}
                    >

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
                                    value={
                                        animal.animalName
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    value={
                                        animal.category
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    value={
                                        animal.breed
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="form-select"
                                    disabled={
                                        !animal.category
                                    }
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
                                    value={
                                        animal.age
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    value={
                                        animal.price
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    value={
                                        animal.gender
                                    }
                                    onChange={
                                        handleChange
                                    }
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
                                    value={
                                        animal.location
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="form-control"
                                    placeholder="Enter location"
                                />

                            </div>

                            {/* ==================================
                                PHOTO UPLOAD
                            ================================== */}
                            <div className="col-12 mb-4">

                                <label className="form-label fw-bold">
                                    Animal Photos

                                    <span className="text-danger">
                                        {" "}*
                                    </span>
                                </label>

                                <div
                                    className="border rounded p-4 text-center bg-light"
                                >

                                    <p className="mb-3 text-muted">
                                        Select 3 photos:
                                        Front, Side and Back
                                    </p>

                                    <input
                                        id="animalPhotos"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        multiple
                                        onChange={
                                            handlePhotoChange
                                        }
                                        className="d-none"
                                    />

                                    <label
                                        htmlFor="animalPhotos"
                                        className="btn btn-success"
                                        style={{
                                            cursor: "pointer"
                                        }}
                                    >
                                        📷 Select Animal Photos
                                    </label>

                                    <p className="small text-muted mt-2 mb-0">
                                        Maximum 3 photos
                                    </p>

                                </div>

                            </div>

                            {/* ==================================
                                PHOTO PREVIEW
                            ================================== */}
                            {(photoPreview.front ||
                                photoPreview.side ||
                                photoPreview.back) && (

                                <div className="col-12 mb-4">

                                    <h5 className="fw-bold mb-3">
                                        Selected Photos
                                    </h5>

                                    <div className="row">

                                        {/* FRONT */}
                                        <div className="col-md-4 mb-3">

                                            <div className="card">

                                                {photoPreview.front ? (
                                                    <img
                                                        src={
                                                            photoPreview.front
                                                        }
                                                        alt="Front"
                                                        className="card-img-top"
                                                        style={{
                                                            height: "220px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="d-flex align-items-center justify-content-center bg-light"
                                                        style={{
                                                            height: "220px"
                                                        }}
                                                    >
                                                        No Front Photo
                                                    </div>
                                                )}

                                                <div className="card-body text-center">

                                                    <h6 className="fw-bold">
                                                        Front Photo
                                                    </h6>

                                                    {photos.front && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                removePhoto(
                                                                    "front"
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                        {/* SIDE */}
                                        <div className="col-md-4 mb-3">

                                            <div className="card">

                                                {photoPreview.side ? (
                                                    <img
                                                        src={
                                                            photoPreview.side
                                                        }
                                                        alt="Side"
                                                        className="card-img-top"
                                                        style={{
                                                            height: "220px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="d-flex align-items-center justify-content-center bg-light"
                                                        style={{
                                                            height: "220px"
                                                        }}
                                                    >
                                                        No Side Photo
                                                    </div>
                                                )}

                                                <div className="card-body text-center">

                                                    <h6 className="fw-bold">
                                                        Side Photo
                                                    </h6>

                                                    {photos.side && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                removePhoto(
                                                                    "side"
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                        {/* BACK */}
                                        <div className="col-md-4 mb-3">

                                            <div className="card">

                                                {photoPreview.back ? (
                                                    <img
                                                        src={
                                                            photoPreview.back
                                                        }
                                                        alt="Back"
                                                        className="card-img-top"
                                                        style={{
                                                            height: "220px",
                                                            objectFit: "cover"
                                                        }}
                                                    />
                                                ) : (
                                                    <div
                                                        className="d-flex align-items-center justify-content-center bg-light"
                                                        style={{
                                                            height: "220px"
                                                        }}
                                                    >
                                                        No Back Photo
                                                    </div>
                                                )}

                                                <div className="card-body text-center">

                                                    <h6 className="fw-bold">
                                                        Back Photo
                                                    </h6>

                                                    {photos.back && (
                                                        <button
                                                            type="button"
                                                            className="btn btn-sm btn-danger"
                                                            onClick={() =>
                                                                removePhoto(
                                                                    "back"
                                                                )
                                                            }
                                                        >
                                                            Remove
                                                        </button>
                                                    )}

                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )}

                            {/* ==================================
                                DESCRIPTION
                            ================================== */}
                            <div className="col-12 mb-3">

                                <label className="form-label fw-bold">
                                    Description
                                </label>

                                <textarea
                                    name="description"
                                    value={
                                        animal.description
                                    }
                                    onChange={
                                        handleChange
                                    }
                                    className="form-control"
                                    rows="4"
                                    placeholder="Enter animal description"
                                />

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
                                    onClick={
                                        handleCancel
                                    }
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