"use client";

export default function GlobalError({ reset }: { reset: () => void }) {
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: "24px",
            background: "#05070a",
            color: "#f7fbff",
            fontFamily:
              'Inter, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
          }}
        >
          <section
            aria-labelledby="global-error-title"
            style={{
              width: "min(100%, 640px)",
              border: "1px solid rgb(255 255 255 / 0.14)",
              borderRadius: "24px",
              padding: "32px",
              textAlign: "center",
              background: "rgb(12 18 26 / 0.88)",
              boxShadow: "0 18px 55px rgb(0 0 0 / 0.34)",
            }}
          >
            <p
              style={{
                margin: "0 0 12px",
                color: "#77e4ff",
                fontSize: "12px",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
              }}
            >
              500
            </p>
            <h1 id="global-error-title" style={{ margin: "0 0 16px", fontSize: "32px" }}>
              The portfolio room crashed.
            </h1>
            <p style={{ margin: "0 0 24px", color: "#aab8c8", lineHeight: 1.6 }}>
              Retry the experience after the current deployment or development build settles.
            </p>
            <button
              type="button"
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
      </body>
    </html>
  );
}
