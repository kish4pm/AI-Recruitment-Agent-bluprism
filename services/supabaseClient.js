export const supabase = {
  from: () => ({ select: async () => ({ data: null, error: null }) }),
  auth: { user: () => null }
};
export default supabase;
