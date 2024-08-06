"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  Input,
  Textarea,
  Tooltip,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

import { Heading } from "@/components/admin/ui/heading";
import BackArrowIcon from "@/components/icons/back";
import ImageUpload from "@/components/admin/ui/image-upload";
import { Testimonial } from "@prisma/client";
import { testimonialSchema } from "@/validations/client/admin-validations.client";
import { DeleteIcon } from "@/components/icons/delete";
import { adminPaths } from "@/config/constants";
import AlertModal from "@/components/admin/ui/alert-modal";

type TestimonialFormProps = {
  initialData: Testimonial | null;
};

const TestimonialForm = ({ initialData }: TestimonialFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [showToastForErrors, setShowToastForErrors] = useState({
    image: false,
  });
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(
    !!initialData?.image
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(testimonialSchema),
    defaultValues: initialData || {
      name: "",
      description: "",
      rating: 0,
      image: "",
    },
  });

  const toastMessage = initialData
    ? "Testimonial updated successfully"
    : "Testimonial added successfully";
  const imageMessage = initialData
    ? "Updating testimonial"
    : "Creating testimonial";
  const action = initialData ? "Save changes" : "Create";
  const title = initialData ? "Edit Testimonial" : "Testimonial";

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onFormSubmit = async (data: z.infer<typeof testimonialSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/testimonials/${params.testimonialId}`, data);
      } else {
        await axios.post(`/api/testimonials`, data);
      }
      router.replace(`${adminPaths.testimonials}`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const backendErrors = error.response?.data.errors;
        console.log(error.response?.data);
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

  const onDelete = async (id: string) => {
    try {
      setDeletionLoading(true);
      await axios.delete(`/api/testimonials/${id}`);
      router.replace(`${adminPaths.testimonials}`);
      router.refresh();
      toast.success("Testimonial deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setDeletionLoading(false);
    }
  };

  return (
    <div>
      {isDeleteModalOpen && (
        <AlertModal
          title={"Delete Testimonial"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={deletionLoading}
          id={params.testimonialId as string}
        />
      )}
      <div className="flex items-center justify-between">
        <Heading title={title} description="Manage Testimonial" />
        <div className="relative flex items-center justify-center gap-2">
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

          {initialData && (
            <Tooltip content="Delete" size="sm" color="danger">
              <Button
                isIconOnly
                onClick={() => handleOpenDeleteModal()}
                color="danger"
                variant="solid"
                isDisabled={loading}
              >
                <DeleteIcon width={20} height={20} />
              </Button>
            </Tooltip>
          )}
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
          <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-center">
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-small my-1">Customer Image</p>
              <Controller
                name="image"
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
                    alt={"Testimonial img"}
                  />
                )}
              />
              <p className="text-xs text-rose-500">{errors.image?.message}</p>
              {errors.image && !showToastForErrors.image && (
                <>
                  {toast.warning("Please upload Testimonial image")}
                  {setShowToastForErrors((prevState) => ({
                    ...prevState,
                    image: true,
                  }))}
                </>
              )}
            </div>

            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input
                  label="Customer Name"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.name)}
                  errorMessage={errors.name?.message}
                />
              )}
            />

            <Controller
              name="rating"
              control={control}
              render={({ field }) => (
                <Input
                  label="Rating"
                  type="number"
                  size="sm"
                  {...field}
                  value={String(field.value)}
                  isInvalid={Boolean(errors.rating)}
                  errorMessage={errors.rating?.message}
                />
              )}
            />

            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Description"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.description)}
                  errorMessage={errors.description?.message}
                />
              )}
            />
          </CardBody>
        </Card>

        <Button
          className="self-end"
          color="primary"
          type="submit"
          isLoading={loading}
        >
          {action}
        </Button>
      </form>
    </div>
  );
};

export default TestimonialForm;
