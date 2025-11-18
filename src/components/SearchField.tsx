import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

interface SearchFieldProps {
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchField = ({ setSearchQuery }: SearchFieldProps) => {
  const [searchQuery, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(searchQuery);
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 w-full max-w-md">
      <Input
        type="text"
        value={searchQuery}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search recipes..."
      />
      <Button type="submit" size="icon">
        <Search className="w-4 h-4" />
      </Button>
    </form>
  );
};
