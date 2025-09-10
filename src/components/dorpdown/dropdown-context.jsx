import { createContext, useContext } from "react";

const DropdownContext = createContext();

function DropdownProvider({ value, children }) {
  return (
    <DropdownContext.Provider value={value}>
      {children}
    </DropdownContext.Provider>
  );
}

function useDropdown() {
  const context = useContext(DropdownContext);
  if (context === undefined) {
    throw new Error("useDropdown must be used within DropdownProvider");
  }
  return context;
}

export { useDropdown, DropdownProvider };
