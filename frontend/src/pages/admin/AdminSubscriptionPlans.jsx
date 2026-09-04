import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

function AdminSubscriptionPlans() {

  const [plans, setPlans] = useState([]);

  const [showForm, setShowForm] = useState(false);

  const [editMode, setEditMode] = useState(false);

  const [selectedPlanId, setSelectedPlanId] = useState(null);

  const [loading, setLoading] = useState(true);

  const [saving, setSaving] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [formData, setFormData] = useState({
    planName: "",
    durationMonths: "",
    price: "",
    description: "",
    active: true
  });


  // =====================================================
  // LOAD ALL SUBSCRIPTION PLANS
  // =====================================================

  const loadPlans = async () => {

    try {

      setLoading(true);
      setError("");

      const response =
        await AdminService.getAllSubscriptionPlans();

      setPlans(response.data || []);

    } catch (err) {

      console.error(
        "Get Subscription Plans Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to load subscription plans."
      );

    } finally {

      setLoading(false);

    }
  };


  // =====================================================
  // LOAD PLANS WHEN PAGE OPENS
  // =====================================================

  useEffect(() => {

    loadPlans();

  }, []);


  // =====================================================
  // FORM INPUT CHANGE
  // =====================================================

  const handleChange = (e) => {

    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));

  };


  // =====================================================
  // OPEN ADD FORM
  // =====================================================

  const handleAddPlan = () => {

    setEditMode(false);

    setSelectedPlanId(null);

    setFormData({
      planName: "",
      durationMonths: "",
      price: "",
      description: "",
      active: true
    });

    setError("");

    setSuccess("");

    setShowForm(true);
  };


  // =====================================================
  // OPEN EDIT FORM
  // =====================================================

  const handleEditPlan = (plan) => {

    setEditMode(true);

    setSelectedPlanId(plan.id);

    setFormData({
      planName: plan.planName || "",
      durationMonths: plan.durationMonths || "",
      price: plan.price || "",
      description: plan.description || "",
      active:
        plan.active === undefined
          ? true
          : plan.active
    });

    setError("");

    setSuccess("");

    setShowForm(true);
  };


  // =====================================================
  // CLOSE FORM
  // =====================================================

  const handleCloseForm = () => {

    setShowForm(false);

    setEditMode(false);

    setSelectedPlanId(null);

    setError("");

  };


  // =====================================================
  // SAVE PLAN
  // =====================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    setError("");

    setSuccess("");


    // -------------------------------------------------
    // VALIDATION
    // -------------------------------------------------

    if (!formData.planName.trim()) {

      setError("Plan name is required.");

      return;
    }


    if (!formData.durationMonths) {

      setError(
        "Please select subscription duration."
      );

      return;
    }


    if (
      Number(formData.durationMonths) !== 6 &&
      Number(formData.durationMonths) !== 12
    ) {

      setError(
        "Only 6 Months or 1 Year plans are allowed."
      );

      return;
    }


    if (
      formData.price === "" ||
      Number(formData.price) < 0
    ) {

      setError(
        "Please enter a valid price."
      );

      return;
    }


    // -------------------------------------------------
    // REQUEST DATA
    // -------------------------------------------------

    const planData = {

      planName:
        formData.planName.trim(),

      durationMonths:
        Number(formData.durationMonths),

      price:
        Number(formData.price),

      description:
        formData.description.trim(),

      active:
        formData.active
    };


    try {

      setSaving(true);


      // =================================================
      // UPDATE PLAN
      // =================================================

      if (editMode) {

        await AdminService.updateSubscriptionPlan(
          selectedPlanId,
          planData
        );

        setSuccess(
          "Subscription plan updated successfully."
        );

      }


      // =================================================
      // ADD PLAN
      // =================================================

      else {

        await AdminService.addSubscriptionPlan(
          planData
        );

        setSuccess(
          "Subscription plan created successfully."
        );

      }


      // =================================================
      // RELOAD DATA FROM DATABASE
      // =================================================

      await loadPlans();


      // =================================================
      // CLOSE FORM
      // =================================================

      setShowForm(false);

      setEditMode(false);

      setSelectedPlanId(null);


    } catch (err) {

      console.error(
        "Save Subscription Plan Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Unable to save subscription plan."
      );

    } finally {

      setSaving(false);

    }

  };


  // =====================================================
  // ACTIVATE PLAN
  // =====================================================

  const handleActivate = async (id) => {

    try {

      setError("");

      setSuccess("");


      await AdminService.activateSubscriptionPlan(
        id
      );


      setSuccess(
        "Subscription plan activated successfully."
      );


      await loadPlans();

    } catch (err) {

      console.error(
        "Activate Subscription Plan Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to activate subscription plan."
      );

    }

  };


  // =====================================================
  // DEACTIVATE PLAN
  // =====================================================

  const handleDeactivate = async (id) => {

    try {

      setError("");

      setSuccess("");


      await AdminService.deactivateSubscriptionPlan(
        id
      );


      setSuccess(
        "Subscription plan deactivated successfully."
      );


      await loadPlans();

    } catch (err) {

      console.error(
        "Deactivate Subscription Plan Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        "Unable to deactivate subscription plan."
      );

    }

  };


  // =====================================================
  // DELETE PLAN
  // =====================================================

  const handleDelete = async (id) => {

    const confirmed =
      window.confirm(
        "Are you sure you want to delete this subscription plan?"
      );


    if (!confirmed) {

      return;

    }


    try {

      setError("");

      setSuccess("");


      await AdminService.deleteSubscriptionPlan(
        id
      );


      setSuccess(
        "Subscription plan deleted successfully."
      );


      await loadPlans();

    } catch (err) {

      console.error(
        "Delete Subscription Plan Error:",
        err
      );

      setError(
        err.response?.data?.message ||
        err.response?.data ||
        "Unable to delete subscription plan."
      );

    }

  };


  // =====================================================
  // FORMAT DURATION
  // =====================================================

  const getDurationText = (months) => {

    if (Number(months) === 6) {

      return "6 Months";

    }


    if (Number(months) === 12) {

      return "1 Year";

    }


    return `${months} Months`;

  };


  // =====================================================
  // RETURN UI
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


      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)"
        }}
      >


        {/* =================================================
            PAGE HEADER
        ================================================= */}

        <div
          className="bg-white border-bottom px-4 py-3 d-flex justify-content-between align-items-center"
        >

          <div>

            <h3 className="fw-bold mb-1">
              Subscription Plans
            </h3>

            <small className="text-muted">
              Manage seller subscription plans
            </small>

          </div>


          <button
            className="btn btn-primary"
            onClick={handleAddPlan}
          >
            + Create Plan
          </button>

        </div>


        {/* =================================================
            PAGE CONTENT
        ================================================= */}

        <div className="p-4">


          {/* =================================================
              SUCCESS MESSAGE
          ================================================= */}

          {success && (

            <div
              className="alert alert-success"
              role="alert"
            >
              {success}
            </div>

          )}


          {/* =================================================
              ERROR MESSAGE
          ================================================= */}

          {error && (

            <div
              className="alert alert-danger"
              role="alert"
            >
              {error}
            </div>

          )}


          {/* =================================================
              ADD / EDIT FORM
          ================================================= */}

          {showForm && (

            <div className="card border-0 shadow-sm mb-4">

              <div className="card-body">


                <div className="d-flex justify-content-between align-items-center mb-4">

                  <h5 className="fw-bold mb-0">

                    {editMode
                      ? "Edit Subscription Plan"
                      : "Create Subscription Plan"}

                  </h5>


                  <button
                    type="button"
                    className="btn btn-sm btn-outline-secondary"
                    onClick={handleCloseForm}
                  >
                    Close
                  </button>

                </div>


                <form onSubmit={handleSubmit}>

                  <div className="row">


                    {/* =================================================
                        PLAN NAME
                    ================================================= */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">

                        Plan Name *

                      </label>


                      <input
                        type="text"
                        name="planName"
                        className="form-control"
                        placeholder="Example: Seller 6 Months Plan"
                        value={formData.planName}
                        onChange={handleChange}
                      />

                    </div>


                    {/* =================================================
                        DURATION
                    ================================================= */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">

                        Duration *

                      </label>


                      <select
                        name="durationMonths"
                        className="form-select"
                        value={formData.durationMonths}
                        onChange={handleChange}
                      >

                        <option value="">
                          Select Duration
                        </option>


                        <option value="6">
                          6 Months
                        </option>


                        <option value="12">
                          1 Year
                        </option>

                      </select>

                    </div>


                    {/* =================================================
                        PRICE
                    ================================================= */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">

                        Price *

                      </label>


                      <div className="input-group">

                        <span className="input-group-text">
                          ₹
                        </span>


                        <input
                          type="number"
                          name="price"
                          className="form-control"
                          placeholder="Enter price"
                          min="0"
                          value={formData.price}
                          onChange={handleChange}
                        />

                      </div>

                    </div>


                    {/* =================================================
                        STATUS
                    ================================================= */}

                    <div className="col-md-6 mb-3">

                      <label className="form-label fw-semibold">

                        Status

                      </label>


                      <select
                        name="active"
                        className="form-select"
                        value={formData.active}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            active:
                              e.target.value === "true"
                          }))
                        }
                      >

                        <option value="true">
                          Active
                        </option>


                        <option value="false">
                          Inactive
                        </option>

                      </select>

                    </div>


                    {/* =================================================
                        DESCRIPTION
                    ================================================= */}

                    <div className="col-12 mb-3">

                      <label className="form-label fw-semibold">

                        Description

                      </label>


                      <textarea
                        name="description"
                        className="form-control"
                        rows="3"
                        placeholder="Enter plan description"
                        value={formData.description}
                        onChange={handleChange}
                      />

                    </div>


                    {/* =================================================
                        BUTTONS
                    ================================================= */}

                    <div className="col-12">

                      <button
                        type="submit"
                        className="btn btn-primary me-2"
                        disabled={saving}
                      >

                        {saving
                          ? "Saving..."
                          : editMode
                            ? "Update Plan"
                            : "Create Plan"}

                      </button>


                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={handleCloseForm}
                        disabled={saving}
                      >

                        Cancel

                      </button>

                    </div>

                  </div>

                </form>

              </div>

            </div>

          )}


          {/* =================================================
              PLAN LIST
          ================================================= */}

          <div className="card border-0 shadow-sm">

            <div className="card-body">


              <div className="d-flex justify-content-between align-items-center mb-3">

                <div>

                  <h5 className="fw-bold mb-1">
                    Subscription Plans
                  </h5>

                  <small className="text-muted">
                    Plans available for sellers
                  </small>

                </div>


                <span className="badge bg-primary">

                  {plans.length} Plans

                </span>

              </div>


              {/* =================================================
                  LOADING
              ================================================= */}

              {loading ? (

                <div className="text-center py-5">

                  <div
                    className="spinner-border text-primary"
                    role="status"
                  />

                  <p className="text-muted mt-3 mb-0">

                    Loading subscription plans...

                  </p>

                </div>

              ) : plans.length === 0 ? (

                /* =================================================
                   NO PLANS
                ================================================= */

                <div className="text-center py-5">

                  <h6 className="fw-bold">

                    No Subscription Plans Found

                  </h6>


                  <p className="text-muted">

                    Create your first seller subscription plan.

                  </p>


                  <button
                    className="btn btn-primary"
                    onClick={handleAddPlan}
                  >

                    + Create Plan

                  </button>

                </div>

              ) : (

                /* =================================================
                   TABLE
                ================================================= */

                <div className="table-responsive">

                  <table className="table table-hover align-middle mb-0">

                    <thead className="table-light">

                      <tr>

                        <th>#</th>

                        <th>Plan Name</th>

                        <th>Duration</th>

                        <th>Price</th>

                        <th>Description</th>

                        <th>Status</th>

                        <th>Actions</th>

                      </tr>

                    </thead>


                    <tbody>

                      {plans.map((plan, index) => (

                        <tr key={plan.id}>


                          <td>

                            {index + 1}

                          </td>


                          <td>

                            <span className="fw-semibold">

                              {plan.planName}

                            </span>

                          </td>


                          <td>

                            <span className="badge bg-info text-dark">

                              {getDurationText(
                                plan.durationMonths
                              )}

                            </span>

                          </td>


                          <td>

                            <span className="fw-semibold">

                              ₹
                              {Number(
                                plan.price || 0
                              ).toLocaleString("en-IN")}

                            </span>

                          </td>


                          <td>

                            <span className="text-muted">

                              {plan.description || "-"}

                            </span>

                          </td>


                          <td>

                            {plan.active ? (

                              <span className="badge bg-success">

                                Active

                              </span>

                            ) : (

                              <span className="badge bg-secondary">

                                Inactive

                              </span>

                            )}

                          </td>


                          <td>

                            <div className="d-flex gap-2 flex-wrap">


                              {/* =================================================
                                  EDIT
                              ================================================= */}

                              <button
                                className="btn btn-sm btn-outline-primary"
                                onClick={() =>
                                  handleEditPlan(plan)
                                }
                              >

                                Edit

                              </button>


                              {/* =================================================
                                  ACTIVATE
                              ================================================= */}

                              {!plan.active && (

                                <button
                                  className="btn btn-sm btn-outline-success"
                                  onClick={() =>
                                    handleActivate(
                                      plan.id
                                    )
                                  }
                                >

                                  Activate

                                </button>

                              )}


                              {/* =================================================
                                  DEACTIVATE
                              ================================================= */}

                              {plan.active && (

                                <button
                                  className="btn btn-sm btn-outline-warning"
                                  onClick={() =>
                                    handleDeactivate(
                                      plan.id
                                    )
                                  }
                                >

                                  Deactivate

                                </button>

                              )}


                              {/* =================================================
                                  DELETE
                              ================================================= */}

                              <button
                                className="btn btn-sm btn-outline-danger"
                                onClick={() =>
                                  handleDelete(
                                    plan.id
                                  )
                                }
                              >

                                Delete

                              </button>

                            </div>

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

export default AdminSubscriptionPlans;