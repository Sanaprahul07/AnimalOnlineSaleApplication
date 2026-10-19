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

  // LOAD MONTHLY SELLER REGISTRATION REPORT
  const loadMonthlyReport = async (year) => {
    try {
      setLoading(true);
      setError("");

      const response = await AdminService.getMonthlySellerRegistrations(year);
      const apiData = Array.isArray(response.data) ? response.data : [];

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

  // LOAD REPORT WHEN YEAR CHANGES
  useEffect(() => {
    loadMonthlyReport(selectedYear);
  }, [selectedYear]);

  // SUMMARY CALCULATIONS
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

  return (
    <>
      <style>{`
        .admin-reports-main {
          margin-left: 250px;
          width: calc(100% - 250px);
          min-width: 0;
        }

        .admin-reports-header {
          min-width: 0;
        }

        .admin-reports-content {
          min-width: 0;
          padding: 24px;
        }

        .admin-reports-card {
          min-width: 0;
          overflow: hidden;
          border-radius: 10px;
        }

        .admin-reports-card .card-body {
          min-width: 0;
        }

        .admin-reports-toolbar {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          margin-bottom: 24px;
        }

        .admin-reports-toolbar-title {
          min-width: 0;
        }

        .admin-reports-controls {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
        }

        .admin-reports-chart-scroll {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .admin-reports-chart {
          min-width: 650px;
        }

        .admin-reports-table-scroll {
          width: 100%;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        .admin-reports-table {
          min-width: 350px;
          margin-bottom: 0;
        }

        .admin-reports-alert {
          overflow-wrap: anywhere;
        }

        @media (max-width: 767.98px) {
          .admin-reports-main {
            margin-left: 0 !important;
            width: 100% !important;
            max-width: 100%;
          }

          .admin-reports-header {
            padding: 16px !important;
          }

          .admin-reports-header h3 {
            font-size: 22px;
          }

          .admin-reports-content {
            padding: 12px !important;
          }

          .admin-reports-content .row {
            --bs-gutter-x: 12px;
            --bs-gutter-y: 12px;
          }

          .admin-reports-card .card-body {
            padding: 14px;
          }

          .admin-reports-toolbar {
            flex-direction: column;
            align-items: stretch;
            gap: 14px;
            margin-bottom: 20px;
          }

          .admin-reports-toolbar-title h5 {
            font-size: 17px;
            line-height: 1.4;
          }

          .admin-reports-toolbar-title small {
            font-size: 12px;
          }

          .admin-reports-controls {
            display: grid;
            grid-template-columns: auto minmax(0, 1fr);
            gap: 10px;
            width: 100%;
          }

          .admin-reports-controls label {
            font-size: 14px;
          }

          .admin-reports-controls select {
            width: 100% !important;
            min-width: 0;
          }

          .admin-reports-controls button {
            grid-column: 1 / -1;
            width: 100%;
          }

          .admin-reports-content .card-body h2 {
            font-size: 28px;
          }

          .admin-reports-content .card-body h5 {
            font-size: 17px;
            overflow-wrap: anywhere;
          }

          .admin-reports-content .card-body h6 {
            font-size: 15px;
            line-height: 1.5;
          }

          .admin-reports-chart-scroll {
            margin-bottom: 20px;
          }

          .admin-reports-chart {
            min-width: 650px;
          }

          .admin-reports-table th,
          .admin-reports-table td {
            padding: 10px 12px;
            font-size: 13px;
          }

          .admin-reports-alert {
            font-size: 13px;
            padding: 12px;
          }

          .admin-reports-note {
            display: block;
            line-height: 1.6;
            font-size: 12px;
          }
        }

        @media (max-width: 380px) {
          .admin-reports-content {
            padding: 9px !important;
          }

          .admin-reports-card .card-body {
            padding: 11px;
          }

          .admin-reports-header h3 {
            font-size: 20px;
          }

          .admin-reports-toolbar-title h5 {
            font-size: 16px;
          }
        }
      `}</style>

      <div
        className="d-flex"
        style={{
          minHeight: "100vh",
          backgroundColor: "#f7f8fc",
        }}
      >
        <AdminSidebar />

        {/* MAIN CONTENT */}
        <div className="admin-reports-main">
          {/* HEADER */}
          <div className="admin-reports-header bg-white border-bottom px-4 py-3">
            <h3 className="fw-bold mb-1">Reports</h3>

            <small className="text-muted">
              Application reports and analytics
            </small>
          </div>

          <div className="admin-reports-content">
            {/* MONTHLY SELLER REGISTRATION REPORT */}
            <div className="card border-0 shadow-sm mb-4 admin-reports-card">
              <div className="card-body">
                <div className="admin-reports-toolbar">
                  <div className="admin-reports-toolbar-title">
                    <h5 className="fw-bold mb-1">
                      Monthly Seller Registration Report
                    </h5>

                    <small className="text-muted">
                      Monthly seller counts from first payment dates
                    </small>
                  </div>

                  <div className="admin-reports-controls">
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
                {error && (
                  <div
                    className="alert alert-danger admin-reports-alert"
                    role="alert"
                  >
                    {error}
                  </div>
                )}

                {/* SUMMARY CARDS */}
                <div className="row g-3 mb-4">
                  <div className="col-12 col-md-6">
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

                  <div className="col-12 col-md-6">
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
                    <div
                      className="spinner-border text-primary"
                      role="status"
                    />

                    <p className="text-muted mt-2 mb-0">
                      Loading seller report...
                    </p>
                  </div>
                ) : (
                  <div className="admin-reports-chart-scroll mb-4">
                    <div
                      className="d-flex align-items-end gap-2 px-2 pt-3 admin-reports-chart"
                      style={{
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

                <div className="admin-reports-table-scroll">
                  <table className="table table-hover align-middle admin-reports-table">
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

                <small className="text-muted admin-reports-note">
                  Report counts are based on each existing seller's first
                  payment record date, not necessarily the exact registration
                  date.
                </small>
              </div>
            </div>

            {/* EXISTING REPORT CARDS */}
            <div className="row g-4">
              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="fw-bold">Seller Reports</h6>

                    <p className="text-muted mb-0">
                      Seller registration and approval reports.
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
                <div className="card border-0 shadow-sm h-100">
                  <div className="card-body">
                    <h6 className="fw-bold">Animal Reports</h6>

                    <p className="text-muted mb-0">Animal listing reports.</p>
                  </div>
                </div>
              </div>

              <div className="col-12 col-md-4">
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
    </>
  );
}

export default AdminReports;
