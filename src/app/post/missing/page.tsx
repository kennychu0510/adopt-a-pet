'use client';

import Images from '@/assets';
import PrimaryButton from '@/components/buttons/PrimaryButton';
import FormCard from '@/components/form/FormCard';
import UploadPhoto from '@/components/form/UploadPhoto';
import AnimalTypeInput from '@/components/form/input/AnimalTypeInput';
import ContactInput from '@/components/form/input/ContactInput';
import DescriptionInput from '@/components/form/input/DescriptionInput';
import NameInput from '@/components/form/input/NameInput';
import TextFieldInput from '@/components/form/input/TextFieldInput';
import { HK_CENTER } from '@/constants';
import useFormHelper from '@/hooks/useFormHelper';
import useFormSubmissionHelper from '@/hooks/useFormSubmissionHelper';
import { getBase64 } from '@/utils/helper';
import ToastifyConfig from '@/utils/toastify';
import { Box, Center, FormControl, FormErrorMessage, FormHelperText, FormLabel, VStack } from '@chakra-ui/react';
import { DatePicker, UploadFile } from 'antd';
import type { DatePickerProps, RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { MdOutlinePets } from 'react-icons/md';
import { MapContainer, Marker, TileLayer, useMapEvent } from 'react-leaflet';
import { toast } from 'react-toastify';
import { ZodError } from 'zod';

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

export default function Page() {
  const [date, setDate] = useState<string>('');
  const { handleFormSubmit } = useFormSubmissionHelper({ type: 'missing' });
  const router = useRouter();

  const [markerCoor, setMarkerCoor] = useState<L.LatLngExpression>(HK_CENTER);
  const markerRef = useRef<L.Marker>(null);
  const { loading, setLoading, type, setType, errors, setErrors, removeErrorOnChange, fileList, setFileList } = useFormHelper();

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
      setLoading(true);
      const form = new FormData(event.target as any);
      const latLng = markerRef.current?.getLatLng();
      if (fileList[0] && fileList[0]?.originFileObj) {
        const base64Image = await getBase64(fileList[0]?.originFileObj);
        form.append('image', base64Image);
      }
      form.append('type', type);
      form.append('lat', String(latLng?.lat));
      form.append('lng', String(latLng?.lng));
      form.append('lastSeen', date);
      await handleFormSubmit(form);
      toast.success('Form posted successfully!', ToastifyConfig);
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      toast.error('Please check your form!', ToastifyConfig);
      if (error instanceof ZodError) {
        setErrors(new Set(Object.keys(error.formErrors.fieldErrors)));
      }
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    if (date) {
      removeErrorOnChange('lastSeen');
    }
  }, [date]);

  return (
    <form onSubmit={onSubmit}>
      <FormCard>
        <Center flexDir={'column'}>
          <Image objectFit='cover' src={Images.missing} alt='adoption' width={150} height={150} style={{ minWidth: 50 }} />
          <Box mt={2} color='#0B0E3F' w={'100%'}>
            <VStack spacing={5}>
              <NameInput isInvalid={errors.has('name')} onChange={removeErrorOnChange('name')} />
              <ContactInput isInvalid={errors.has('contact')} onChange={removeErrorOnChange('contact')} />
              <AnimalTypeInput isInvalid={errors.has('type')} type={type} setType={setType} />
              <TextFieldInput
                isInvalid={errors.has('petName')}
                onChange={removeErrorOnChange('petName')}
                label='Pet Name'
                id='petName'
                errorMessage='Pet name is required'
                icon={<MdOutlinePets color='gray.800' />}
              />
              <DescriptionInput isInvalid={errors.has('description')} onChange={removeErrorOnChange('description')} />
              <FormControl isInvalid={errors.has('lastSeen')}>
                <FormLabel>Date and Time Missing</FormLabel>
                <DatePicker disabledDate={disabledDate} showTime onOk={onOk} />
                <FormErrorMessage>Date and time are required</FormErrorMessage>
              </FormControl>
              <FormControl>
                <FormLabel>Last Seen Location</FormLabel>
                <MapContainer center={HK_CENTER} zoom={10} scrollWheelZoom={false} style={{ width: '100%', height: 300 }}>
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
              <FormControl isInvalid={errors.has('image')}>
                <FormLabel>Image</FormLabel>
                <UploadPhoto fileList={fileList} setFileList={setFileList} />
                <FormErrorMessage>Image of pet is required</FormErrorMessage>
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
