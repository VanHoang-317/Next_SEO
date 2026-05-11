/* eslint-disable @next/next/no-img-element */
import db from "@/lib/db.json";
import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Tiệm Hoa Vũng Tàu";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image({ params }: PageProps<"/products/[id]">) {
  const { id } = await params;
  const product = db.products.find((prod) => prod.id.toString() === id);
  const productName = product?.name ?? "Hoa tươi Vũng Tàu";
  const price = product?.price.toLocaleString("vi-VN") ?? "";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg, #bfeee9 0%, #f4c1d8 48%, #be185d 100%)",
          color: "#111827",
          fontFamily: "Arial, sans-serif",
          padding: "70px",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            width: "58%",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#be185d",
            }}
          >
            Tiệm Hoa Vũng Tàu
          </div>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.08,
              fontWeight: 800,
              letterSpacing: "-1px",
            }}
          >
            {productName}
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#374151",
            }}
          >
            Hoa tươi mỗi ngày • Giao nhanh tại Vũng Tàu
          </div>
          {price ? (
            <div
              style={{
                display: "flex",
                width: "fit-content",
                borderRadius: 999,
                background: "#be185d",
                color: "white",
                fontSize: 34,
                fontWeight: 700,
                padding: "16px 28px",
              }}
            >
              {price}đ
            </div>
          ) : null}
        </div>

        <div
          style={{
            position: "absolute",
            right: 82,
            top: 96,
            width: 350,
            height: 350,
            display: "flex",
            borderRadius: 36,
            background: "rgba(255, 255, 255, 0.28)",
            border: "2px solid rgba(255, 255, 255, 0.45)",
            boxShadow: "0 30px 80px rgba(17, 24, 39, 0.28)",
            overflow: "hidden",
          }}
        >
          <img
            src="https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=700&q=80"
            alt=""
            width={350}
            height={350}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
