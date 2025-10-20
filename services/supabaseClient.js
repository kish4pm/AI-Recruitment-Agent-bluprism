/**
 * Minimal supabase client stub.
 * Replace this with the real supabase client initialisation when ready.
 */
export const supabase = {
  from: () => ({ select: async () => ({ data: null, error: null }) }),
  auth: { user: () => null }
};

export default supabase;
