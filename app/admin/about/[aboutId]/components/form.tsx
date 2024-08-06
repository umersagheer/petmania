"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { Heading } from "@/components/admin/ui/heading";
import BackArrowIcon from "@/components/icons/back";
import ImageUpload from "@/components/admin/ui/image-upload";
import { toast } from "sonner";
import { About } from "@prisma/client";
import axios from "axios";
import { aboutSchema } from "@/validations/client/admin-validations.client";

type AboutFormProps = {
  initialData: About | null;
};

const AboutForm = ({ initialData }: AboutFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [Loading, setLoading] = useState(false);
  const [showToastForErrors, setShowToastForErrors] = useState({
    contactImg: false,
    aboutImg: false,
    aboutHeroImg: false,
    descriptionImg: false,
  });
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(
    !!initialData?.aboutImg
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(aboutSchema),
    defaultValues: initialData || {
      aboutDescription: "",
      visionDescription: "",
      goal: "",
      aboutImg: "",
      aboutHeroImg: "",
      descriptionImg: "",
      contactDescription: "",
      contactImg: "",
    },
  });

  const toastMessage = initialData
    ? "About updated successfully"
    : "About added successfully";
  const imageMessage = initialData ? "Updating About" : "Creating About";
  const action = initialData ? "Save changes" : "Create";
  const title = initialData ? "Edit About" : "About";

  const onFormSubmit = async (data: z.infer<typeof aboutSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/about/${params.aboutId}`, data);
      } else {
        await axios.post(`/api/about`, data);
      }
      router.replace(`/admin/about`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendErrors = error.response?.data.errors;
        if (backendErrors) {
          backendErrors.forEach((err: any) => toast.warning(err.message));
        } else {
          toast.error("An error occurred but no error messages were provided.");
        }
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="my-12">
      <div className="flex items-center justify-between">
        <Heading title={title} description="Manage About" />
        <div className="relative">
          <Tooltip
            color={isImageUploaded && !initialData ? "danger" : "default"}
            content={
              isImageUploaded && !initialData ? "Save changes first" : "Back"
            }
            size="sm"
          >
            <div className="inline-block">
              <Button
                isIconOnly
                isDisabled={isImageUploaded && !initialData}
                color="primary"
                variant="flat"
                onClick={() => {
                  router.back();
                }}
              >
                <BackArrowIcon />
              </Button>
            </div>
          </Tooltip>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onFormSubmit)}
        className="flex flex-col gap-4"
      >
        <Card
          isBlurred
          className="border-none bg-background/50 dark:bg-default-100/50 "
        >
          <CardHeader className="font-semibold text-medium tracking-wide">
            About
          </CardHeader>
          <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center">
            <div>
              <p className="text-small my-1">About Main Image</p>
              <Controller
                name="aboutImg"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    onChange={(url) => {
                      field.onChange(url);
                      setIsImageUploaded(true);
                      toast.warning(
                        `Please remove image if wanna leave without ${imageMessage}`
                      );
                    }}
                    onRemove={() => field.onChange("")}
                    disabled={field.disabled}
                    value={field.value ? [field.value] : []}
                    alt={"about img"}
                  />
                )}
              />
              <p className="text-xs text-rose-500">
                {errors.aboutImg?.message}
              </p>
              {errors.aboutImg && !showToastForErrors.aboutImg && (
                <>
                  {toast.warning("Please upload About image")}
                  {setShowToastForErrors((prevState) => ({
                    ...prevState,
                    aboutImg: true,
                  }))}
                </>
              )}
            </div>
            <div className="">
              <p className="text-small my-1">About Description Image</p>

              <Controller
                name="descriptionImg"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    onChange={(url) => {
                      field.onChange(url);
                      setIsImageUploaded(true);
                    }}
                    onRemove={() => field.onChange("")}
                    disabled={false}
                    value={field.value ? [field.value] : []}
                    alt={"about img"}
                  />
                )}
              />
              <p className="text-xs text-rose-500">
                {errors.descriptionImg?.message}
              </p>
              {errors.descriptionImg && !showToastForErrors.descriptionImg && (
                <>
                  {toast.warning("Please upload description image")}
                  {setShowToastForErrors((prevState) => ({
                    ...prevState,
                    descriptionImg: true,
                  }))}
                </>
              )}
            </div>
            <div className="">
              <p className="text-small my-1">About Hero Image</p>
              <Controller
                name="aboutHeroImg"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    onChange={(url) => {
                      field.onChange(url);
                      setIsImageUploaded(true);
                    }}
                    onRemove={() => field.onChange("")}
                    disabled={false}
                    value={field.value ? [field.value] : []}
                    alt={"about img"}
                  />
                )}
              />
              <p className="text-xs text-rose-500">
                {errors.aboutHeroImg?.message}
              </p>
              {errors.aboutHeroImg && !showToastForErrors.aboutHeroImg && (
                <>
                  {toast.warning("Please upload Hero image")}
                  {setShowToastForErrors((prevState) => ({
                    ...prevState,
                    aboutHeroImg: true,
                  }))}
                </>
              )}
            </div>
            <Controller
              name="aboutDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="About Description"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.aboutDescription)}
                  errorMessage={errors.aboutDescription?.message}
                />
              )}
            />
            <Controller
              name="visionDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Vision"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.visionDescription)}
                  errorMessage={errors.visionDescription?.message}
                />
              )}
            />
            <Controller
              name="goal"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Goal"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.goal)}
                  errorMessage={errors.goal?.message}
                />
              )}
            />
          </CardBody>
        </Card>
        <Card
          isBlurred
          className="border-none bg-background/50 dark:bg-default-100/50 "
        >
          <CardHeader className="font-semibold text-medium tracking-wide">
            Contact
          </CardHeader>
          <CardBody className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-center justify-center">
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-small my-1">Contact Image</p>
              <Controller
                name="contactImg"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    onChange={(url) => {
                      field.onChange(url);
                      setIsImageUploaded(true);
                    }}
                    onRemove={() => field.onChange("")}
                    disabled={false}
                    value={field.value ? [field.value] : []}
                    alt={"about img"}
                  />
                )}
              />
              <p className="text-xs text-rose-500">
                {errors.contactImg?.message}
              </p>
              {errors.contactImg && !showToastForErrors.contactImg && (
                <>
                  {toast.warning("Please upload contact image")}
                  {setShowToastForErrors((prevState) => ({
                    ...prevState,
                    contactImg: true,
                  }))}
                </>
              )}
            </div>
            <Controller
              name="contactDescription"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Contact Description"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.contactDescription)}
                  errorMessage={errors.contactDescription?.message}
                />
              )}
            />
          </CardBody>
        </Card>
        <Button
          className="self-end"
          color="primary"
          type="submit"
          isLoading={Loading}
        >
          {action}
        </Button>
      </form>
    </div>
  );
};

export default AboutForm;
