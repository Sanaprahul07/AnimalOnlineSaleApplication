import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminAnimals() {

  const [animals, setAnimals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {

    const loadAnimals = async () => {

      try {

        setLoading(true);
        setErrorMessage("");

        const response = await AdminService.getAllAnimals();

        const data = response.data;

        if (Array.isArray(data)) {

          setAnimals(data);

        } else if (data?.data && Array.isArray(data.data)) {

          setAnimals(data.data);

        } else {

          setAnimals([]);
        }

      } catch (error) {

        console.error("Animals Loading Error:", error);

        setErrorMessage(
          error.response?.data?.message ||
          "Unable to load animals."
        );

      } finally {

        setLoading(false);
      }
    };

    loadAnimals();

  }, []);

  // =========================================
  // GET ANIMAL IMAGE
  // =========================================

  const getAnimalImage = (animal) => {

    const image =
      animal.frontImageUrl ||
      animal.imageUrl ||
      animal.sideImageUrl ||
      animal.backImageUrl;

    if (!image) {
      return "https://via.placeholder.com/100x80?text=Animal";
    }

    // If backend already returns complete URL
    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    // If image is stored as backend path
    return `http://localhost:8080${image.startsWith("/") ? "" : "/"}${image}`;
  };

  // =========================================
  // AVAILABLE STATUS
  // =========================================

  const getAvailableStatus = (available) => {

    if (available === true) {
      return (
        <span className="badge bg-success">
          AVAILABLE
        </span>
      );
    }

    return (
      <span className="badge bg-secondary">
        NOT AVAILABLE
      </span>
    );
  };

  // =========================================
  // APPROVAL STATUS
  // =========================================

  const getApprovalStatus = (status) => {

    const value = status?.toUpperCase();

    if (value === "APPROVED") {

      return (
        <span className="badge bg-success">
          APPROVED
        </span>
      );
    }

    if (value === "REJECTED") {

      return (
        <span className="badge bg-danger">
          REJECTED
        </span>
      );
    }

    return (
      <span className="badge bg-warning text-dark">
        PENDING
      </span>
    );
  };

  return (

    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f8fc"
      }}
    >

      <AdminSidebar />

      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)"
        }}
      >

        {/* =========================================
            HEADER
        ========================================= */}

        <div className="bg-white border-bottom px-4 py-3">

          <h3 className="fw-bold mb-1">
            Animal Management
          </h3>

          <small className="text-muted">
            All animals registered by sellers
          </small>

        </div>

        {/* =========================================
            CONTENT
        ========================================= */}

        <div className="p-4">

          {errorMessage && (

            <div className="alert alert-danger">
              {errorMessage}
            </div>

          )}

          <div className="card border-0 shadow-sm">

            <div className="card-body">

              {/* =========================================
                  LOADING
              ========================================= */}

              {loading ? (

                <div className="text-center py-5">

                  <div
                    className="spinner-border text-success"
                    role="status"
                  />

                  <p className="mt-3 text-muted">
                    Loading animals...
                  </p>

                </div>

              ) : animals.length === 0 ? (

                <div className="alert alert-info mb-0">

                  No animals found.

                </div>

              ) : (

                <div className="table-responsive">

                  <table className="table table-hover align-middle">

                    <thead className="table-light">

                      <tr>

                        <th>ID</th>

                        <th>Animal</th>

                        <th>Category</th>

                        <th>Breed</th>

                        <th>Age</th>

                        <th>Price</th>

                        <th>Seller</th>

                        <th>Seller Contact</th>

                        <th>Location</th>

                        <th>Status</th>

                        <th>Approval</th>

                      </tr>

                    </thead>

                    <tbody>

                      {animals.map((animal) => (

                        <tr key={animal.id}>

                          {/* ID */}

                          <td>
                            <strong>
                              #{animal.id}
                            </strong>
                          </td>

                          {/* ANIMAL */}

                          <td>

                            <div
                              className="d-flex align-items-center"
                              style={{
                                minWidth: "180px"
                              }}
                            >

                              <img
                                src={getAnimalImage(animal)}
                                alt={animal.animalName || "Animal"}
                                style={{
                                  width: "75px",
                                  height: "60px",
                                  objectFit: "cover",
                                  borderRadius: "8px",
                                  marginRight: "12px"
                                }}
                                onError={(e) => {
                                  e.currentTarget.src =
                                    "https://via.placeholder.com/100x80?text=Animal";
                                }}
                              />

                              <div>

                                <div className="fw-bold">
                                  {animal.animalName || "-"}
                                </div>

                                <small className="text-muted">
                                  {animal.gender || "-"}
                                </small>

                              </div>

                            </div>

                          </td>

                          {/* CATEGORY */}

                          <td>
                            {animal.category || "-"}
                          </td>

                          {/* BREED */}

                          <td>
                            {animal.breed || "-"}
                          </td>

                          {/* AGE */}

                          <td>
                            {animal.age != null
                              ? `${animal.age} Years`
                              : "-"}
                          </td>

                          {/* PRICE */}

                          <td>

                            <strong>
                              {animal.price != null
                                ? `₹${animal.price}`
                                : "-"}
                            </strong>

                          </td>

                          {/* SELLER */}

                          <td>

                            <div
                              className="fw-semibold"
                              style={{
                                minWidth: "150px"
                              }}
                            >
                              {animal.sellerName || "-"}
                            </div>

                            <small className="text-muted">
                              Seller ID:{" "}
                              {animal.sellerId || "-"}
                            </small>

                          </td>

                          {/* SELLER CONTACT */}

                          <td>

                            <div>
                              {animal.sellerMobile || "-"}
                            </div>

                            <small className="text-muted">
                              {animal.sellerEmail || "-"}
                            </small>

                          </td>

                          {/* LOCATION */}

                          <td>

                            <div
                              style={{
                                minWidth: "150px"
                              }}
                            >
                              {animal.sellerLocation ||
                                animal.location ||
                                "-"}
                            </div>

                          </td>

                          {/* AVAILABLE */}

                          <td>

                            {getAvailableStatus(
                              animal.available
                            )}

                          </td>

                          {/* APPROVAL */}

                          <td>

                            {getApprovalStatus(
                              animal.approvalStatus
                            )}

                          </td>

                        </tr>

                      ))}

                    </tbody>

                  </table>

                </div>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AdminAnimals;