"use client";

export default function Error({ reset }: { reset: () => void }) {
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
        <h1 style={{ margin: "0 0 16px", fontSize: "24px" }}>Something went wrong</h1>
        <button
          onClick={reset}
          style={{
            height: "44px",
            border: 0,
            borderRadius: "8px",
            padding: "0 18px",
            background: "#f7fbff",
            color: "#05070a",
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Retry
        </button>
      </section>
    </main>
  );
}
