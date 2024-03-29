"use client";

import PrimaryButton from "@/components/buttons/PrimaryButton";
import SubmitButton from "@/components/buttons/SubmitButton";
import FormCard from "@/components/form/FormCard";
import AnimalTypeInput from "@/components/form/input/AnimalTypeInput";
import ContactInput from "@/components/form/input/ContactInput";
import DescriptionInput from "@/components/form/input/DescriptionInput";
import NameInput from "@/components/form/input/NameInput";
import useFormHelper from "@/hooks/useFormHelper";
import useFormSubmissionHelper from "@/hooks/useFormSubmissionHelper";
import { handleFetchError } from "@/utils/errorHelper";
import ToastifyConfig from "@/utils/toastify";
import { Box, Center, Heading, VStack } from "@chakra-ui/react";
import { useRouter } from "next/navigation";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { ZodError } from "zod";

export default function Page() {
  const { handleFormSubmit } = useFormSubmissionHelper({ type: "wish" });
  const router = useRouter();
  const {
    loading,
    setLoading,
    type,
    setType,
    errors,
    setErrors,
    removeErrorOnChange,
  } = useFormHelper();

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    try {
      setLoading(true);
      const form = new FormData(event.target as any);
      form.append("type", type);

      await handleFormSubmit(form);
      toast.success("Form posted successfully!", ToastifyConfig);
      setTimeout(() => {
        router.push("/");
      }, 1000);
    } catch (error) {
      handleFetchError({
        error,
        setErrors,
      });
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <FormCard>
        <Center>
          <Heading color={"blue.600"} mt={1}>
            Submit your Wish
          </Heading>
        </Center>
        <Box mt={2}>
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
            <DescriptionInput
              placeholder="Describe about yourself, why do you want to adopt a pet?"
              isInvalid={errors.has("description")}
              onChange={removeErrorOnChange("description")}
            />
            <PrimaryButton label="Submit" isLoading={loading} />
          </VStack>
        </Box>
      </FormCard>
    </form>
  );
}
