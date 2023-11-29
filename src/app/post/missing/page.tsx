"use client";

import Images from "@/assets";
import PrimaryButton from "@/components/buttons/PrimaryButton";
import FormCard from "@/components/form/FormCard";
import UploadPhoto from "@/components/form/UploadPhoto";
import AnimalTypeInput from "@/components/form/input/AnimalTypeInput";
import ContactInput from "@/components/form/input/ContactInput";
import DescriptionInput from "@/components/form/input/DescriptionInput";
import NameInput from "@/components/form/input/NameInput";
import TextFieldInput from "@/components/form/input/TextFieldInput";
import { FORM_ERRORS, HK_CENTER_LNG, HK_CENTER_LAT } from "@/constants";
import useFormHelper from "@/hooks/useFormHelper";
import useFormSubmissionHelper from "@/hooks/useFormSubmissionHelper";
import { getBase64 } from "@/utils/helper";
import ToastifyConfig from "@/utils/toastify";
import {
  Box,
  Center,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  VStack,
} from "@chakra-ui/react";
import { DatePicker } from "antd";
import type { DatePickerProps, RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import L, { LatLng } from "leaflet";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FormEvent, useMemo, useState } from "react";
import { MdOutlinePets } from "react-icons/md";
import { toast } from "react-toastify";
import { ZodError } from "zod";

export default function Page() {
  const [date, setDate] = useState<string>("");
  const { handleFormSubmit } = useFormSubmissionHelper({ type: "missing" });
  const router = useRouter();

  const LeafletMap = useMemo(
    () => dynamic(() => import("@/components/form/LeafletMap"), { ssr: false }),
    [],
  );

  const [markerCoor, setMarkerCoor] = useState<L.LatLng>(new LatLng(HK_CENTER_LAT, HK_CENTER_LNG));
  const {
    loading,
    setLoading,
    type,
    setType,
    errors,
    setErrors,
    removeErrorOnChange,
    fileList,
    setFileList,
  } = useFormHelper();

  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().startOf("day");
  };

  const onOk = (
    value: DatePickerProps["value"] | RangePickerProps["value"],
  ) => {
    if (value) {
      setDate(new Date(value!.toString()).toISOString());
      removeErrorOnChange("lastSeen")();
    }
  };

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(event.target as any);
      
      if (fileList[0] && fileList[0]?.originFileObj) {
        const base64Image = await getBase64(fileList[0]?.originFileObj);
        form.append("image", base64Image);
      }
      form.append("type", type);
      form.append("lat", String(markerCoor.lat));
      form.append("lng", String(markerCoor.lng));
      form.append("lastSeen", date);
      await handleFormSubmit(form);
      toast.success("Form posted successfully!", ToastifyConfig);
      setTimeout(() => {
        router.push("/");
      }, 2000);
    } catch (error) {
      toast.error("Please check your form!", ToastifyConfig);
      if (error instanceof ZodError) {
        setErrors(new Set(Object.keys(error.formErrors.fieldErrors)));
      }
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormCard>
        <Center flexDir={"column"}>
          <Image
            objectFit="cover"
            src={Images.missing}
            alt="adoption"
            width={150}
            height={150}
            style={{ minWidth: 50 }}
          />
          <Box mt={2} color="#0B0E3F" w={"100%"}>
            <VStack spacing={5}>
              <NameInput
                isInvalid={errors.has("name")}
                onChange={removeErrorOnChange("name")}
              />
              <ContactInput
                isInvalid={errors.has("contact")}
                onChange={removeErrorOnChange("contact")}
              />
              <AnimalTypeInput
                isInvalid={errors.has("type")}
                type={type}
                setType={setType}
              />
              <TextFieldInput
                isInvalid={errors.has("petName")}
                onChange={removeErrorOnChange("petName")}
                label="Pet Name"
                id="petName"
                errorMessage={FORM_ERRORS.PET_NAME}
                icon={<MdOutlinePets color="gray.800" />}
              />
              <DescriptionInput
                placeholder="Describe the pet you have lost. What are its main characteristics?"
                isInvalid={errors.has("description")}
                onChange={removeErrorOnChange("description")}
              />
              <FormControl isInvalid={errors.has("lastSeen")}>
                <FormLabel>Date and Time Missing</FormLabel>
                <DatePicker disabledDate={disabledDate} showTime onOk={onOk} />

                {errors.has("lastSeen") && (
                  <FormErrorMessage>{FORM_ERRORS.DATE}</FormErrorMessage>
                )}
              </FormControl>
              <FormControl>
                <FormLabel>Last Seen Location</FormLabel>
                <LeafletMap
                  markerCoor={markerCoor}
                  setMarkerCoor={setMarkerCoor}
                />
                <FormHelperText>Click map to set marker</FormHelperText>
              </FormControl>
              <FormControl isInvalid={errors.has("image")}>
                <FormLabel>Image</FormLabel>
                <UploadPhoto fileList={fileList} setFileList={setFileList} />
                <FormErrorMessage>{FORM_ERRORS.IMAGE}</FormErrorMessage>
              </FormControl>
              <PrimaryButton label="Submit" isLoading={loading} />
            </VStack>
          </Box>
        </Center>
      </FormCard>
    </form>
  );
}
