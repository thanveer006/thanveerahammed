import { ImageResponse } from "next/og";

export const alt = "Thanveer Ahammed N — Software Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#070b14",
          backgroundImage:
            "radial-gradient(circle at 20% 20%, rgba(59,130,246,0.25), transparent 45%)",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 14,
              height: 14,
              borderRadius: "50%",
              backgroundColor: "#22c55e",
              display: "flex",
            }}
          />
          <span style={{ color: "#94a3b8", fontSize: 24 }}>
            Available for select engineering work
          </span>
        </div>
        <div style={{ display: "flex", color: "#f3f6fb", fontSize: 32, marginBottom: 12 }}>
          Thanveer Ahammed N
        </div>
        <div
          style={{
            display: "flex",
            color: "#f3f6fb",
            fontSize: 60,
            fontWeight: 700,
            lineHeight: 1.15,
            maxWidth: 950,
          }}
        >
          Software Engineer building production-grade software.
        </div>
        <div style={{ display: "flex", color: "#3b82f6", fontSize: 28, marginTop: 32 }}>
          thanveerahammed.in
        </div>
      </div>
    ),
    { ...size }
  );
}
