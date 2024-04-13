import React, { createContext } from "react";

type TAuth = {
  user: {
    id: string;
    email: string;
    username: string;
    role: string;
    isAuthenticated: boolean;
    user: TEmployees;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};

const AuthContext = createContext<TAuth | null>(null);

export const AuthProviderAccess: TAuth = {
  user: null,
  setUser: () => {},
};

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = React.useState(null);
  AuthProviderAccess.user = user;
  AuthProviderAccess.setUser = setUser;

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
