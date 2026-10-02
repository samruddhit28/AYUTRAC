"use client";

export default function Button({ children, variant = "primary", icon: Icon, className = "", loading = false, type = "button", ...props }) {
  return (
    <button type={type} className={`button button-${variant} ${className}`} disabled={loading || props.disabled} {...props}>
      {Icon && <Icon size={16} aria-hidden="true" />}
      {loading ? "Working..." : children}
    </button>
  );
}

