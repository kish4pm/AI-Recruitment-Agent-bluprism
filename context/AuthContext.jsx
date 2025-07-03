"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../services/supabaseClient";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [session, setSession] = useState(undefined);
  const [userProfile, setUserProfile] = useState(undefined);
  const router = useRouter();

  // Fetch initial session + subscribe to changes
  useEffect(() => {
    const initSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };
    initSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, []);

  // Fetch user profile
  const fetchUserProfile = async (email) => {
    console.log("Fetching profile for:", email);
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("email", email)
      .single();
  
    console.log("Profile fetch result:", { data, error });
  
    if (!error) {
      setUserProfile(data);
    } else {
      console.error("Failed to fetch profile:", error);
    }
  };
  
  // Sign in
  const signInUser = async (email, password) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.toLowerCase(),
        password,
      });
  
      console.log("Supabase response:", { data, error });
  
      if (error) {
        return { success: false, error: error.message };
      }
      await fetchUserProfile(email);
  
      toast.success("Logged in!");
      window.location.href = "/dashboard";
      return { success: true, data };
    } catch (err) {
      return {
        success: false,
        error: "An unexpected error occurred. Please try again.",
      };
    }
  };

  // Sign up
  const signUpNewUser = async (email, password, { name, role }) => {
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
            role,
          },
        },
      });

      if (authError) return { success: false, error: authError.message };

      const { error: insertError } = await supabase.from("users").insert([
        {
          email,
          name,
          role,
          picture: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
          credits: 0,
        },
      ]);

      if (insertError) return { success: false, error: insertError.message };

      toast.success("Account created!");
      return { success: true, user: authData.user };
    } catch (err) {
      return { success: false, error: err.message };
    }
  };

  // Sign out
  const signOut = async () => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      toast.error("Sign out failed.");
      return;
    }

    setSession(null);
    setUserProfile(null);
    toast.success("Successfully signed out.");
    router.push("/login");
  };

  if (session === undefined) {
    return (
      <div className="p-4 flex items-center justify-center h-screen">
        <div className="flex flex-col items-center gap-4">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-black">
            <img 
              src="/logo.png" 
              alt="Loading"
              className="h-12 w-12 mx-auto my-2"
            />
          </div>
          <p className="text-sm text-gray-500">Loading your session...</p>
        </div>
      </div>
    );
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        userProfile,
        signInUser,
        signUpNewUser,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};
