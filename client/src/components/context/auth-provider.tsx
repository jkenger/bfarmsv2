import { fetch } from "@/lib/utils";
import React, { createContext, useEffect } from "react";

type TAuth = {
  user: {
    email: string;
    name: string;
    role: string;
    isAuthenticated: boolean;
  } | null;
  setUser: React.Dispatch<React.SetStateAction<null>>;
};


const AuthContext = createContext<TAuth | null>(null);

export const AuthProviderAccess: TAuth= {
  user: null,
  setUser: () => {},

};

export const AuthProvider = ({ children }: {children: React.ReactNode}) => {

  const [user, setUser] = React.useState(null);
  AuthProviderAccess.user = user;
  AuthProviderAccess.setUser = setUser;

  useEffect(()=>{
    const fetchAccount = async () => {
      try {
        const response = await fetch.get("/auth/current-account");
        console.log(response);
        setUser({...response.data.account, isAuthenticated: true});
        
      } catch (error) {
         setUser(null);
      }
    }
    fetchAccount();
  }, [])

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
}

export const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};