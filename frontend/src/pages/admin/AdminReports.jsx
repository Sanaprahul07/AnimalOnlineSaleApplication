import { useEffect, useState } from "react";
import AdminSidebar from "../../components/Admin/AdminSidebar";
import AdminService from "../../services/AdminService";

const MONTH_NAMES = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const createEmptyMonthlyData = () =>
  MONTH_NAMES.map((monthName, index) => ({
    monthNumber: index + 1,
    monthName,
    sellerCount: 0,
  }));

function AdminReports() {
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  const [monthlyData, setMonthlyData] = useState(createEmptyMonthlyData());

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =====================================================
  // LOAD MONTHLY SELLER REGISTRATION REPORT
  // =====================================================

  const loadMonthlyReport = async (year) => {
    try {
      setLoading(true);
      setError("");

      const response = await AdminService.getMonthlySellerRegistrations(year);

      const apiData = Array.isArray(response.data) ? response.data : [];

      // Always show January to December
      const completeMonthlyData = MONTH_NAMES.map((monthName, index) => {
        const monthNumber = index + 1;

        const matchedMonth = apiData.find(
          (item) => Number(item.monthNumber) === monthNumber,
        );

        return {
          monthNumber,
          monthName,
          sellerCount: matchedMonth ? Number(matchedMonth.sellerCount) || 0 : 0,
        };
      });

      setMonthlyData(completeMonthlyData);
    } catch (err) {
      console.error("Monthly Seller Report Error:", err);

      setError(
        err.response?.data?.message || "Failed to load monthly seller report.",
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOAD REPORT WHEN YEAR CHANGES
  // =====================================================

  useEffect(() => {
    loadMonthlyReport(selectedYear);
  }, [selectedYear]);

  // =====================================================
  // SUMMARY CALCULATIONS
  // =====================================================

  const totalSellers = monthlyData.reduce(
    (total, month) => total + month.sellerCount,
    0,
  );

  const highestMonthlyCount = Math.max(
    ...monthlyData.map((month) => month.sellerCount),
    0,
  );

  const highestMonth = monthlyData.reduce(
    (highest, month) =>
      month.sellerCount > (highest?.sellerCount ?? 0) ? month : highest,
    null,
  );

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div
      className="d-flex"
      style={{
        minHeight: "100vh",
        backgroundColor: "#f7f8fc",
      }}
    >
      {/* EXISTING SIDEBAR */}

      <AdminSidebar />

      {/* MAIN CONTENT */}

      <div
        style={{
          marginLeft: "250px",
          width: "calc(100% - 250px)",
          minWidth: 0,
        }}
      >
        {/* EXISTING HEADER */}

        <div className="bg-white border-bottom px-4 py-3">
          <h3 className="fw-bold mb-1">Reports</h3>

          <small className="text-muted">
            Application reports and analytics
          </small>
        </div>

        <div className="p-4">
          {/* =====================================================
              MONTHLY SELLER REGISTRATION REPORT
          ===================================================== */}

          <div className="card border-0 shadow-sm mb-4">
            <div className="card-body">
              <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-4">
                <div>
                  <h5 className="fw-bold mb-1">
                    Monthly Seller Registration Report
                  </h5>

                  <small className="text-muted">
                    Monthly seller counts from first payment dates
                  </small>
                </div>

                <div className="d-flex align-items-center gap-2">
                  <label htmlFor="reportYear" className="fw-semibold">
                    Year
                  </label>

                  <select
                    id="reportYear"
                    className="form-select"
                    style={{ width: "120px" }}
                    value={selectedYear}
                    onChange={(event) =>
                      setSelectedYear(Number(event.target.value))
                    }
                  >
                    {Array.from(
                      { length: 7 },
                      (_, index) => new Date().getFullYear() - 5 + index,
                    ).map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>

                  <button
                    type="button"
                    className="btn btn-outline-primary"
                    disabled={loading}
                    onClick={() => loadMonthlyReport(selectedYear)}
                  >
                    {loading ? "Loading..." : "Refresh"}
                  </button>
                </div>
              </div>

              {/* ERROR */}

              {error && <div className="alert alert-danger">{error}</div>}

              {/* SUMMARY CARDS */}

              <div className="row g-3 mb-4">
                <div className="col-md-6">
                  <div className="card bg-light border-0 h-100">
                    <div className="card-body">
                      <small className="text-muted">
                        Total Sellers Counted in {selectedYear}
                      </small>

                      <h2 className="fw-bold mb-0">
                        {loading ? "..." : totalSellers}
                      </h2>
                    </div>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="card bg-light border-0 h-100">
                    <div className="card-body">
                      <small className="text-muted">
                        Highest Registration Month
                      </small>

                      <h5 className="fw-bold mb-0 mt-2">
                        {loading
                          ? "Loading..."
                          : totalSellers === 0
                            ? "No registrations"
                            : `${highestMonth?.monthName} (${highestMonth?.sellerCount})`}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>

              {/* MONTHLY BAR CHART */}

              <h6 className="fw-bold mb-3">Month-wise Seller Count</h6>

              {loading ? (
                <div className="text-center py-5">
                  <div className="spinner-border text-primary" role="status" />

                  <p className="text-muted mt-2 mb-0">
                    Loading seller report...
                  </p>
                </div>
              ) : (
                <div className="table-responsive mb-4">
                  <div
                    className="d-flex align-items-end gap-2 px-2 pt-3"
                    style={{
                      minWidth: "650px",
                      height: "250px",
                      borderBottom: "1px solid #dee2e6",
                    }}
                  >
                    {monthlyData.map((month) => {
                      const barHeight =
                        highestMonthlyCount > 0
                          ? (month.sellerCount / highestMonthlyCount) * 155
                          : 0;

                      return (
                        <div
                          key={month.monthNumber}
                          className="d-flex flex-column align-items-center justify-content-end"
                          style={{
                            flex: "1 0 0",
                            height: "100%",
                            minWidth: 0,
                          }}
                        >
                          <small className="fw-bold mb-1">
                            {month.sellerCount}
                          </small>

                          <div
                            title={`${month.monthName}: ${month.sellerCount} sellers`}
                            style={{
                              width: "65%",
                              minWidth: "10px",
                              height:
                                month.sellerCount > 0
                                  ? `${barHeight}px`
                                  : "2px",
                              backgroundColor:
                                month.sellerCount > 0 ? "#0d6efd" : "#dee2e6",
                              borderRadius: "5px 5px 0 0",
                              transition: "height 0.3s ease",
                            }}
                          />

                          <small
                            className="text-muted mt-2"
                            style={{
                              fontSize: "11px",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {month.monthName.substring(0, 3)}
                          </small>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* MONTHLY DATA TABLE */}

              <h6 className="fw-bold mb-3">
                Registration Details — {selectedYear}
              </h6>

              <div className="table-responsive">
                <table className="table table-hover align-middle">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Month</th>
                      <th>Seller Count</th>
                    </tr>
                  </thead>

                  <tbody>
                    {monthlyData.map((month) => (
                      <tr key={month.monthNumber}>
                        <td>{month.monthNumber}</td>

                        <td className="fw-semibold">{month.monthName}</td>

                        <td>
                          <span className="badge bg-primary">
                            {loading ? "..." : month.sellerCount}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>

                  <tfoot className="table-light">
                    <tr>
                      <th colSpan="2">Total</th>
                      <th>{loading ? "..." : totalSellers}</th>
                    </tr>
                  </tfoot>
                </table>
              </div>

              <small className="text-muted">
                Report counts are based on each existing seller's first payment
                record date, not necessarily the exact registration date.
              </small>
            </div>
          </div>

          {/* =====================================================
              EXISTING REPORT CARDS - KEPT
          ===================================================== */}

          <div className="row g-4">
            {/* SELLER REPORTS */}

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="fw-bold">Seller Reports</h6>

                  <p className="text-muted mb-0">
                    Seller registration and approval reports.
                  </p>
                </div>
              </div>
            </div>

            {/* ANIMAL REPORTS */}

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="fw-bold">Animal Reports</h6>

                  <p className="text-muted mb-0">Animal listing reports.</p>
                </div>
              </div>
            </div>

            {/* ORDER REPORTS */}

            <div className="col-md-4">
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h6 className="fw-bold">Order Reports</h6>

                  <p className="text-muted mb-0">
                    Order and transaction reports.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;
