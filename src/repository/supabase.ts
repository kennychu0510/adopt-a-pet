import { getTimestampMinusOneWeek } from '@/utils/helper';
import supabase from '@/utils/supabase';

class SupabaseRepository {
  async getAdoptionListForLanding() {
    return supabase.from('Adoption').select('*').gte('created_at', getTimestampMinusOneWeek()).limit(10).order('created_at', { ascending: false }).is('show', true);
  }

  async getMissingListForLanding() {
    return supabase.from('Missing').select('*').gte('created_at', getTimestampMinusOneWeek()).limit(10).order('created_at', { ascending: false }).is('show', true);
  }

  async getWishListForLanding() {
    return supabase.from('Wish').select('*').gte('created_at', getTimestampMinusOneWeek()).limit(10).order('created_at', { ascending: false }).is('show', true);
  }

  async getAdoptionDetailById(id: string) {
    return supabase.from('Adoption').select('*').eq('id', id).limit(1).is('show', true).single();
  }

  async getAdoptionListByType(type: string) {
    return type === 'all'
      ? await supabase.from('Adoption').select('*').gte('created_at', getTimestampMinusOneWeek()).is('show', true)
      : await supabase.from('Adoption').select('*').gte('created_at', getTimestampMinusOneWeek()).eq('type', type).is('show', true);
  }

  async getMissingList() {
    return await supabase.from('Missing').select('*').gte('created_at', getTimestampMinusOneWeek()).order('created_at', { ascending: false }).is('show', true);
  }

  async getMissingDetailById(id: string) {
    return await supabase.from('Missing').select('*').eq('id', id).is('show', true).single();
  }

  async getWishListList() {
    return await supabase.from('Wish').select('*').gte('created_at', getTimestampMinusOneWeek()).order('created_at', { ascending: false }).is('show', true);
  }

  async getWishDetailById(id: string) {
    return await supabase.from('Wish').select('*').eq('id', id).is('show', true).single();
  }
}

export default SupabaseRepository;
