import { useState } from "react";
import { SearchContext } from "./contexts.js";

export default function SearchContextProvider({ children }) {
  const [searchTerm, setSearchTerm] = useState(""); //search string to be used in our fetch (Changing per keystroke)
  const [searchEnabled, setSearchEnabled] = useState(false); //Boolean set by our search bar (set to true on icon click/ on enter keystroke)
  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchEnabled, setSearchEnabled}}>
      {children}
    </SearchContext.Provider>
  );
}
