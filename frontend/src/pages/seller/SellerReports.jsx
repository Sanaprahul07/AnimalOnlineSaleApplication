import React, { useEffect, useState } from "react";
import axios from "axios";
import { apiUrl } from "../../config/api";

function SellerReports() {
  const currentYear = new Date().getFullYear();

  const [year, setYear] = useState(currentYear);
  const [report, setReport] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMonthlyReport = async () => {
      const sellerId = localStorage.getItem("sellerId");

      if (!sellerId) {
        setError("Seller ID not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await axios.get(
          apiUrl(`/api/orders/seller/${sellerId}/monthly-sales?year=${year}`),
        );

        const rows = response.data.map((row) => ({
          monthNumber: Number(row[0]),
          monthName: row[1],
          animalsSold: Number(row[2] || 0),
          amount: Number(row[3] || 0),
        }));

        setReport(rows);
      } catch (err) {
        console.error("Monthly sales report error:", err);

        setError(
          err.response?.data?.message || "Unable to load monthly sales report.",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMonthlyReport();
  }, [year]);

  const totalAnimals = report.reduce(
    (total, item) => total + item.animalsSold,
    0,
  );

  const totalSales = report.reduce((total, item) => total + item.amount, 0);

  const formatAmount = (amount) =>
    new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 2,
    }).format(amount);

  const cardStyle = {
    background: "#ffffff",
    padding: "20px",
    borderRadius: "10px",
    border: "1px solid #e5e7eb",
    flex: "1",
    minWidth: "200px",
  };

  if (loading) {
    return <div style={{ padding: "24px" }}>Loading sales report...</div>;
  }

  return (
    <div style={{ padding: "24px", background: "#f8fafc", minHeight: "100vh" }}>
      <h2>Monthly Animal Sales Report</h2>

      <p style={{ color: "#64748b" }}>
        Month-wise accepted orders and sales amount.
      </p>

      <div style={{ margin: "20px 0" }}>
        <label htmlFor="reportYear" style={{ marginRight: "12px" }}>
          Select Year:
        </label>

        <select
          id="reportYear"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
          style={{
            padding: "9px 12px",
            borderRadius: "6px",
            border: "1px solid #cbd5e1",
          }}
        >
          {Array.from({ length: 6 }, (_, index) => currentYear - 4 + index).map(
            (itemYear) => (
              <option key={itemYear} value={itemYear}>
                {itemYear}
              </option>
            ),
          )}
        </select>
      </div>

      {error && (
        <div
          style={{
            padding: "12px",
            marginBottom: "20px",
            color: "#b91c1c",
            background: "#fee2e2",
            borderRadius: "6px",
          }}
        >
          {error}
        </div>
      )}

      {!error && (
        <>
          <div
            style={{
              display: "flex",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "24px",
            }}
          >
            <div style={cardStyle}>
              <p style={{ color: "#64748b", margin: 0 }}>
                Accepted Animals / Orders
              </p>
              <h2 style={{ marginBottom: 0 }}>{totalAnimals}</h2>
            </div>

            <div style={cardStyle}>
              <p style={{ color: "#64748b", margin: 0 }}>
                Total Accepted Sales Amount
              </p>
              <h2 style={{ marginBottom: 0 }}>{formatAmount(totalSales)}</h2>
            </div>
          </div>

          <div
            style={{
              background: "#ffffff",
              borderRadius: "10px",
              border: "1px solid #e5e7eb",
              overflowX: "auto",
            }}
          >
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                textAlign: "left",
              }}
            >
              <thead>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={cellStyle}>Sr. No.</th>
                  <th style={cellStyle}>Month</th>
                  <th style={cellStyle}>Animals / Orders Accepted</th>
                  <th style={cellStyle}>Sales Amount</th>
                </tr>
              </thead>

              <tbody>
                {report.map((item, index) => (
                  <tr key={item.monthNumber}>
                    <td style={cellStyle}>{index + 1}</td>
                    <td style={cellStyle}>{item.monthName}</td>
                    <td style={cellStyle}>{item.animalsSold}</td>
                    <td style={cellStyle}>{formatAmount(item.amount)}</td>
                  </tr>
                ))}

                {report.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      style={{
                        ...cellStyle,
                        textAlign: "center",
                      }}
                    >
                      No report data available.
                    </td>
                  </tr>
                )}
              </tbody>

              <tfoot>
                <tr style={{ background: "#f1f5f9" }}>
                  <th style={cellStyle} colSpan="2">
                    Year Total
                  </th>
                  <th style={cellStyle}>{totalAnimals}</th>
                  <th style={cellStyle}>{formatAmount(totalSales)}</th>
                </tr>
              </tfoot>
            </table>
          </div>
        </>
      )}
    </div>
  );
}

const cellStyle = {
  padding: "13px 16px",
  borderBottom: "1px solid #e5e7eb",
};

export default SellerReports;
