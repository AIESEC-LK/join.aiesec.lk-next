"use client";

import { useEffect } from "react";

export interface ToastProps {
  message: string;
  type: "success" | "error";
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export default function Toast({
  message,
  type,
  isVisible,
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) {
    return null;
  }

  const baseStyles = {
    position: "fixed" as const,
    top: "20px",
    right: "20px",
    minWidth: "300px",
    maxWidth: "500px",
    padding: "16px 20px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "500" as const,
    fontSize: "14px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
    zIndex: 1000,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    animation: "slideInRight 0.3s ease-out",
  };

  const typeStyles = {
    success: {
      backgroundColor: "#10b981",
      borderLeft: "4px solid #059669",
    },
    error: {
      backgroundColor: "#ef4444",
      borderLeft: "4px solid #dc2626",
    },
  };

  const iconStyles = {
    marginRight: "12px",
    fontSize: "18px",
  };

  return (
    <>
      <style jsx>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
      <div style={{ ...baseStyles, ...typeStyles[type] }}>
        <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
          <span style={iconStyles}>{type === "success" ? "✓" : "✕"}</span>
          <span style={{ lineHeight: "1.4" }}>{message}</span>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "white",
            fontSize: "18px",
            cursor: "pointer",
            marginLeft: "12px",
            opacity: 0.8,
            padding: "0 4px",
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = "1")}
          onMouseOut={(e) => (e.currentTarget.style.opacity = "0.8")}
        >
          ×
        </button>
      </div>
    </>
  );
}
