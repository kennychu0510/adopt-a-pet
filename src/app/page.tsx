import HorizontalSection from '@/components/HorizontalSection';
import { CATEGORIES } from '@/constants';
import { PetCardProps } from '@/types';
import { getImageForPetType, getTimestampMinusOneWeek } from '@/utils/helper';
import supabase from '@/utils/supabase';

export default async function Home() {
  const adoptionList = await supabase.from('Adoption').select('*').limit(10).order('created_at', { ascending: false });
  const missingList = await supabase.from('Missing').select('*').gte('created_at', getTimestampMinusOneWeek()).limit(10).order('created_at', { ascending: false });
  const wishList = await supabase.from('Wish').select('*').gte('created_at', getTimestampMinusOneWeek()).limit(10).order('created_at', { ascending: false });

  const NEW_PETS: PetCardProps[] =
    adoptionList.data?.map((item) => ({
      id: String(item.id),
      name: item.petName,
      image: item.image ?? '',
      link: `/adopt/${item.id}`,
    })) ?? [];
  const MISSING_PETS: PetCardProps[] =
    missingList.data?.map((item) => ({
      id: String(item.id),
      name: item.petName,
      image: item.image ?? '',
      link: `/missing/${item.id}`,
    })) ?? [];

  const WISH_LIST: PetCardProps[] =
    wishList.data?.map((item) => ({
      id: String(item.id),
      name: item.type,
      image: getImageForPetType(item.type),
      link: `/wish/${item.id}`,
    })) ?? [];

  return (
    <main>
      <HorizontalSection items={CATEGORIES} header='Adopt a Pet' subHeader='Be a guardian angel' page='adopt' />
      <HorizontalSection items={NEW_PETS} header='New pets to adopt' subHeader='Bring a pet home now!' page='adopt' />
      <HorizontalSection items={MISSING_PETS} header='Missing Pets' subHeader='Save a pet!' page='missing' />
      <HorizontalSection items={WISH_LIST} header='Wish List' subHeader='Pets the community want to adopt!' page='wish' />
    </main>
  );
}
