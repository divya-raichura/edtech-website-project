import { useContext, useState } from "react";

const AuthContext = React.createContext();

export function AuthProvider(props) {
  const [currentUser, setCurrentUser] = useState();

  const value = {
    currentUser,
  };

  return (
    <AuthContext.Provider value={value}>{props.children}</AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
