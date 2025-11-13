import React, {useState} from "react";

interface SearchFieldProps {
    setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

export const SearchField = ({setSearchQuery}: SearchFieldProps) => {
    const [searchQuery, setQuery] = useState("");

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSearchQuery(searchQuery);
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search recipes..."
            />
            <button type="submit">Search</button>
        </form>
    );
};
