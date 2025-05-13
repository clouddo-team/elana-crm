import { TextField } from "@radix-ui/themes";

interface ClientSearchFilterProps {
  searchTerm: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ClientSearchFilter = ({
  searchTerm,
  onSearchChange,
}: ClientSearchFilterProps) => {
  return (
    <input
      type="text"
      placeholder="Search clients..."
      value={searchTerm}
      onChange={onSearchChange}
      className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
  );
};

export default ClientSearchFilter;
