'use client';

import FormCard from '@/components/form/FormCard';
import { Box, Center, FormControl, FormHelperText, FormLabel, Heading, Input, InputGroup, InputLeftAddon, Textarea, VStack } from '@chakra-ui/react';
import Image from 'next/image';
import React, { FormEvent, FormEventHandler, useCallback, useMemo, useRef, useState } from 'react';
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
import { MapContainer, TileLayer, useMap, Marker, Popup, useMapEvents, useMapEvent } from 'react-leaflet';
import dayjs, { Dayjs } from 'dayjs';
import 'leaflet/dist/leaflet.css';
import { toast } from 'react-toastify';
import ToastifyConfig from '@/utils/toastify';
import { getBase64 } from '@/utils/helper';

const customMarkerIcon = L.icon({
  iconUrl: '/assets/leaflet/marker-icon.png',
  iconRetinaUrl: '/assets/leaflet/marker-icon-2x.png',
  shadowUrl: '/assets/leaflet/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowSize: [41, 41],
});

const range = (start: number, end: number) => {
  const result = [];
  for (let i = start; i < end; i++) {
    result.push(i);
  }
  return result;
};

export default function Page() {
  const [type, setType] = useState('');
  const [date, setDate] = useState<string>('');
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const { handleFormSubmit } = useFormSubmissionHelper({ type: 'missing' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [markerCoor, setMarkerCoor] = useState<L.LatLngExpression>([22.3193, 114.1694]);
  const markerRef = useRef<L.Marker>(null);

  const disabledDate: RangePickerProps['disabledDate'] = (current) => {
    return current && current > dayjs().startOf('day');
  };

  const onOk = (value: DatePickerProps['value'] | RangePickerProps['value']) => {
    if (value) {
      setDate(new Date(value!.toString()).toISOString());
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true)
      const form = new FormData(event.target as any);
      const latLng = markerRef.current?.getLatLng();
      if (fileList[0] && fileList[0]?.originFileObj) {
        const base64Image = await getBase64(fileList[0]?.originFileObj);
        form.append('image', base64Image);
      }
      form.append('type', type)
      form.append('lat', String(latLng?.lat))
      form.append('lng', String(latLng?.lng))
      form.append('lastSeen', date)    
      await handleFormSubmit(form)
      toast.success('Form posted successfully!', ToastifyConfig);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      toast.error('Failed to Post Form!', ToastifyConfig);
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormCard>
        <Center flexDir={'column'}>
          <Image objectFit='cover' src={Images.missing} alt='adoption' width={150} height={150} style={{ minWidth: 50 }} />
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
                  <Input name='contact' id='contact' type='text' size='md' placeholder='Phone or Email' />
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
                  rows={5}
                />
                <FormHelperText>Max 500</FormHelperText>
              </FormControl>
              <FormControl>
                <FormLabel>Date and Time Missing</FormLabel>
                <DatePicker disabledDate={disabledDate} showTime onOk={onOk} />
              </FormControl>
              <FormControl>
                <FormLabel>Last Seen Location</FormLabel>
                <MapContainer center={[22.3193, 114.1694]} zoom={10} scrollWheelZoom={false} style={{ width: '100%', height: 300 }}>
                  <MapComponent setMarkerCoor={setMarkerCoor} />
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url='http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}'
                    maxZoom={20}
                    subdomains={['mt0', 'mt1', 'mt2', 'mt3']}
                  />
                  <Marker position={markerCoor} icon={customMarkerIcon} draggable ref={markerRef} />
                </MapContainer>
                <FormHelperText>Click or Drag to move marker</FormHelperText>
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

const MapComponent = ({ setMarkerCoor }: { setMarkerCoor: React.Dispatch<React.SetStateAction<L.LatLngExpression>> }) => {
  useMapEvent('click', (e) => {
    setMarkerCoor(e.latlng);
  });
  return null;
};
