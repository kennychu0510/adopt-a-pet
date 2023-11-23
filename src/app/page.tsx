import Images from '@/assets';
import HorizontalSection from '@/components/HorizontalSection';
import LoadingPage from '@/components/LoadingPage';
import { CATEGORIES } from '@/constants';
import { PetCardProps, PetType } from '@/types';
import supabase from '@/utils/supabase';

export default async function Home() {
  const adoptionList = await supabase.from('Adoption').select('*').limit(10).order('created_at', { ascending: false});
  const missingList = await supabase.from('Missing').select('*').limit(10).order('created_at', { ascending: false});
  const NEW_PETS: PetCardProps[] =
    adoptionList.data?.map((item) => ({
      id: String(item.id),
      name: item.petName,
      image: item.image ?? '',
      link: `/adopt/${item.id}`
    })) ?? [];
  const MISSING_PETS: PetCardProps[] =
    missingList.data?.map((item) => ({
      id: String(item.id),
      name: item.petName,
      image: item.image ?? '',
      link: `/missing/${item.id}`
    })) ?? [];

  return (
    <main>
      <HorizontalSection items={CATEGORIES} header='Adopt a Pet' subHeader='Be a guardian angel' page='adopt' />
      <HorizontalSection items={NEW_PETS} header='New pets to adopt' subHeader='Bring a pet home now!' page='adopt' />
      <HorizontalSection items={MISSING_PETS} header='Missing Pets' subHeader='Save a pet!' page='missing' />
    </main>
  );
}
