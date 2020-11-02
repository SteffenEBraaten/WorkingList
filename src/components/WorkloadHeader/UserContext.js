import React, { useContext, useState } from "react";

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export const useUser = () => {
  return useContext(UserContext);
};

export const useUserUpdate = () => {
  return useContext(UserUpdateContext);
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({});

  const updateUserState = ({ error, loading, data }) => {
    if (error && user.error !== error) {
      setUser({ data, loading, error });
    }
    if (loading && user.loading !== loading) {
      setUser({ data, loading, error });
    }
    if (data && user.data !== data) {
      setUser({ data, loading, error });
    }
  };

  return (
    <UserContext.Provider value={user}>
      <UserUpdateContext.Provider value={updateUserState}>
        {children}
      </UserUpdateContext.Provider>
    </UserContext.Provider>
  );
};

export default UserProvider;
