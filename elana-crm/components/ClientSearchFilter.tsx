"use client";

import React from "react";

interface ClientSearchFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientSearchFilter: React.FC<ClientSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <input
      type="text"
      placeholder="Search clients..."
      value={searchTerm}
      onChange={onSearchChange}
      className="p-2 border rounded-md mb-4 max-w-xs"
    />
  );
};

export default ClientSearchFilter;
