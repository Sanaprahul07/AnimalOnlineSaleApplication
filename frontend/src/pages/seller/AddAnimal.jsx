import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { addAnimal, uploadAnimalPhotos } from "../../services/AnimalService";

function AddAnimal() {
  const navigate = useNavigate();

  // ==========================================
  // DYNAMIC SELLER ID
  // ==========================================
  const sellerId = localStorage.getItem("sellerId");

  // ==========================================
  // ANIMAL CATEGORIES + RELATED BREEDS
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
        "Kankrej",
      ],
    },
    {
      categoryName: "Buffalo",
      breeds: [
        "Murrah",
        "Jaffarabadi",
        "Mehsana",
        "Surti",
        "Nili Ravi",
        "Bhadawari",
      ],
    },
    {
      categoryName: "Ox",
      breeds: ["Hallikar", "Amritmahal", "Kangayam", "Ongole", "Khillari"],
    },
    {
      categoryName: "Bull",
      breeds: [
        "Gir Bull",
        "Sahiwal Bull",
        "Red Sindhi Bull",
        "Kankrej Bull",
        "Ongole Bull",
      ],
    },
    {
      categoryName: "Goat",
      breeds: [
        "Jamunapari",
        "Beetal",
        "Barbari",
        "Sirohi",
        "Osmanabadi",
        "Black Bengal",
      ],
    },
    {
      categoryName: "Sheep",
      breeds: ["Deccani", "Nellore", "Mandya", "Marwari", "Magra", "Malpura"],
    },
    {
      categoryName: "Horse",
      breeds: [
        "Marwari",
        "Kathiawari",
        "Thoroughbred",
        "Arabian",
        "Indian Halfbred",
        "Manipuri",
      ],
    },
    {
      categoryName: "Donkey",
      breeds: ["Indian Donkey", "Halari", "Spiti", "Kathiawari Donkey"],
    },
    {
      categoryName: "Camel",
      breeds: ["Bikaneri", "Jaisalmeri", "Kachchhi", "Mewari", "Marwari Camel"],
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
        "Rajapalayam",
      ],
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
        "Indian Domestic Cat",
      ],
    },
    {
      categoryName: "Rabbit",
      breeds: [
        "New Zealand White",
        "Californian",
        "Dutch Rabbit",
        "Flemish Giant",
        "Angora",
        "Rex",
      ],
    },
    {
      categoryName: "Pig",
      breeds: [
        "Large White Yorkshire",
        "Landrace",
        "Duroc",
        "Hampshire",
        "Berkshire",
        "Ghungroo",
      ],
    },
    {
      categoryName: "Elephant",
      breeds: ["Indian Elephant", "Asian Elephant"],
    },
    {
      categoryName: "Deer",
      breeds: ["Chital", "Sambar", "Barasingha", "Hog Deer", "Spotted Deer"],
    },
    {
      categoryName: "Yak",
      breeds: ["Ladakhi Yak", "Himachali Yak", "Arunachali Yak", "Sikkim Yak"],
    },
    {
      categoryName: "Mule",
      breeds: ["Indian Mule", "Mountain Mule", "Pack Mule"],
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
        "Australorp",
      ],
    },
    {
      categoryName: "Duck",
      breeds: [
        "Indian Runner",
        "Khaki Campbell",
        "White Pekin",
        "Muscovy",
        "Rouen",
      ],
    },
    {
      categoryName: "Turkey",
      breeds: [
        "Broad Breasted White",
        "Broad Breasted Bronze",
        "Beltsville Small White",
        "Black Turkey",
      ],
    },
    {
      categoryName: "Goose",
      breeds: [
        "Embden",
        "Toulouse",
        "Chinese Goose",
        "African Goose",
        "Sebastopol",
      ],
    },
    {
      categoryName: "Pigeon",
      breeds: [
        "King Pigeon",
        "Racing Homer",
        "Fantail",
        "Jacobin",
        "Modena",
        "Indian Gola",
      ],
    },
    {
      categoryName: "Parrot",
      breeds: [
        "Indian Ringneck",
        "Alexandrine Parakeet",
        "African Grey",
        "Cockatiel",
        "Lovebird",
        "Budgerigar",
      ],
    },
    {
      categoryName: "Peacock",
      breeds: ["Indian Blue Peacock", "Green Peacock", "White Peacock"],
    },
    {
      categoryName: "Quail",
      breeds: [
        "Japanese Quail",
        "Bobwhite Quail",
        "California Quail",
        "White Quail",
      ],
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
        "Koi",
      ],
    },
    {
      categoryName: "Turtle",
      breeds: [
        "Indian Star Tortoise",
        "Red-Eared Slider",
        "Indian Flapshell Turtle",
        "Asian Box Turtle",
      ],
    },
    {
      categoryName: "Ostrich",
      breeds: ["Common Ostrich", "Masai Ostrich", "Southern Ostrich"],
    },
    {
      categoryName: "Emu",
      breeds: ["Common Emu", "Australian Emu"],
    },
    {
      categoryName: "Guinea Fowl",
      breeds: [
        "Pearl Guinea Fowl",
        "White Guinea Fowl",
        "Lavender Guinea Fowl",
        "Royal Purple Guinea Fowl",
      ],
    },
  ];

  // ==========================================
  // CATEGORY-WISE AGE LIMITS
  // ==========================================
  const ageLimits = {
    Cow: { min: 0.5, max: 5 },
    Buffalo: { min: 0.5, max: 5 },
    Ox: { min: 0.5, max: 5 },
    Bull: { min: 0.5, max: 5 },
    Goat: { min: 0.5, max: 3 },
    Sheep: { min: 0.5, max: 5 },
    Horse: { min: 0.5, max: 10 },
    Donkey: { min: 0.5, max: 10 },
    Camel: { min: 0.5, max: 10 },
    Dog: { min: 0, max: 3 },
    Cat: { min: 0, max: 3 },
    Rabbit: { min: 0, max: 3 },
    Pig: { min: 0.5, max: 5 },
    Elephant: { min: 0.5, max: 10 },
    Deer: { min: 0.5, max: 10 },
    Yak: { min: 0.5, max: 10 },
    Mule: { min: 0.5, max: 10 },
    Chicken: { min: 0, max: 3 },
    Duck: { min: 0, max: 3 },
    Turkey: { min: 0, max: 3 },
    Goose: { min: 0, max: 5 },
    Pigeon: { min: 0, max: 5 },
    Parrot: { min: 0, max: 10 },
    Peacock: { min: 0, max: 10 },
    Quail: { min: 0, max: 2 },
    Fish: { min: 0, max: 10 },
    Turtle: { min: 0, max: 10 },
    Ostrich: { min: 0.5, max: 10 },
    Emu: { min: 0.5, max: 10 },
    "Guinea Fowl": { min: 0, max: 5 },
  };

  // ==========================================
  // CATEGORY-WISE MAXIMUM PRICE
  // ==========================================
  const priceLimits = {
    Cow: 300000,
    Buffalo: 450000,
    Ox: 200000,
    Bull: 200000,
    Goat: 50000,
    Sheep: 50000,
    Horse: 500000,
    Donkey: 50000,
    Camel: 300000,
    Dog: 50000,
    Cat: 30000,
    Rabbit: 10000,
    Pig: 50000,
    Yak: 200000,
    Mule: 100000,
    Chicken: 10000,
    Duck: 10000,
    Turkey: 20000,
    Goose: 20000,
    Pigeon: 10000,
    Quail: 5000,
    Fish: 50000,
    Ostrich: 200000,
    Emu: 100000,
    "Guinea Fowl": 10000,
  };

  // ==========================================
  // RESTRICTED SALE CATEGORIES
  // ==========================================
  const restrictedSaleCategories = [
    "Elephant",
    "Deer",
    "Parrot",
    "Peacock",
    "Turtle",
  ];

  // ==========================================
  // FORM DATA
  // ==========================================
  const [animal, setAnimal] = useState({
    animalName: "",
    category: "",
    breed: "",
    age: "",
    weight: "",
    color: "",
    healthStatus: "",
    vaccinationRecords: "",
    price: "",
    gender: "",
    description: "",
    location: "",
    sellerId: sellerId,
  });

  // ==========================================
  // BREED LIST
  // ==========================================
  const [breeds, setBreeds] = useState([]);

  // ==========================================
  // THREE ANIMAL PHOTO FILES
  // ==========================================
  const [photos, setPhotos] = useState({
    front: null,
    side: null,
    back: null,
  });

  // ==========================================
  // THREE ANIMAL PHOTO PREVIEWS
  // ==========================================
  const [photoPreview, setPhotoPreview] = useState({
    front: "",
    side: "",
    back: "",
  });

  // ==========================================
  // MULTIPLE VACCINATION PHOTOS
  // ==========================================
  const [vaccinationPhotos, setVaccinationPhotos] = useState([]);
  const [vaccinationPhotoPreviews, setVaccinationPhotoPreviews] = useState([]);

  // ==========================================
  // ERROR AND LOADING
  // ==========================================
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // ==========================================
  // CATEGORY CHANGE
  // ==========================================
  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;

    const selectedAnimal = animalCategories.find(
      (item) => item.categoryName === selectedCategory,
    );

    setAnimal({
      ...animal,
      category: selectedCategory,
      breed: "",
      age: "",
      price: "",
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
    const { name, value } = e.target;

    setAnimal({
      ...animal,
      [name]: value,
    });

    setErrorMessage("");
  };

  // ==========================================
  // SELECT ANIMAL PHOTOS
  // EXISTING FLOW: EXACTLY THREE PHOTOS
  // ==========================================
  const handlePhotoChange = (e) => {
    const selectedFiles = Array.from(e.target.files || []);

    if (selectedFiles.length === 0) {
      return;
    }

    if (selectedFiles.length !== 3) {
      setErrorMessage("Please select exactly 3 photos: Front, Side and Back.");
      e.target.value = "";
      return;
    }

    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

    const invalidFile = selectedFiles.find(
      (file) => !validTypes.includes(file.type),
    );

    if (invalidFile) {
      setErrorMessage("Please select only JPG, JPEG, PNG or WEBP images.");
      e.target.value = "";
      return;
    }

    setPhotos({
      front: selectedFiles[0],
      side: selectedFiles[1],
      back: selectedFiles[2],
    });

    setPhotoPreview({
      front: URL.createObjectURL(selectedFiles[0]),
      side: URL.createObjectURL(selectedFiles[1]),
      back: URL.createObjectURL(selectedFiles[2]),
    });

    setErrorMessage("");
    e.target.value = "";
  };

  // ==========================================
  // REMOVE ANIMAL PHOTO
  // ==========================================
  const removePhoto = (type) => {
    setPhotos({
      ...photos,
      [type]: null,
    });

    setPhotoPreview({
      ...photoPreview,
      [type]: "",
    });
  };

  // ==========================================
  // SELECT MULTIPLE VACCINATION PHOTOS
  // ADD NEW SELECTIONS TO EXISTING PHOTOS
  // ==========================================
  const handleVaccinationPhotoChange = (e) => {
    const files = Array.from(e.target.files || []);

    if (files.length === 0) {
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp"];

    const invalidFile = files.find((file) => !validTypes.includes(file.type));

    if (invalidFile) {
      setErrorMessage(
        "Please select only JPG, JPEG, PNG or WEBP vaccination images.",
      );
      e.target.value = "";
      return;
    }

    const newPreviews = files.map((file) => URL.createObjectURL(file));

    setVaccinationPhotos((previous) => [...previous, ...files]);

    setVaccinationPhotoPreviews((previous) => [...previous, ...newPreviews]);

    setErrorMessage("");
    e.target.value = "";
  };

  // ==========================================
  // REMOVE ONE VACCINATION PHOTO
  // ==========================================
  const removeVaccinationPhoto = (index) => {
    const previewUrl = vaccinationPhotoPreviews[index];

    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }

    setVaccinationPhotos((previous) => previous.filter((_, i) => i !== index));

    setVaccinationPhotoPreviews((previous) =>
      previous.filter((_, i) => i !== index),
    );
  };

  // ==========================================
  // SUBMIT
  // ==========================================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    // CHECK SELLER LOGIN
    const currentSellerId = localStorage.getItem("sellerId");

    if (!currentSellerId) {
      setErrorMessage("Seller information not found. Please login again.");
      navigate("/seller/login");
      return;
    }

    // REQUIRED FIELD VALIDATION
    if (!animal.animalName.trim()) {
      setErrorMessage("Please enter animal name.");
      return;
    }

    if (!animal.category) {
      setErrorMessage("Please select category.");
      return;
    }

    if (!animal.breed) {
      setErrorMessage("Please select breed.");
      return;
    }

    if (restrictedSaleCategories.includes(animal.category)) {
      setErrorMessage(
        `${animal.category} category cannot be submitted for sale. Please check applicable wildlife and animal-trade laws.`,
      );
      return;
    }

    // AGE VALIDATION
    if (animal.age === "" || animal.age === null) {
      setErrorMessage("Please enter animal age.");
      return;
    }

    const ageValue = Number(animal.age);
    const selectedAgeLimit = ageLimits[animal.category];

    if (!selectedAgeLimit) {
      setErrorMessage("Age limit is not configured for this category.");
      return;
    }

    if (!Number.isFinite(ageValue)) {
      setErrorMessage("Please enter a valid animal age.");
      return;
    }

    if (ageValue < selectedAgeLimit.min || ageValue > selectedAgeLimit.max) {
      setErrorMessage(
        `For ${animal.category}, age must be between ${selectedAgeLimit.min} and ${selectedAgeLimit.max} years.`,
      );
      return;
    }

    // PRICE VALIDATION
    if (animal.price === "" || animal.price === null) {
      setErrorMessage("Please enter animal price.");
      return;
    }

    const priceValue = Number(animal.price);
    const maxPrice = priceLimits[animal.category];

    if (!Number.isFinite(priceValue) || priceValue < 1) {
      setErrorMessage("Animal price must be at least ₹1.");
      return;
    }

    if (maxPrice === undefined) {
      setErrorMessage(
        `Maximum price is not configured for ${animal.category}.`,
      );
      return;
    }

    if (priceValue > maxPrice) {
      setErrorMessage(
        `Maximum allowed price for ${animal.category} is ₹${maxPrice.toLocaleString("en-IN")}.`,
      );
      return;
    }

    if (!animal.gender) {
      setErrorMessage("Please select gender.");
      return;
    }

    if (!animal.location.trim()) {
      setErrorMessage("Please enter location.");
      return;
    }

    // EXISTING ANIMAL PHOTO VALIDATION
    if (!photos.front) {
      setErrorMessage("Please select Front Photo.");
      return;
    }

    if (!photos.side) {
      setErrorMessage("Please select Side Photo.");
      return;
    }

    if (!photos.back) {
      setErrorMessage("Please select Back Photo.");
      return;
    }

    try {
      setLoading(true);

      // STEP 1: UPLOAD THREE ANIMAL PHOTOS
      const photoResponse = await uploadAnimalPhotos(
        photos.front,
        photos.side,
        photos.back,
      );

      console.log("PHOTO UPLOAD RESPONSE:", photoResponse.data);

      // STEP 2: GET ANIMAL PHOTO URLS
      const frontPhotoUrl = photoResponse.data?.frontPhotoUrl;

      const sidePhotoUrl = photoResponse.data?.sidePhotoUrl;

      const backPhotoUrl = photoResponse.data?.backPhotoUrl;

      if (!frontPhotoUrl || !sidePhotoUrl || !backPhotoUrl) {
        setErrorMessage(
          "Photo upload completed but image URLs were not received.",
        );
        return;
      }

      // STEP 3: BUILD EXISTING ANIMAL REQUEST
      const finalRequestData = {
        animalName: animal.animalName,
        category: animal.category,
        breed: animal.breed,
        age: Number(animal.age),
        weight: animal.weight,
        color: animal.color,
        healthStatus: animal.healthStatus,

        // Existing vaccination-record text field
        vaccinationRecords: animal.vaccinationRecords,

        price: Number(animal.price),
        gender: animal.gender,
        description: animal.description,
        location: animal.location,

        frontPhotoUrl: frontPhotoUrl,
        sidePhotoUrl: sidePhotoUrl,
        backPhotoUrl: backPhotoUrl,

        sellerId: Number(currentSellerId),
      };

      console.log("FINAL ADD ANIMAL REQUEST:", finalRequestData);

      // STEP 4: ADD ANIMAL
      const response = await addAnimal(finalRequestData);

      console.log("ADD ANIMAL RESPONSE:", response.data);

      alert("Animal added successfully!");
      navigate("/seller/animals");
    } catch (error) {
      console.error("ERROR ADDING ANIMAL:", error);

      if (error.response) {
        console.error("BACKEND STATUS:", error.response.status);

        console.error("BACKEND RESPONSE:", error.response.data);

        setErrorMessage(
          error.response.data?.message || "Failed to add animal.",
        );
      } else if (error.request) {
        setErrorMessage("Unable to connect to backend server.");
      } else {
        setErrorMessage(error.message || "Failed to upload animal.");
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
      <div className="mb-4">
        <h2 className="fw-bold text-success">Add Animal</h2>
        <p className="text-muted">Add a new animal for sale.</p>
      </div>

      {errorMessage && (
        <div className="alert alert-danger">
          <strong>Error!</strong> {errorMessage}
        </div>
      )}

      <div className="card shadow border-0">
        <div className="card-body p-4">
          <form onSubmit={handleSubmit}>
            <div className="row">
              {/* ANIMAL NAME */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Animal Name
                  <span className="text-danger"> *</span>
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

              {/* CATEGORY */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Category
                  <span className="text-danger"> *</span>
                </label>

                <select
                  name="category"
                  value={animal.category}
                  onChange={handleCategoryChange}
                  className="form-select"
                >
                  <option value="">Select Category</option>

                  {animalCategories.map((category, index) => (
                    <option key={index} value={category.categoryName}>
                      {category.categoryName}
                    </option>
                  ))}
                </select>

                {animal.category && ageLimits[animal.category] && (
                  <small className="text-muted d-block mt-1">
                    Allowed age: {ageLimits[animal.category].min} to{" "}
                    {ageLimits[animal.category].max} years
                  </small>
                )}

                {animal.category &&
                  restrictedSaleCategories.includes(animal.category) && (
                    <small className="text-danger d-block mt-1">
                      This category is blocked from sale submission. Check
                      applicable laws before listing.
                    </small>
                  )}
              </div>

              {/* BREED */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Breed
                  <span className="text-danger"> *</span>
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
                      : "Select Breed"}
                  </option>

                  {breeds.map((breed, index) => (
                    <option key={index} value={breed}>
                      {breed}
                    </option>
                  ))}
                </select>
              </div>

              {/* AGE */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Age
                  <span className="text-danger"> *</span>
                </label>

                <input
                  type="number"
                  name="age"
                  value={animal.age}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter age in years"
                  min={animal.category ? ageLimits[animal.category]?.min : 0}
                  max={animal.category ? ageLimits[animal.category]?.max : ""}
                  step="0.1"
                  disabled={!animal.category}
                />

                {animal.category && ageLimits[animal.category] && (
                  <small className="text-muted d-block mt-1">
                    Minimum: {ageLimits[animal.category].min} year(s), Maximum:{" "}
                    {ageLimits[animal.category].max} year(s)
                  </small>
                )}
              </div>

              {/* WEIGHT */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Weight</label>

                <input
                  type="text"
                  name="weight"
                  value={animal.weight}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter animal weight"
                />
              </div>

              {/* COLOR */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Color</label>

                <input
                  type="text"
                  name="color"
                  value={animal.color}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter animal color"
                />
              </div>

              {/* HEALTH STATUS */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">Health Status</label>

                <input
                  type="text"
                  name="healthStatus"
                  value={animal.healthStatus}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter health status"
                />
              </div>

              {/* ==========================================
                  VACCINATION RECORDS
                  EXISTING TEXT + MULTIPLE PHOTO UPLOAD
              ========================================== */}
              {/* ========================================== */}
              {/* VACCINATION RECORD PHOTOS */}
              {/* ========================================== */}

              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Vaccination Records Photos
                </label>

                <input
                  type="file"
                  className="form-control"
                  accept="image/jpeg,image/png,image/webp"
                  multiple
                  onChange={handleVaccinationPhotoChange}
                />

                <small className="text-muted d-block mt-1">
                  Upload one or more vaccination record photos. JPG, PNG and
                  WEBP supported.
                </small>

                {/* VACCINATION PHOTO PREVIEW */}
                {vaccinationPhotoPreviews.length > 0 && (
                  <div className="row mt-3">
                    {vaccinationPhotoPreviews.map((preview, index) => (
                      <div className="col-6 mb-3" key={preview}>
                        <div className="card h-100">
                          <img
                            src={preview}
                            alt={`Vaccination Record ${index + 1}`}
                            className="card-img-top"
                            style={{
                              height: "160px",
                              objectFit: "contain",
                              padding: "8px",
                            }}
                          />

                          <div className="card-body p-2">
                            <p className="small text-muted text-break mb-2">
                              {vaccinationPhotos[index]?.name}
                            </p>

                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removeVaccinationPhoto(index)}
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* PRICE */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Price (₹)
                  <span className="text-danger"> *</span>
                </label>

                <input
                  type="number"
                  name="price"
                  value={animal.price}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter price"
                  min="1"
                  max={
                    animal.category &&
                    priceLimits[animal.category] !== undefined
                      ? priceLimits[animal.category]
                      : ""
                  }
                  step="1"
                  disabled={
                    !animal.category ||
                    restrictedSaleCategories.includes(animal.category)
                  }
                />

                {animal.category &&
                  priceLimits[animal.category] !== undefined && (
                    <small className="text-muted d-block mt-1">
                      Minimum price: ₹1 | Maximum price: ₹
                      {priceLimits[animal.category].toLocaleString("en-IN")}
                    </small>
                  )}

                {animal.category &&
                  !restrictedSaleCategories.includes(animal.category) &&
                  priceLimits[animal.category] === undefined && (
                    <small className="text-danger d-block mt-1">
                      Price limit is not configured for this category.
                    </small>
                  )}
              </div>

              {/* GENDER */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Gender
                  <span className="text-danger"> *</span>
                </label>

                <select
                  name="gender"
                  value={animal.gender}
                  onChange={handleChange}
                  className="form-select"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              {/* LOCATION */}
              <div className="col-md-6 mb-3">
                <label className="form-label fw-bold">
                  Location
                  <span className="text-danger"> *</span>
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

              {/* THREE ANIMAL PHOTOS */}
              <div className="col-12 mb-4">
                <label className="form-label fw-bold">
                  Animal Photos
                  <span className="text-danger"> *</span>
                </label>

                <div className="border rounded p-4 text-center bg-light">
                  <p className="mb-3 text-muted">
                    Select exactly 3 photos:
                    <br />
                    <strong>1. Front</strong> - <strong>2. Side</strong> -{" "}
                    <strong>3. Back</strong>
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
                    style={{ cursor: "pointer" }}
                  >
                    📷 Select Animal Photos
                  </label>

                  <p className="small text-muted mt-2 mb-0">
                    Exactly 3 photos required
                  </p>
                </div>
              </div>

              {/* THREE ANIMAL PHOTO PREVIEWS */}
              {(photoPreview.front ||
                photoPreview.side ||
                photoPreview.back) && (
                <div className="col-12 mb-4">
                  <h5 className="fw-bold mb-3">Selected Photos</h5>

                  <div className="row">
                    {/* FRONT */}
                    <div className="col-md-4 mb-3">
                      <div className="card">
                        {photoPreview.front ? (
                          <img
                            src={photoPreview.front}
                            alt="Front"
                            className="card-img-top"
                            style={{
                              height: "220px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center bg-light"
                            style={{ height: "220px" }}
                          >
                            No Front Photo
                          </div>
                        )}

                        <div className="card-body text-center">
                          <h6 className="fw-bold">Front Photo</h6>

                          {photos.front && (
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removePhoto("front")}
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
                            src={photoPreview.side}
                            alt="Side"
                            className="card-img-top"
                            style={{
                              height: "220px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center bg-light"
                            style={{ height: "220px" }}
                          >
                            No Side Photo
                          </div>
                        )}

                        <div className="card-body text-center">
                          <h6 className="fw-bold">Side Photo</h6>

                          {photos.side && (
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removePhoto("side")}
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
                            src={photoPreview.back}
                            alt="Back"
                            className="card-img-top"
                            style={{
                              height: "220px",
                              objectFit: "cover",
                            }}
                          />
                        ) : (
                          <div
                            className="d-flex align-items-center justify-content-center bg-light"
                            style={{ height: "220px" }}
                          >
                            No Back Photo
                          </div>
                        )}

                        <div className="card-body text-center">
                          <h6 className="fw-bold">Back Photo</h6>

                          {photos.back && (
                            <button
                              type="button"
                              className="btn btn-sm btn-danger"
                              onClick={() => removePhoto("back")}
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

              {/* DESCRIPTION */}
              <div className="col-12 mb-3">
                <label className="form-label fw-bold">Description</label>

                <textarea
                  name="description"
                  value={animal.description}
                  onChange={handleChange}
                  className="form-control"
                  rows="4"
                  placeholder="Enter animal description"
                />
              </div>

              {/* BUTTONS */}
              <div className="col-12 mt-3">
                <button
                  type="submit"
                  className="btn btn-success me-2"
                  disabled={loading}
                >
                  {loading ? "Uploading & Saving..." : "➕ Add Animal"}
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
