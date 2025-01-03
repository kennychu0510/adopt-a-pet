import HorizontalSection from '@/components/HorizontalSection';
import { CATEGORIES, PetCardProps } from '@/constants';
import services from '@/services';
import { getImageForPetType } from '@/utils/helper';
import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';

dayjs.extend(isToday);

export const revalidate = 0;

export default async function Home() {
  const adoptionList = await services.getAdoptionListForLanding();
  const missingList = await services.getMissingListForLanding();
  const wishList = await services.getWishListForLanding();

  const NEW_PETS: PetCardProps[] =
    adoptionList.data?.map((item) => ({
      id: String(item.id),
      name: item.petName,
      image: item.image ?? '',
      link: `/adopt/${item.id}`,
      badge: dayjs(item.created_at).isToday() ? 'NEW' : undefined,
    })) ?? [];
  const MISSING_PETS: PetCardProps[] =
    missingList.data?.map((item) => ({
      id: String(item.id),
      name: item.petName,
      image: item.image ?? '',
      link: `/missing/${item.id}`,
      badge: dayjs(item.created_at).isToday() ? 'NEW' : undefined,
    })) ?? [];

  const WISH_LIST: PetCardProps[] =
    wishList.data?.map((item) => ({
      id: String(item.id),
      name: item.type,
      image: getImageForPetType(item.type),
      link: `/wish/${item.id}`,
      badge: dayjs(item.created_at).isToday() ? 'NEW' : undefined,
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
