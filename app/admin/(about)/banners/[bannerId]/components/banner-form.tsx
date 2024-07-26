"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  Input,
  Select,
  SelectItem,
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
import { Banner, Product } from "@prisma/client";
import { bannerSchema } from "@/validations/client/admin-validations.client";
import { DeleteIcon } from "@/components/icons/delete";
import { adminPaths } from "@/config/constants";
import AlertModal from "@/components/admin/ui/alert-modal";
import { PackageIcon } from "lucide-react";

type BannerFormProps = {
  initialData:
    | (Banner & {
        product: Product | null;
      })
    | null;
  products: {
    id: string;
    title: string;
  }[];
};

const BannerForm = ({ initialData, products }: BannerFormProps) => {
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
    resolver: zodResolver(bannerSchema),
    defaultValues: {
      title: initialData?.title || "",
      image: initialData?.image || "",
      productId: initialData?.product?.id || "",
    },
  });

  const toastMessage = initialData
    ? "Banner updated successfully"
    : "Banner added successfully";
  const imageMessage = initialData ? "Updating banner" : "Creating banner";
  const action = initialData ? "Save changes" : "Create";
  const title = initialData ? "Edit Banner" : "Banner";

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onFormSubmit = async (data: z.infer<typeof bannerSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/banners/${params.bannerId}`, data);
      } else {
        await axios.post(`/api/banners`, data);
      }
      router.replace(`${adminPaths.banners}`);
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
      await axios.delete(`/api/banners/${id}`);
      router.replace(`${adminPaths.banners}`);
      router.refresh();
      toast.success("Banner deleted successfully");
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
          title={"Delete Banner"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={deletionLoading}
          id={params.bannerId as string}
        />
      )}
      <div className="flex items-center justify-between">
        <Heading title={title} description="Manage Banner" />
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
              <p className="text-small my-1">Banner Image</p>
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
                    alt={"Banner img"}
                  />
                )}
              />
              <p className="text-xs text-rose-500">{errors.image?.message}</p>
              {errors.image && !showToastForErrors.image && (
                <>
                  {toast.warning("Please upload Banner image")}
                  {setShowToastForErrors((prevState) => ({
                    ...prevState,
                    image: true,
                  }))}
                </>
              )}
            </div>

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  label="Banner Title"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.title)}
                  errorMessage={errors.title?.message}
                />
              )}
            />

            <Controller
              name="productId"
              control={control}
              render={({ field }) => (
                <Select
                  size="sm"
                  label="Select Product"
                  variant="flat"
                  selectedKeys={field.value ? [field.value] : []}
                  className="min-w-full"
                  onChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  {products.map((product) => (
                    <SelectItem
                      key={product.id}
                      value={product.id}
                      startContent={<PackageIcon size={16} />}
                    >
                      {product.title}
                    </SelectItem>
                  ))}
                </Select>
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

export default BannerForm;
