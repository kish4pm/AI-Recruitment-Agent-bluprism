'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/services/supabaseClient';
import { toast } from 'sonner';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthRedirect = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error || !session?.user) {
        toast.error("Failed to complete sign in");
        console.error("Session error:", error);
        return;
      }

      const user = session.user;
      const email = user.email;

      // 1. Check if user already exists
      const { data: existingUser, error: fetchError } = await supabase
        .from('users')
        .select('id, role')
        .eq('email', email)
        .single();

      let finalRole = 'candidate'; 

      if (!existingUser && !fetchError) {
        const savedRole = localStorage.getItem("pending_role") || 'candidate';
        finalRole = savedRole;

        const { error: insertError } = await supabase.from('users').insert([
          {
            email: user.email,
            name: user.user_metadata?.full_name || "No Name",
            role: savedRole,
          },
        ]);

        if (insertError) {
          toast.error("Failed to create user profile.");
          console.error("Insert error:", insertError);
          return;
        }

        toast.success("Profile created successfully.");
      } else if (existingUser) {
        finalRole = existingUser.role;
      }

      localStorage.removeItem("pending_role");

      if (finalRole === 'recruiter') {
        router.push('/recruiter/dashboard');
      } else {
        router.push('/candidate/dashboard');
      }
    };

    handleAuthRedirect();
  }, [router]);
}
