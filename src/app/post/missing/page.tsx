'use client';

import FormCard from '@/components/form/FormCard';
import {
  Box,
  Center,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Textarea,
  VStack,
} from '@chakra-ui/react';
import Image from 'next/image';
import React, { useCallback, useMemo, useState } from 'react';
import Images from '@/assets';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import AnimalTypeDropdown from '@/components/form/AnimalTypeDropdown';
import UploadPhoto from '@/components/form/UploadPhoto';
import { type } from 'os';
import { BsPerson } from 'react-icons/bs';
import { MdOutlineEmail, MdOutlinePets } from 'react-icons/md';
import useFormSubmissionHelper from '@/hooks/useFormSubmissionHelper';
import { UploadFile } from 'antd';
import { useRouter } from 'next/navigation';
import { DatePicker, Space } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import L from 'leaflet';
import { MapContainer, TileLayer, useMap, Marker, Popup } from 'react-leaflet';
import dayjs, { Dayjs } from 'dayjs';
import 'leaflet/dist/leaflet.css';

// delete L.Icon.Default.prototype._getIconUrl;

// L.Icon.Default.mergeOptions({
//     iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
//     iconUrl: require('leaflet/dist/images/marker-icon.png'),
//     shadowUrl: require('leaflet/dist/images/marker-shadow.png')
// });

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export default function page() {
  const [type, setType] = useState('');
  const [date, setDate] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { handleFormSubmit } = useFormSubmissionHelper({ type: 'missing' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().startOf('day');
  };

  const onOk = (
    value: DatePickerProps['value'] | RangePickerProps['value']
  ) => {
    console.log('onOk: ', value);
    if (value) {
      setDate(new Date(value!.toString()).toISOString());
    }
  };

  return (
    <form>
      <FormCard>
        <Center flexDir={'column'}>
          <Image
            objectFit='cover'
            src={Images.missing}
            alt='adoption'
            width={150}
            height={150}
            style={{ minWidth: 50 }}
          />
          <Box mt={2} color='#0B0E3F' w={'100%'}>
            <VStack spacing={5}>
              <FormControl>
                <FormLabel>Your Name</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                  <InputLeftAddon pointerEvents='none'>
                    <BsPerson color='gray.800' />
                  </InputLeftAddon>
                  <Input name='name' id='name' type='text' size='md' />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Contact</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                  <InputLeftAddon pointerEvents='none'>
                    <MdOutlineEmail color='gray.800' />
                  </InputLeftAddon>
                  <Input
                    name='contact'
                    id='contact'
                    type='text'
                    size='md'
                    placeholder='Phone or Email'
                  />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Type</FormLabel>
                <AnimalTypeDropdown type={type} setType={setType} />
              </FormControl>
              <FormControl>
                <FormLabel>Pet Name</FormLabel>
                <InputGroup borderColor='#E0E1E7'>
                  <InputLeftAddon pointerEvents='none'>
                    <MdOutlinePets color='gray.800' />
                  </InputLeftAddon>
                  <Input name='petName' id='petName' type='text' size='md' />
                </InputGroup>
              </FormControl>
              <FormControl>
                <FormLabel>Description</FormLabel>
                <Textarea
                  name='description'
                  id='description'
                  borderColor='gray.300'
                  _hover={{
                    borderRadius: 'gray.300',
                  }}
                  placeholder='Describe the pet you have lost, when was the last time you saw them? Any special characteristics and traits of your pet?'
                  maxLength={500}
                />
                <FormHelperText>Max 500</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Date and Time Missing</FormLabel>
                <DatePicker disabledDate={disabledDate} showTime onOk={onOk} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Seen Location</FormLabel>
                <MapContainer
                  center={[51.505, -0.09]}
                  zoom={13}
                  scrollWheelZoom={false}
                  style={{width: '100%', height: 300}}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
                  />
                  <Marker position={[51.505, -0.09]}>
                    <Popup>
                      A pretty CSS3 popup. <br /> Easily customizable.
                    </Popup>
                  </Marker>
                </MapContainer>
              </FormControl>
              <FormControl>
                <FormLabel>Image</FormLabel>
                <UploadPhoto fileList={fileList} setFileList={setFileList} />
              </FormControl>
              <PrimaryButton label='Submit' isLoading={loading} />
            </VStack>
          </Box>
        </Center>
      </FormCard>
    </form>
  );
}
