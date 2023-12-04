'use client';
import { Database } from '@/utils/database.types';
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, VStack } from '@chakra-ui/react';
import PetSummary from '../PetSummary';
import { FaTrashAlt } from 'react-icons/fa';
import { onHideAdoption } from '@/ServerActions/formActions';
import { useFormState, useFormStatus } from 'react-dom';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import ToastifyConfig from '@/utils/toastify';

const TabLabel = ['Adoption', 'Wish', 'Missing', 'Messages'];

type Adoption = Database['public']['Tables']['Adoption']['Row'];
type Missing = Database['public']['Tables']['Missing']['Row'];
type Wish = Database['public']['Tables']['Wish']['Row'];
type Message = Database['public']['Tables']['Contact Us']['Row'];

type Props = {
  data: {
    adoptionList: Adoption[] | null;
    missingList: Missing[] | null;
    wishList: Wish[] | null;
    messages: Message[] | null;
  };
};

export default function PostManager(props: Props) {
  const {
    data,
  } = props;
  const [adoptionList, setAdoptionList] = useState(data.adoptionList ?? [])
  return (
    <Tabs colorScheme='orange'>
      <TabList>
        {TabLabel.map((tab) => (
          <Tab key={tab}>{tab}</Tab>
        ))}
      </TabList>
      <TabPanels>
        <TabPanel>
          {adoptionList?.map((item) => (
            <VStack key={item.id}>
              <AdoptionItem detail={item} setAdoptionList={setAdoptionList}/>
            </VStack>
          ))}
        </TabPanel>
        <TabPanel>
          <p>two!</p>
        </TabPanel>
        <TabPanel>
          <p>three!</p>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
}

function HideButton({show}: {show: boolean}) {
  const { pending } = useFormStatus();
  return (
    <Button colorScheme={show ? 'blackAlpha' : 'gray'} type='submit' isLoading={pending}>
      {show ? 'Hide': 'Unhide'}
    </Button>
  );
}

function AdoptionItem({ detail, setAdoptionList }: { detail: Adoption, setAdoptionList: Dispatch<SetStateAction<Adoption[]>> }) {
  const [hideItemState, hideItemAction] = useFormState(onHideAdoption, null);
  useEffect(() => {
    if (hideItemState === null) return;
    console.log(hideItemState)
    if (hideItemState?.includes('success')) {
      toast.success(hideItemState, ToastifyConfig);
      setAdoptionList(list => list?.map(item => {
        if (item.id === detail.id) {
          return {
            ...item,
            show: !item.show
          }
        } else return item
      }))
    } else {
      toast.error(`Failed to ${detail.show ? 'hide' : 'unhide'} item!`, ToastifyConfig);
    }
  }, [hideItemState]);
  return (
    <PetSummary {...detail}>
      <Flex mt={4} justify={'space-between'}>
        <form action={hideItemAction}>
          <input type='hidden' name='id' value={detail.id} />
          <input type='hidden' name='show' value={JSON.stringify(detail.show)} />
          <HideButton show={detail.show}/>
        </form>
        <Button leftIcon={<FaTrashAlt />} colorScheme={'red'}>
          Delete
        </Button>
      </Flex>
    </PetSummary>
  );
}
