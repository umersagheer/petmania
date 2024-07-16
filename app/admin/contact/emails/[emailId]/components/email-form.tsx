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
import { Email } from "@prisma/client";
import { EmailSchema } from "@/validations/client/admin-validations";
import { DeleteIcon } from "@/components/icons/delete";
import { adminPaths } from "@/config/constants";
import AlertModal from "@/components/admin/ui/alert-modal";

type EmailFormProps = {
  initialData: Email | null;
};

const EmailForm = ({ initialData }: EmailFormProps) => {
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
    resolver: zodResolver(EmailSchema),
    defaultValues: initialData || {
      email: "",
    },
  });

  const toastMessage = initialData
    ? "Email updated successfully"
    : "Email added successfully";
  const action = initialData ? "Save changes" : "Create";
  const title = initialData ? "Edit Email" : "Email";

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onFormSubmit = async (data: z.infer<typeof EmailSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/emails/${params.emailId}`, data);
      } else {
        await axios.post(`/api/emails`, data);
      }
      router.replace(`${adminPaths.emails}`);
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
      await axios.delete(`/api/emails/${id}`);
      router.replace(`${adminPaths.emails}`);
      router.refresh();
      toast.success("Email deleted successfully");
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
          title={"Delete Email"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={deletionLoading}
          id={params.emailId as string}
        />
      )}
      <div className="flex items-center justify-between">
        <Heading title={title} description="Manage Email" />
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
              name="email"
              control={control}
              render={({ field }) => (
                <Input
                  label="Email"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.email)}
                  errorMessage={errors.email?.message}
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

export default EmailForm;
