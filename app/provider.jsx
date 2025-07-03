"use client"
import { UserDetailContext } from '@/context/UserDetailContext';
import {supabase} from '@/services/supabaseClient'
import React, {useState, useEffect, useContext} from 'react'


function Provider({ children }) {

    const [user, setUser] = useState();
    useEffect(()=>{
        CreateNewUser();
    },[])

    const CreateNewUser = () =>{

        supabase.auth.getUser().then(async ({data: {user}})=>{
            //check if user exist
            let {data : users, error} = await supabase
            .from('users')
            .select('*').eq('email', user?.email);

            console.log('Provider - Database users:', users);
            console.log('Provider - Database error:', dbError);

            if(users?.length === 0){      
                //create new user
                const {data, error: insertError} = await supabase.from('users')
                .insert([
                    {
                    name:user?.user_metadata?.name,
                    email:user?.email,
                    picture:user?.user_metadata?.picture
                    }
                ])
                console.log('Provider - Insert result:', data);
                console.log('Provider - Insert error:', insertError);
                setUser(data?.[0] || null);
                return;
            }
            setUser(users[0]);
        })
    }
    return (
        <UserDetailContext.Provider value={{user, setUser }}>
            <div>{children}</div>
        </UserDetailContext.Provider>
    );
}

export default Provider;

export const useUser=()=>{
    const context=useContext(UserDetailContext);
    return context;
}
