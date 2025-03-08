import { createContext, useState, useContext } from "react";

// Create Context
const AppContext = createContext();

// Custom Hook for using Context
export const useAppContext = () => {
  return useContext(AppContext);
};

// Context Provider Component
export const AppProvider = ({ children }) => {
  const [user, setUser] = useState(null); // Stores logged-in user data
  const [loading, setLoading] = useState(false); // Loading state for requests

  return (
    <AppContext.Provider value={{ user, setUser, loading, setLoading }}>
      {children}
    </AppContext.Provider>
  );
};

export default AppContext;
