import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
    addAnimal,
    uploadAnimalPhotos
} from "../../services/AnimalService";

function AddAnimal() {

    const navigate = useNavigate();

    // ==========================================
    // DYNAMIC SELLER ID
    // ==========================================
    const sellerId = localStorage.getItem("sellerId");

    // ==========================================
    // 30 ANIMAL CATEGORIES + RELATED BREEDS
    // ==========================================
    const animalCategories = [
        {
            categoryName: "Cow",
            breeds: [
                "Gir",
                "Sahiwal",
                "Red Sindhi",
                "Rathi",
                "Tharparkar",
                "Jersey",
                "Holstein Friesian",
                "Kankrej"
            ]
        },
        {
            categoryName: "Buffalo",
            breeds: [
                "Murrah",
                "Jaffarabadi",
                "Mehsana",
                "Surti",
                "Nili Ravi",
                "Bhadawari"
            ]
        },
        {
            categoryName: "Ox",
            breeds: [
                "Hallikar",
                "Amritmahal",
                "Kangayam",
                "Ongole",
                "Khillari"
            ]
        },
        {
            categoryName: "Bull",
            breeds: [
                "Gir Bull",
                "Sahiwal Bull",
                "Red Sindhi Bull",
                "Kankrej Bull",
                "Ongole Bull"
            ]
        },
        {
            categoryName: "Goat",
            breeds: [
                "Jamunapari",
                "Beetal",
                "Barbari",
                "Sirohi",
                "Osmanabadi",
                "Black Bengal"
            ]
        },
        {
            categoryName: "Sheep",
            breeds: [
                "Deccani",
                "Nellore",
                "Mandya",
                "Marwari",
                "Magra",
                "Malpura"
            ]
        },
        {
            categoryName: "Horse",
            breeds: [
                "Marwari",
                "Kathiawari",
                "Thoroughbred",
                "Arabian",
                "Indian Halfbred",
                "Manipuri"
            ]
        },
        {
            categoryName: "Donkey",
            breeds: [
                "Indian Donkey",
                "Halari",
                "Spiti",
                "Kathiawari Donkey"
            ]
        },
        {
            categoryName: "Camel",
            breeds: [
                "Bikaneri",
                "Jaisalmeri",
                "Kachchhi",
                "Mewari",
                "Marwari Camel"
            ]
        },
        {
            categoryName: "Dog",
            breeds: [
                "Labrador Retriever",
                "German Shepherd",
                "Golden Retriever",
                "Rottweiler",
                "Beagle",
                "Pug",
                "Indian Pariah",
                "Rajapalayam"
            ]
        },
        {
            categoryName: "Cat",
            breeds: [
                "Persian",
                "Siamese",
                "Maine Coon",
                "Bengal",
                "Ragdoll",
                "British Shorthair",
                "Indian Domestic Cat"
            ]
        },
        {
            categoryName: "Rabbit",
            breeds: [
                "New Zealand White",
                "Californian",
                "Dutch Rabbit",
                "Flemish Giant",
                "Angora",
                "Rex"
            ]
        },
        {
            categoryName: "Pig",
            breeds: [
                "Large White Yorkshire",
                "Landrace",
                "Duroc",
                "Hampshire",
                "Berkshire",
                "Ghungroo"
            ]
        },
        {
            categoryName: "Elephant",
            breeds: [
                "Indian Elephant",
                "Asian Elephant"
            ]
        },
        {
            categoryName: "Deer",
            breeds: [
                "Chital",
                "Sambar",
                "Barasingha",
                "Hog Deer",
                "Spotted Deer"
            ]
        },
        {
            categoryName: "Yak",
            breeds: [
                "Ladakhi Yak",
                "Himachali Yak",
                "Arunachali Yak",
                "Sikkim Yak"
            ]
        },
        {
            categoryName: "Mule",
            breeds: [
                "Indian Mule",
                "Mountain Mule",
                "Pack Mule"
            ]
        },
        {
            categoryName: "Chicken",
            breeds: [
                "Aseel",
                "Kadaknath",
                "Rhode Island Red",
                "White Leghorn",
                "Plymouth Rock",
                "Sussex",
                "Australorp"
            ]
        },
        {
            categoryName: "Duck",
            breeds: [
                "Indian Runner",
                "Khaki Campbell",
                "White Pekin",
                "Muscovy",
                "Rouen"
            ]
        },
        {
            categoryName: "Turkey",
            breeds: [
                "Broad Breasted White",
                "Broad Breasted Bronze",
                "Beltsville Small White",
                "Black Turkey"
            ]
        },
        {
            categoryName: "Goose",
            breeds: [
                "Embden",
                "Toulouse",
                "Chinese Goose",
                "African Goose",
                "Sebastopol"
            ]
        },
        {
            categoryName: "Pigeon",
            breeds: [
                "King Pigeon",
                "Racing Homer",
                "Fantail",
                "Jacobin",
                "Modena",
                "Indian Gola"
            ]
        },
        {
            categoryName: "Parrot",
            breeds: [
                "Indian Ringneck",
                "Alexandrine Parakeet",
                "African Grey",
                "Cockatiel",
                "Lovebird",
                "Budgerigar"
            ]
        },
        {
            categoryName: "Peacock",
            breeds: [
                "Indian Blue Peacock",
                "Green Peacock",
                "White Peacock"
            ]
        },
        {
            categoryName: "Quail",
            breeds: [
                "Japanese Quail",
                "Bobwhite Quail",
                "California Quail",
                "White Quail"
            ]
        },
        {
            categoryName: "Fish",
            breeds: [
                "Rohu",
                "Catla",
                "Mrigal",
                "Tilapia",
                "Common Carp",
                "Grass Carp",
                "Goldfish",
                "Koi"
            ]
        },
        {
            categoryName: "Turtle",
            breeds: [
                "Indian Star Tortoise",
                "Red-Eared Slider",
                "Indian Flapshell Turtle",
                "Asian Box Turtle"
            ]
        },
        {
            categoryName: "Ostrich",
            breeds: [
                "Common Ostrich",
                "Masai Ostrich",
                "Southern Ostrich"
            ]
        },
        {
            categoryName: "Emu",
            breeds: [
                "Common Emu",
                "Australian Emu"
            ]
        },
        {
            categoryName: "Guinea Fowl",
            breeds: [
                "Pearl Guinea Fowl",
                "White Guinea Fowl",
                "Lavender Guinea Fowl",
                "Royal Purple Guinea Fowl"
            ]
        }
    ];

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
    // BREED LIST
    // ==========================================
    const [breeds, setBreeds] = useState([]);

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
    // CATEGORY CHANGE
    // ==========================================
    const handleCategoryChange = (e) => {

        const selectedCategory = e.target.value;

        const selectedAnimal = animalCategories.find(
            (item) => item.categoryName === selectedCategory
        );

        setAnimal({
            ...animal,
            category: selectedCategory,
            breed: ""
        });

        if (selectedAnimal) {
            setBreeds(selectedAnimal.breeds);
        } else {
            setBreeds([]);
        }

        setErrorMessage("");
    };

    // ==========================================
    // NORMAL INPUT CHANGE
    // ==========================================
    const handleChange = (e) => {

        const {
            name,
            value
        } = e.target;

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

        // ======================================
        // MAXIMUM 3 PHOTOS
        // ======================================
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
        setErrorMessage("");

        // Same files can be selected again
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

        setErrorMessage("");

        // ======================================
        // CHECK SELLER LOGIN
        // ======================================
        const currentSellerId =
            localStorage.getItem("sellerId");

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

        try {

            setLoading(true);

            // ==================================
            // STEP 1
            // UPLOAD 3 PHOTOS
            // ==================================
            const photoResponse =
                await uploadAnimalPhotos(
                    photos.front,
                    photos.side,
                    photos.back
                );

            console.log(
                "Photo Upload Response:",
                photoResponse.data
            );

            // ==================================
            // GET PHOTO URLS
            // ==================================
            const frontPhotoUrl =
                photoResponse.data?.frontPhotoUrl;

            const sidePhotoUrl =
                photoResponse.data?.sidePhotoUrl;

            const backPhotoUrl =
                photoResponse.data?.backPhotoUrl;

            // ==================================
            // CHECK PHOTO URL RESPONSE
            // ==================================
            if (
                !frontPhotoUrl ||
                !sidePhotoUrl ||
                !backPhotoUrl
            ) {

                setErrorMessage(
                    "Photo upload completed but image URLs were not received."
                );

                return;
            }

            // ==================================
            // STEP 2
            // FINAL ANIMAL REQUEST
            // ==================================
            const finalRequestData = {

                animalName:
                    animal.animalName,

                category:
                    animal.category,

                breed:
                    animal.breed,

                age:
                    Number(animal.age),

                price:
                    Number(animal.price),

                gender:
                    animal.gender,

                description:
                    animal.description,

                location:
                    animal.location,

                imageUrl:
                    animal.imageUrl,

                // THREE PHOTO URLS
                frontPhotoUrl:
                    frontPhotoUrl,

                sidePhotoUrl:
                    sidePhotoUrl,

                backPhotoUrl:
                    backPhotoUrl,

                // DYNAMIC SELLER
                sellerId:
                    Number(currentSellerId)
            };

            console.log(
                "FINAL ADD ANIMAL REQUEST:",
                finalRequestData
            );

            // ==================================
            // STEP 3
            // ADD ANIMAL
            // ==================================
            const response =
                await addAnimal(
                    finalRequestData
                );

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
                    "Backend Status:",
                    error.response.status
                );

                console.error(
                    "Backend Response:",
                    error.response.data
                );

                setErrorMessage(
                    error.response.data?.message ||
                    "Failed to add animal."
                );

            } else if (error.request) {

                setErrorMessage(
                    "Unable to connect to backend server."
                );

            } else {

                setErrorMessage(
                    error.message ||
                    "Failed to upload animal."
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

            <div className="mb-4">

                <h2 className="fw-bold text-success">
                    Add Animal
                </h2>

                <p className="text-muted">
                    Add a new animal for sale.
                </p>

            </div>

            {errorMessage && (

                <div className="alert alert-danger">

                    <strong>
                        Error!
                    </strong>{" "}

                    {errorMessage}

                </div>
            )}

            <div className="card shadow border-0">

                <div className="card-body p-4">

                    <form onSubmit={handleSubmit}>

                        <div className="row">

                            {/* ================================= */}
                            {/* ANIMAL NAME */}
                            {/* ================================= */}

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

                            {/* ================================= */}
                            {/* CATEGORY */}
                            {/* ================================= */}

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
                                    onChange={handleCategoryChange}
                                    className="form-select"
                                >

                                    <option value="">
                                        Select Category
                                    </option>

                                    {animalCategories.map(
                                        (category, index) => (

                                            <option
                                                key={index}
                                                value={
                                                    category.categoryName
                                                }
                                            >
                                                {
                                                    category.categoryName
                                                }
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* ================================= */}
                            {/* BREED */}
                            {/* ================================= */}

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

                                        {!animal.category
                                            ? "First Select Category"
                                            : "Select Breed"
                                        }

                                    </option>

                                    {breeds.map(
                                        (breed, index) => (

                                            <option
                                                key={index}
                                                value={breed}
                                            >
                                                {breed}
                                            </option>

                                        )
                                    )}

                                </select>

                            </div>

                            {/* ================================= */}
                            {/* AGE */}
                            {/* ================================= */}

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

                            {/* ================================= */}
                            {/* PRICE */}
                            {/* ================================= */}

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

                            {/* ================================= */}
                            {/* GENDER */}
                            {/* ================================= */}

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

                            {/* ================================= */}
                            {/* LOCATION */}
                            {/* ================================= */}

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

                            {/* ================================= */}
                            {/* PHOTO UPLOAD */}
                            {/* ================================= */}

                            <div className="col-12 mb-4">

                                <label className="form-label fw-bold">

                                    Animal Photos

                                    <span className="text-danger">
                                        {" "}*
                                    </span>

                                </label>

                                <div className="border rounded p-4 text-center bg-light">

                                    <p className="mb-3 text-muted">

                                        Select 3 photos:
                                        Front, Side and Back

                                    </p>

                                    <input
                                        id="animalPhotos"
                                        type="file"
                                        accept="image/jpeg,image/jpg,image/png,image/webp"
                                        multiple
                                        onChange={handlePhotoChange}
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

                            {/* ================================= */}
                            {/* PHOTO PREVIEW */}
                            {/* ================================= */}

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

                            {/* ================================= */}
                            {/* DESCRIPTION */}
                            {/* ================================= */}

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
                                />

                            </div>

                            {/* ================================= */}
                            {/* BUTTONS */}
                            {/* ================================= */}

                            <div className="col-12 mt-3">

                                <button
                                    type="submit"
                                    className="btn btn-success me-2"
                                    disabled={loading}
                                >

                                    {loading
                                        ? "Uploading & Saving..."
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