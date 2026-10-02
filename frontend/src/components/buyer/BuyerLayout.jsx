import BuyerTopbar from "./BuyerTopbar";

function BuyerLayout({ children }) {
  const customerId = localStorage.getItem("customerId");

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: customerId ? "#f7f8fc" : "transparent",
      }}
    >
      {customerId && <BuyerTopbar />}

      <main>{children}</main>
    </div>
  );
}

export default BuyerLayout;
