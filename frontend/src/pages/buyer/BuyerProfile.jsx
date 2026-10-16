import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getCustomerById,
  updateCustomer,
} from "../../services/CustomerService";

function BuyerProfile() {
  const navigate = useNavigate();
  const customerId = localStorage.getItem("customerId");

  const [profile, setProfile] = useState({
    customerName: "",
    email: "",
    mobile: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    location: "",
    profileImage: "",
  });

  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const loadProfile = useCallback(async () => {
    if (!customerId) {
      navigate("/buyer/login");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const response = await getCustomerById(customerId);
      const customer = response.data;

      setProfile({
        customerName: customer.customerName || "",
        email: customer.email || "",
        mobile: customer.mobile || "",
        address: customer.address || "",
        city: customer.city || "",
        state: customer.state || "",
        pincode: customer.pincode || "",
        location: customer.location || "",
        profileImage: customer.profileImage || "",
      });
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to load your profile. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  }, [customerId, navigate]);

  useEffect(() => {
    loadProfile();
  }, [loadProfile]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProfile((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handleCancel = async () => {
    setEditing(false);
    setError("");
    setMessage("");
    await loadProfile();
  };

  const handleSave = async (event) => {
    event.preventDefault();

    if (!customerId) {
      navigate("/buyer/login");
      return;
    }

    try {
      setSaving(true);
      setError("");
      setMessage("");

      // Preserve fields handled by the existing backend update method.
      const existingResponse = await getCustomerById(customerId);
      const existingCustomer = existingResponse.data;

      const payload = {
        customerName: profile.customerName.trim(),
        email: profile.email.trim(),
        mobile: profile.mobile.trim(),
        address: profile.address.trim(),
        city: profile.city.trim(),
        state: profile.state.trim(),
        pincode: profile.pincode.trim(),
        location: profile.location.trim(),
        profileImage: existingCustomer.profileImage || "",
        password: existingCustomer.password || "",
        latitude: existingCustomer.latitude ?? null,
        longitude: existingCustomer.longitude ?? null,
      };

      const response = await updateCustomer(customerId, payload);
      const updatedCustomer = response.data;

      setProfile({
        customerName: updatedCustomer.customerName ?? payload.customerName,
        email: updatedCustomer.email ?? payload.email,
        mobile: updatedCustomer.mobile ?? payload.mobile,
        address: updatedCustomer.address ?? payload.address,
        city: updatedCustomer.city ?? payload.city,
        state: updatedCustomer.state ?? payload.state,
        pincode: updatedCustomer.pincode ?? payload.pincode,
        location: updatedCustomer.location ?? payload.location,
        profileImage: updatedCustomer.profileImage ?? payload.profileImage,
      });

      localStorage.setItem(
        "customerName",
        updatedCustomer.customerName || payload.customerName,
      );
      localStorage.setItem(
        "customerEmail",
        updatedCustomer.email || payload.email,
      );

      setEditing(false);
      setMessage("Profile updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to update your profile. Please try again.",
      );
    } finally {
      setSaving(false);
    }
  };

  const initials = (profile.customerName || "Buyer")
    .trim()
    .charAt(0)
    .toUpperCase();

  const fields = [
    {
      name: "customerName",
      label: "Full Name",
      type: "text",
      required: true,
      placeholder: "Enter your full name",
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      required: true,
      placeholder: "Enter your email",
    },
    {
      name: "mobile",
      label: "Mobile Number",
      type: "tel",
      required: true,
      placeholder: "Enter your mobile number",
    },
    {
      name: "address",
      label: "Address",
      type: "text",
      placeholder: "Enter your street or house address",
    },
    {
      name: "city",
      label: "City",
      type: "text",
      placeholder: "Enter your city",
    },
    {
      name: "state",
      label: "State",
      type: "text",
      placeholder: "Enter your state",
    },
    {
      name: "pincode",
      label: "Pincode",
      type: "text",
      placeholder: "Enter your pincode",
    },
    {
      name: "location",
      label: "Location",
      type: "text",
      placeholder: "Enter your location",
    },
  ];

  const styles = {
    page: {
      minHeight: "calc(100vh - 70px)",
      background: "#f5f8f6",
      padding: "30px 20px 48px",
      color: "#20352a",
      boxSizing: "border-box",
    },
    container: {
      maxWidth: "1080px",
      margin: "0 auto",
      width: "100%",
    },
    navRow: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      flexWrap: "wrap",
      gap: "12px",
      marginBottom: "25px",
    },
    breadcrumb: {
      color: "#718078",
      fontSize: "13px",
      fontWeight: 600,
    },
    backButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "10px 16px",
      background: "#fff",
      color: "#34483b",
      border: "1px solid #dce5df",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
    },
    pageHeading: {
      margin: "0 0 7px",
      fontSize: "clamp(25px, 4vw, 32px)",
      fontWeight: 800,
      letterSpacing: "-0.7px",
      color: "#183d29",
    },
    subtitle: {
      margin: 0,
      color: "#718078",
      fontSize: "14px",
      lineHeight: 1.6,
    },
    card: {
      marginTop: "25px",
      overflow: "hidden",
      background: "#fff",
      border: "1px solid #e4ebe6",
      borderRadius: "20px",
      boxShadow: "0 8px 30px rgba(30, 65, 43, 0.06)",
    },
    profileHeader: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "20px",
      flexWrap: "wrap",
      padding: "28px",
      background:
        "linear-gradient(120deg, #edf8f0 0%, #f7fbf8 65%, #eaf5ee 100%)",
      borderBottom: "1px solid #e2eee5",
    },
    identity: {
      display: "flex",
      alignItems: "center",
      gap: "17px",
      minWidth: 0,
    },
    avatar: {
      width: "76px",
      height: "76px",
      minWidth: "76px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      border: "3px solid #fff",
      background: "#198754",
      color: "#fff",
      fontSize: "30px",
      fontWeight: 800,
      boxShadow: "0 4px 12px rgba(25, 135, 84, 0.18)",
      objectFit: "cover",
    },
    name: {
      margin: "0 0 6px",
      color: "#1b3e2a",
      fontSize: "21px",
      fontWeight: 800,
      overflowWrap: "anywhere",
    },
    email: {
      margin: 0,
      color: "#697b70",
      fontSize: "13px",
      overflowWrap: "anywhere",
    },
    accountLabel: {
      display: "inline-block",
      marginTop: "10px",
      borderRadius: "20px",
      padding: "5px 10px",
      background: "#dff3e6",
      color: "#187043",
      fontSize: "11px",
      fontWeight: 800,
      letterSpacing: "0.3px",
    },
    primaryButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "8px",
      padding: "11px 18px",
      border: "1px solid #198754",
      borderRadius: "10px",
      background: "#198754",
      color: "#fff",
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
    },
    secondaryButton: {
      display: "inline-flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "11px 18px",
      border: "1px solid #d8e2dc",
      borderRadius: "10px",
      background: "#fff",
      color: "#46594d",
      fontSize: "13px",
      fontWeight: 700,
      cursor: "pointer",
    },
    content: {
      padding: "28px",
    },
    sectionTitle: {
      margin: "0 0 6px",
      fontSize: "17px",
      fontWeight: 800,
      color: "#203a2b",
    },
    sectionDescription: {
      margin: "0 0 25px",
      fontSize: "13px",
      lineHeight: 1.6,
      color: "#819087",
    },
    fieldGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 260px), 1fr))",
      gap: "21px 24px",
    },
    label: {
      display: "block",
      marginBottom: "8px",
      color: "#45594c",
      fontSize: "12px",
      fontWeight: 750,
    },
    input: {
      display: "block",
      width: "100%",
      minHeight: "46px",
      padding: "11px 13px",
      boxSizing: "border-box",
      border: "1px solid #dfe7e1",
      borderRadius: "9px",
      outlineColor: "#198754",
      color: "#22372a",
      fontSize: "14px",
      transition: "border-color 0.2s ease",
    },
    footer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      gap: "12px",
      flexWrap: "wrap",
      marginTop: "30px",
      paddingTop: "22px",
      borderTop: "1px solid #edf1ee",
    },
    notice: {
      marginTop: "18px",
      padding: "13px 15px",
      background: "#eaf7ef",
      color: "#187043",
      border: "1px solid #ccebd7",
      borderRadius: "10px",
      fontSize: "13px",
      fontWeight: 600,
    },
    error: {
      marginTop: "18px",
      padding: "13px 15px",
      background: "#fff0f0",
      color: "#a12e2e",
      border: "1px solid #f3d0d0",
      borderRadius: "10px",
      fontSize: "13px",
    },
    stateBox: {
      padding: "36px 20px",
      textAlign: "center",
      background: "#fff",
      border: "1px solid #e4ebe6",
      borderRadius: "16px",
      color: "#65766a",
      lineHeight: 1.7,
    },
  };

  if (loading) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <div style={styles.stateBox}>Loading your profile...</div>
        </div>
      </div>
    );
  }

  if (error && !profile.customerName && !profile.email) {
    return (
      <div style={styles.page}>
        <div style={styles.container}>
          <button
            type="button"
            style={styles.backButton}
            onClick={() => navigate("/buyer/dashboard")}
          >
            ← Back to Dashboard
          </button>

          <div style={{ ...styles.stateBox, marginTop: "20px" }}>
            <h2 style={{ color: "#a12e2e", fontSize: "19px" }}>
              Profile could not be loaded
            </h2>
            <p>{error}</p>
            <button
              type="button"
              style={styles.primaryButton}
              onClick={loadProfile}
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.navRow}>
          <div style={styles.breadcrumb}>
            Buyer Account&nbsp; / &nbsp;My Profile
          </div>

          <button
            type="button"
            style={styles.backButton}
            onClick={() => navigate("/buyer/dashboard")}
          >
            ← Back to Dashboard
          </button>
        </div>

        <div>
          <h1 style={styles.pageHeading}>My Profile</h1>
          <p style={styles.subtitle}>
            View and manage your personal information.
          </p>
        </div>

        {error && (
          <div style={styles.error} role="alert">
            {error}
          </div>
        )}

        {message && (
          <div style={styles.notice} role="status">
            ✓ {message}
          </div>
        )}

        <section style={styles.card}>
          <div style={styles.profileHeader}>
            <div style={styles.identity}>
              {profile.profileImage ? (
                <img
                  src={
                    profile.profileImage.startsWith("http")
                      ? profile.profileImage
                      : `http://localhost:8080${profile.profileImage}`
                  }
                  alt="Buyer profile"
                  style={styles.avatar}
                  onError={(event) => {
                    event.currentTarget.style.display = "none";
                  }}
                />
              ) : (
                <div style={styles.avatar}>{initials}</div>
              )}

              <div style={{ minWidth: 0 }}>
                <h2 style={styles.name}>{profile.customerName || "Buyer"}</h2>
                <p style={styles.email}>
                  {profile.email || "Email not provided"}
                </p>
                <span style={styles.accountLabel}>BUYER PROFILE</span>
              </div>
            </div>

            {!editing && (
              <button
                type="button"
                style={styles.primaryButton}
                onClick={() => {
                  setError("");
                  setMessage("");
                  setEditing(true);
                }}
              >
                ✎ Edit Profile
              </button>
            )}
          </div>

          <div style={styles.content}>
            <h3 style={styles.sectionTitle}>Personal Information</h3>
            <p style={styles.sectionDescription}>
              Keep your contact details up to date for a smoother buying
              experience.
            </p>

            <form onSubmit={handleSave}>
              <div style={styles.fieldGrid}>
                {fields.map((field) => (
                  <div key={field.name}>
                    <label
                      htmlFor={`profile-${field.name}`}
                      style={styles.label}
                    >
                      {field.label}
                      {field.required && editing ? " *" : ""}
                    </label>

                    <input
                      id={`profile-${field.name}`}
                      name={field.name}
                      type={field.type}
                      value={profile[field.name]}
                      onChange={handleChange}
                      readOnly={!editing}
                      required={Boolean(field.required && editing)}
                      maxLength={field.name === "pincode" ? 10 : 150}
                      placeholder={field.placeholder}
                      autoComplete={
                        field.name === "customerName"
                          ? "name"
                          : field.name === "email"
                            ? "email"
                            : field.name === "mobile"
                              ? "tel"
                              : "off"
                      }
                      style={{
                        ...styles.input,
                        background: editing ? "#fff" : "#f8faf8",
                        cursor: editing ? "text" : "default",
                      }}
                    />
                  </div>
                ))}
              </div>

              {editing && (
                <div style={styles.footer}>
                  <p
                    style={{
                      margin: 0,
                      color: "#8a978e",
                      fontSize: "12px",
                    }}
                  >
                    Fields marked * are required.
                  </p>

                  <div
                    style={{
                      display: "flex",
                      gap: "10px",
                      flexWrap: "wrap",
                    }}
                  >
                    <button
                      type="button"
                      style={styles.secondaryButton}
                      disabled={saving}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>

                    <button
                      type="submit"
                      style={{
                        ...styles.primaryButton,
                        opacity: saving ? 0.7 : 1,
                        cursor: saving ? "wait" : "pointer",
                      }}
                      disabled={saving}
                    >
                      {saving ? "Saving..." : "✓ Save Changes"}
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>

        <p
          style={{
            textAlign: "center",
            margin: "20px 0 0",
            color: "#94a097",
            fontSize: "12px",
          }}
        >
          AnimalSale · Your account information
        </p>
      </div>
    </div>
  );
}

export default BuyerProfile;
