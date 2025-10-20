'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

/**
 * Minimal AuthContext stub to satisfy imports.
 * - export AuthProvider
 * - export useAuth()
 * - default export AuthContext
 *
 * Replace with your real Supabase/NextAuth wiring later.
 */

const AuthContext = createContext({
  user: null,
  loading: false,
  signIn: async () => {},
  signOut: async () => {}
});

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  // optional: attempt to read user from window (no-op here)
  useEffect(() => {
    // placeholder for fetching user from cookie/localStorage if needed
  }, []);

  const signIn = async (payload) => {
    // temporary fake sign-in for UI flows; returns a fake user object
    const fakeUser = { id: 'guest', name: 'Guest User', email: 'guest@example.com' };
    setUser(fakeUser);
    return { user: fakeUser, error: null };
  };

  const signOut = async () => {
    setUser(null);
    return { error: null };
  };

  return (
    <AuthContext.Provider value={{ user, loading, signIn, signOut, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export default AuthContext;
