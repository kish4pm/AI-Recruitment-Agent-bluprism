"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import { supabase } from '@/services/supabaseClient';
import React, { useState, useEffect, useContext } from 'react';

function Provider({ children }) {
    const [user, setUser] = useState();

    // Fetch user from Supabase and DB
    const fetchAndSetUser = async () => {
        const { data: { user: supaUser } } = await supabase.auth.getUser();
        if (!supaUser) {
            setUser(null);
            return;
        }
        let { data: users, error } = await supabase
            .from('users')
            .select('*')
            .eq('email', supaUser.email);
        if (users?.length === 0) {
            // create new user
            const { data, error: insertError } = await supabase.from('users')
                .insert([
                    {
                        name: supaUser?.user_metadata?.name,
                        email: supaUser?.email,
                        picture: supaUser?.user_metadata?.picture
                    }
                ])
            setUser(data?.[0] || null);
            return;
        }
        setUser(users[0]);
    };

    useEffect(() => {
        fetchAndSetUser(); // Initial fetch
        // Listen for auth state changes
        const { data: listener } = supabase.auth.onAuthStateChange((_event, _session) => {
            fetchAndSetUser();
        });
        return () => {
            listener?.subscription?.unsubscribe();
        };
    }, []);

    return (
        <UserDetailContext.Provider value={{ user, setUser }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    );
}

export default Provider;

export const useUser = () => {
    const context = useContext(UserDetailContext);
    return context;
}
