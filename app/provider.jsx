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
            let {data : users, error} = await supabase
            .from('users')
            .select('*').eq('email', user?.email);

        console.log(users)

        if(users?.length === 0){      
            //create new user
            const {data, error} = await supabase.from('users')
            .insert([
                {
                name:user?.user_metadata?.name,
                email:user?.email,
                picture:user?.user_metadata?.picture
                }
        ])
        console.log(data);
        setUser(data);
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
