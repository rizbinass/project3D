import Link from "next/link";

export default function NotFound() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: "24px",
        background: "#080c12",
        color: "#f7fbff",
      }}
    >
      <section style={{ textAlign: "center" }}>
        <h1 style={{ margin: "0 0 16px", fontSize: "24px" }}>404 — Page not found</h1>
        <Link href="/" style={{ color: "#77e4ff" }}>
          Back to room
        </Link>
      </section>
    </main>
  );
}
