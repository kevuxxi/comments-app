import React from "react";
import { InfinitySpin } from "react-loader-spinner";

const GlobalLoader = () => (
    <div
        style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(255,255,255,0.8)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 9999,
        }}
    >
        <InfinitySpin width="180" color="#2f80ed" />
    </div>
);

export default GlobalLoader;
