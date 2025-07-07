"use client";
import { AuthContext } from '@/context/AuthContext';
import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';



function Provider({ children }: Readonly<{ children: React.ReactNode }>) {
  const { user } = useUser();
  const [userCreated, setUserCreated] = useState(false);

  useEffect(() => {
    if (user && !userCreated) {
      createNewUser();
      setUserCreated(true);
    }
  }, [user, userCreated]);

  const createNewUser = async () => {
    try {
      const result = await axios.post('/api/user');
      console.log("User created:", result.data);
    } catch (error: any) {
    //   console.error("Failed to create user:", error.response?.data || error.message);
        console.error("Failed to create user:", {
            message: error.message,
            data: error.response?.data,
            status: error.response?.status,
        });
    }
  };

  return <div>{children}</div>;
}

// Custom hook to use auth
export const useAuthContext = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
};

export default Provider;
