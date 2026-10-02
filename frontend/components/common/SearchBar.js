"use client";

import { Search } from "lucide-react";

export default function SearchBar({ value, onChange, placeholder = "Search" }) {
  return (
    <label className="search-bar">
      <Search size={17} aria-hidden="true" />
      <span className="sr-only">{placeholder}</span>
      <input value={value} onChange={(event) => onChange(event.target.value)} placeholder={placeholder} />
    </label>
  );
}

