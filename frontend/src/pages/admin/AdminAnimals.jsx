import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminAnimals() {

    // =====================================================
    // STATES
    // =====================================================

    const [animals, setAnimals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");


    // =====================================================
    // LOAD ANIMALS FROM DATABASE
    // =====================================================

    useEffect(() => {

        const loadAnimals = async () => {

            try {

                setLoading(true);
                setError("");

                const response =
                    await AdminService.getAllAnimals();

                console.log(
                    "Admin Animals API Response:",
                    response.data
                );

                if (Array.isArray(response.data)) {

                    setAnimals(response.data);

                } else {

                    setAnimals([]);

                }

            } catch (err) {

                console.error(
                    "Admin Animals Error:",
                    err
                );

                setError(
                    err?.response?.data?.message ||
                    "Unable to load animals from database."
                );

                setAnimals([]);

            } finally {

                setLoading(false);

            }

        };

        loadAnimals();

    }, []);


    // =====================================================
    // ANIMAL IMAGE
    // =====================================================

    const getAnimalImage = (animal) => {

        const image =
            animal.imageUrl ||
            animal.frontImageUrl ||
            animal.animalImage;

        if (!image) {
            return null;
        }

        if (
            image.startsWith("http://") ||
            image.startsWith("https://")
        ) {
            return image;
        }

        return `http://localhost:8080${
            image.startsWith("/")
                ? ""
                : "/"
        }${image}`;

    };


    // =====================================================
    // FORMAT PRICE
    // =====================================================

    const formatPrice = (price) => {

        if (
            price === null ||
            price === undefined ||
            price === ""
        ) {
            return "-";
        }

        return `₹${Number(price).toLocaleString("en-IN")}`;

    };


    // =====================================================
    // STATUS
    // =====================================================

    const getStatus = (available) => {

        if (available === true) {

            return (
                <span className="badge bg-success">
                    Available
                </span>
            );

        }

        return (
            <span className="badge bg-danger">
                Sold
            </span>
        );

    };


    // =====================================================
    // LOADING
    // =====================================================

    if (loading) {

        return (

            <div className="d-flex">

                <AdminSidebar />

                <div
                    className="flex-grow-1 p-4"
                    style={{
                        marginLeft: "250px"
                    }}
                >

                    <div className="text-center py-5">

                        <div
                            className="spinner-border text-success"
                            role="status"
                        >
                        </div>

                        <p className="mt-3">
                            Loading animals from database...
                        </p>

                    </div>

                </div>

            </div>

        );

    }


    // =====================================================
    // MAIN PAGE
    // =====================================================

    return (

        <div
            className="d-flex"
            style={{
                minHeight: "100vh",
                backgroundColor: "#f7f8fc"
            }}
        >

            {/* =================================================
                ADMIN SIDEBAR
            ================================================= */}

            <AdminSidebar />


            {/* =================================================
                MAIN CONTENT
            ================================================= */}

            <div
                className="flex-grow-1"
                style={{
                    marginLeft: "250px"
                }}
            >

                {/* =================================================
                    PAGE HEADER
                ================================================= */}

                <div
                    className="bg-white border-bottom px-4 py-3"
                >

                    <h3 className="mb-1 fw-bold">
                        Manage Animals
                    </h3>

                    <p className="mb-0 text-muted">
                        Animals available in database.
                    </p>

                </div>


                {/* =================================================
                    PAGE CONTENT
                ================================================= */}

                <div className="p-4">


                    {/* =================================================
                        ERROR
                    ================================================= */}

                    {error && (

                        <div className="alert alert-danger">

                            {error}

                        </div>

                    )}


                    {/* =================================================
                        ANIMAL COUNT
                    ================================================= */}

                    <div
                        className="d-flex justify-content-end mb-3"
                    >

                        <strong>
                            Total Animals: {animals.length}
                        </strong>

                    </div>


                    {/* =================================================
                        ANIMAL TABLE
                    ================================================= */}

                    <div className="card border-0 shadow-sm">

                        <div className="card-body p-0">

                            <div className="table-responsive">

                                <table
                                    className="table table-hover align-middle mb-0"
                                >

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
                                                Price
                                            </th>

                                            <th>
                                                Seller
                                            </th>

                                            <th>
                                                Location
                                            </th>

                                            <th>
                                                Status
                                            </th>

                                        </tr>

                                    </thead>


                                    <tbody>

                                        {animals.length === 0 ? (

                                            <tr>

                                                <td
                                                    colSpan="9"
                                                    className="text-center py-5"
                                                >

                                                    No animals found
                                                    in database.

                                                </td>

                                            </tr>

                                        ) : (

                                            animals.map((animal) => (

                                                <tr
                                                    key={
                                                        animal.animalId
                                                    }
                                                >

                                                    {/* =================================
                                                        DATABASE ID
                                                    ================================= */}

                                                    <td>

                                                        <strong>
                                                            {
                                                                animal.animalId
                                                            }
                                                        </strong>

                                                    </td>


                                                    {/* =================================
                                                        ANIMAL
                                                    ================================= */}

                                                    <td>

                                                        <div
                                                            className="d-flex align-items-center"
                                                        >

                                                            {getAnimalImage(
                                                                animal
                                                            ) && (

                                                                <img
                                                                    src={getAnimalImage(
                                                                        animal
                                                                    )}
                                                                    alt={
                                                                        animal.animalName ||
                                                                        "Animal"
                                                                    }
                                                                    style={{
                                                                        width: "60px",
                                                                        height: "50px",
                                                                        objectFit:
                                                                            "cover",
                                                                        borderRadius:
                                                                            "8px",
                                                                        marginRight:
                                                                            "10px"
                                                                    }}
                                                                />

                                                            )}

                                                            <div>

                                                                <div className="fw-bold">

                                                                    {
                                                                        animal.animalName ||
                                                                        "-"
                                                                    }

                                                                </div>

                                                                <small className="text-muted">

                                                                    {
                                                                        animal.gender ||
                                                                        "-"
                                                                    }

                                                                </small>

                                                            </div>

                                                        </div>

                                                    </td>


                                                    {/* =================================
                                                        CATEGORY
                                                    ================================= */}

                                                    <td>

                                                        {
                                                            animal.categoryName ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* =================================
                                                        BREED
                                                    ================================= */}

                                                    <td>

                                                        {
                                                            animal.breed ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* =================================
                                                        AGE
                                                    ================================= */}

                                                    <td>

                                                        {
                                                            animal.age !==
                                                                null &&
                                                            animal.age !==
                                                                undefined
                                                                ? `${animal.age} Years`
                                                                : "-"
                                                        }

                                                    </td>


                                                    {/* =================================
                                                        PRICE
                                                    ================================= */}

                                                    <td>

                                                        <strong className="text-success">

                                                            {
                                                                formatPrice(
                                                                    animal.price
                                                                )
                                                            }

                                                        </strong>

                                                    </td>


                                                    {/* =================================
                                                        SELLER
                                                    ================================= */}

                                                    <td>

                                                        <div className="fw-semibold">

                                                            {
                                                                animal.sellerName ||
                                                                "-"
                                                            }

                                                        </div>

                                                        {animal.sellerId && (

                                                            <small className="text-muted">

                                                                Seller ID:{" "}
                                                                {
                                                                    animal.sellerId
                                                                }

                                                            </small>

                                                        )}

                                                    </td>


                                                    {/* =================================
                                                        LOCATION
                                                    ================================= */}

                                                    <td>

                                                        {
                                                            animal.location ||
                                                            "-"
                                                        }

                                                    </td>


                                                    {/* =================================
                                                        STATUS
                                                    ================================= */}

                                                    <td>

                                                        {
                                                            getStatus(
                                                                animal.available
                                                            )
                                                        }

                                                    </td>

                                                </tr>

                                            ))

                                        )}

                                    </tbody>

                                </table>

                            </div>

                        </div>

                    </div>


                    {/* =================================================
                        FOOTER COUNT
                    ================================================= */}

                    <div className="mt-3 text-muted">

                        Showing{" "}
                        <strong>
                            {animals.length}
                        </strong>{" "}
                        animals from database.

                    </div>

                </div>

            </div>

        </div>

    );

}

export default AdminAnimals;