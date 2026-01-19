import { supabase, Profile } from '@/lib/supabase';

export const profileService = {
  // Create or update user profile
  async upsertProfile(userId: string, name: string, email: string): Promise<Profile> {
    console.log('📤 [profileService] Upserting profile...');
    console.log('   User ID:', userId);
    console.log('   Name:', name);
    console.log('   Email:', email);
    
    try {
      const profileData = {
        id: userId,
        name: name.trim(),
        email: email.trim(),
        updated_at: new Date().toISOString(),
      };
      
      console.log('📦 [profileService] Profile data:', profileData);
      
      const { data, error } = await supabase
        .from('profiles')
        .upsert(profileData, {
          onConflict: 'id',
        })
        .select()
        .single();

      if (error) {
        console.error('❌ [profileService] Upsert error:', error);
        console.error('   Error code:', error.code);
        console.error('   Error message:', error.message);
        console.error('   Error details:', error.details);
        console.error('   Error hint:', error.hint);
        throw error;
      }

      console.log('✅ [profileService] Profile upserted successfully:', data);
      return data;
    } catch (err: any) {
      console.error('❌ [profileService] Exception during upsert:', err);
      throw err;
    }
  },

  // Get user profile by ID
  async getProfile(userId: string): Promise<Profile | null> {
    console.log('🔍 [profileService] Fetching profile for user:', userId);
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle(); // Use maybeSingle instead of single to avoid error when not found

      if (error) {
        console.error('❌ [profileService] Fetch error:', error);
        throw error;
      }

      if (!data) {
        console.log('ℹ️ [profileService] No profile found for user:', userId);
        return null;
      }

      console.log('✅ [profileService] Profile fetched:', data);
      return data;
    } catch (err: any) {
      console.error('❌ [profileService] Exception during fetch:', err);
      throw err;
    }
  },

  // Get all profiles
  async getAllProfiles(): Promise<Profile[]> {
    console.log('🔍 [profileService] Fetching all profiles...');
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        console.error('❌ [profileService] Fetch all error:', error);
        throw error;
      }

      console.log(`✅ [profileService] Fetched ${data?.length || 0} profiles`);
      return data || [];
    } catch (err: any) {
      console.error('❌ [profileService] Exception during fetch all:', err);
      throw err;
    }
  },
};
