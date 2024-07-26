"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Card, CardBody, Input, Tooltip } from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import axios from "axios";

import { Heading } from "@/components/admin/ui/heading";
import BackArrowIcon from "@/components/icons/back";
import { Address } from "@prisma/client";
import { addressSchema } from "@/validations/client/admin-validations.client";
import { DeleteIcon } from "@/components/icons/delete";
import { adminPaths } from "@/config/constants";
import AlertModal from "@/components/admin/ui/alert-modal";

type AddressFormProps = {
  initialData: Address | null;
};

const AddressForm = ({ initialData }: AddressFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData || {
      address: "",
    },
  });

  const toastMessage = initialData
    ? "Address updated successfully"
    : "Address added successfully";
  const action = initialData ? "Save changes" : "Create";
  const title = initialData ? "Edit Address" : "Address";

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onFormSubmit = async (data: z.infer<typeof addressSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/addresses/${params.addressId}`, data);
      } else {
        await axios.post(`/api/addresses`, data);
      }
      router.replace(`${adminPaths.addresses}`);
      router.refresh();
      toast.success(toastMessage);
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data);
      } else if (axios.isAxiosError(error)) {
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
      await axios.delete(`/api/addresses/${id}`);
      router.replace(`${adminPaths.addresses}`);
      router.refresh();
      toast.success("Address deleted successfully");
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
          title={"Delete Address"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={deletionLoading}
          id={params.addressId as string}
        />
      )}
      <div className="flex items-center justify-between">
        <Heading title={title} description="Manage Address" />
        <div className="relative flex items-center justify-center gap-2">
          <Tooltip color={"default"} content={"Back"} size="sm">
            <div className="inline-block">
              <Button
                isIconOnly
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
          <CardBody className="grid grid-cols-1 md:grid-cols-2 gap-3 justify-center items-start">
            <Controller
              name="address"
              control={control}
              render={({ field }) => (
                <Input
                  label="Address"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.address)}
                  errorMessage={errors.address?.message}
                />
              )}
            />

            <Controller
              name="addressLink"
              control={control}
              render={({ field }) => (
                <Input
                  label="Address Link"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.addressLink)}
                  errorMessage={errors.addressLink?.message}
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

export default AddressForm;
