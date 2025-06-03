"use client";

import React from "react";
import { Input } from "./ui/input";

interface ClientSearchFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientSearchFilter: React.FC<ClientSearchFilterProps> = ({
  searchTerm,
  onSearchChange,
}) => {
  return (
    <Input
      type="text"
      placeholder="Search clients..."
      value={searchTerm}
      onChange={onSearchChange}
      className="p-2 border rounded-md  max-w-xs"
    />
  );
};

export default ClientSearchFilter;
