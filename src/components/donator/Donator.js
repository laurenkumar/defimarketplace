import React from "react";

export function Underlay() {
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        padding: 40,
        display: "inline-flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        pointerEvents: "none",
      }}>
      <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "center", justifyContent: "center" }}>
        <p
          style={{
            flex: "1 1 0%",
            height: 30,
            fontSize: 30,
            fontWeight: "700",
            lineHeight: "30px",
            color: "black",
            letterSpacing: -2,
          }}>
          Thank You
        </p>
      </div>
      <div style={{ height: 60 }} />
      <div style={{ width: "100%", padding: 0, display: "inline-flex", flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
        <p style={{ flex: "1 1 0%", height: "100%", fontSize: 12, lineHeight: "1.5em", color: "black" }}>
          <b>Stones, Metals and Gems</b>
          <br />
          A Universal Deity
          <br />
          <b>—</b>
        </p>
        <div style={{ width: 10 }} />
        <p
          style={{
            transform: "rotate3d(0, 0, 1, 90deg) translate3d(100%,10px,0)",
            transformOrigin: "right",
            fontSize: 12,
            fontWeight: "700",
            lineHeight: "100%",
            textAlign: "right",
            color: "black",
            whiteSpace: "nowrap",
          }}>
          DRAG CURSOR &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ●
        </p>
      </div>
      <div style={{ height: 60 }} />
      <div
        style={{
          pointerEvents: "all",
          pointer: "auto",
          width: "100%",
          padding: 0,
          display: "inline-flex",
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "center",
        }}>
        <div style={{ width: 10 }} />
        <p
          className="full"
          style={{
            fontFamily: "'Antonio', sans-serif",
            flex: "1 1 0%",
            fontSize: 16,
            fontWeight: "700",
            lineHeight: "1em",
            textAlign: "center",
            color: "black",
            letterSpacing: -0.5,
            whiteSpace: "nowrap",
          }}>
          THE SUMMIT OF THE MANY
        </p>
        <div style={{ width: 10 }} />
      </div>
    </div>
  )
}
