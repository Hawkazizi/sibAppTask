import Link from "next/link";

export default function Home() {
  return (
    <div
      style={{
        minHeight: "50vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
        backgroundColor: "#f5f5f5",
        fontFamily: "sans-serif",
      }}
    >
      <h1 style={{ fontSize: "2rem", color: "#333", marginBottom: "10px" }}>
        Translation Management
      </h1>
      <p style={{ color: "#555", marginBottom: "20px" }}>
        Choose a section to continue:
      </p>

      <div style={{ display: "flex", gap: "15px" }}>
        <Link
          href="/dashboard"
          style={{
            padding: "12px 24px",
            backgroundColor: "#0070f3",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Go to Dashboard
        </Link>

        <Link
          href="/public-view"
          style={{
            padding: "12px 24px",
            backgroundColor: "#28a745",
            color: "white",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: "bold",
          }}
        >
          Go to Public View
        </Link>
      </div>
    </div>
  );
}
