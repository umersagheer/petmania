"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Avatar,
  Button,
  Card,
  CardBody,
  Chip,
  Input,
  RadioGroup,
  Select,
  SelectedItems,
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
import { Deal, Image, Product, Tag, Weight } from "@prisma/client";
import { productSchema } from "@/validations/client/admin-validations.client";
import { DeleteIcon } from "@/components/icons/delete";
import { adminPaths } from "@/config/constants";
import AlertModal from "@/components/admin/ui/alert-modal";
import { CustomRadio } from "@/components/admin/ui/radio-button";
import {
  BriefcaseMedicalIcon,
  CatIcon,
  DogIcon,
  FlameIcon,
  TagIcon,
  WeightIcon,
} from "lucide-react";
import ImageUpload from "@/components/admin/ui/image-upload";
import { foodTypes } from "@/config/food-types";

type ProductFormProps = {
  initialData:
    | (Product & {
        images: Image[];
      } & {
        tags: Tag[];
      } & {
        deals: Deal[];
      } & {
        weights: Weight[];
      })
    | null;
  tags: Tag[];
  deals: Deal[];
  weights: Weight[];
};

const ProductForm = ({
  initialData,
  tags,
  deals,
  weights,
}: ProductFormProps) => {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [deletionLoading, setDeletionLoading] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isImageUploaded, setIsImageUploaded] = useState<boolean>(
    !!initialData?.images
  );

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      type: initialData?.type || 0,
      ingredients: initialData?.ingredients || "",
      calorieContent: initialData?.calorieContent || "",
      guaranteedAnalysis: initialData?.guaranteedAnalysis || "",
      benefits: initialData?.benefits || "",
      images: initialData?.images || [],
      weightIds: initialData?.weights.map((weight: any) => weight.id) || [],
      tagIds: initialData?.tags.map((tag: any) => tag.id) || [],
      dealIds: initialData?.deals.map((deal: any) => deal.id) || [],
    },
  });

  const toastMessage = initialData
    ? "Product updated successfully"
    : "Product added successfully";
  const imageMessage = initialData ? "Updating Product" : "Creating Product";
  const action = initialData ? "Save changes" : "Create";
  const title = initialData ? "Edit Product" : "Product";

  const handleOpenDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };

  const onFormSubmit = async (data: z.infer<typeof productSchema>) => {
    try {
      setLoading(true);
      if (initialData) {
        await axios.patch(`/api/manage-products/${params.productId}`, data);
      } else {
        await axios.post(`/api/manage-products`, data);
      }
      router.replace(`${adminPaths.manageProducts}`);
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
      await axios.delete(`/api/products/${id}`);
      router.replace(`${adminPaths.products}`);
      router.refresh();
      toast.success("Product deleted successfully");
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
          title={"Delete Product"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={deletionLoading}
          id={params.productId as string}
        />
      )}
      <div className="flex items-center justify-between">
        <Heading title={title} description="Manage Product" />
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
          <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 justify-center items-start">
            <div className="md:col-span-2 lg:col-span-3">
              <p className="text-small my-1">Product Images</p>
              <Controller
                name="images"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    onChange={(url) => {
                      console.log(field.value);
                      field.onChange([...field.value, { url }]);
                      setIsImageUploaded(true);
                      toast.warning(
                        `Please remove image if wanna leave without ${imageMessage}`
                      );
                    }}
                    onRemove={(url) =>
                      field.onChange(
                        field.value.filter(
                          (current: any) => current.url !== url
                        )
                      )
                    }
                    disabled={loading}
                    value={field.value.map((image: any) => image.url)}
                    alt={"product img"}
                  />
                )}
              />
              <p className="text-xs text-rose-500">{errors.images?.message}</p>
            </div>

            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <Input
                  label="Product Title"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.title)}
                  errorMessage={errors.title?.message}
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

            <Controller
              name="ingredients"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Ingredients"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.ingredients)}
                  errorMessage={errors.ingredients?.message}
                />
              )}
            />

            <Controller
              name="benefits"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Benefits"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.benefits)}
                  errorMessage={errors.benefits?.message}
                />
              )}
            />

            <Controller
              name="calorieContent"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Colories"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.calorieContent)}
                  errorMessage={errors.calorieContent?.message}
                />
              )}
            />

            <Controller
              name="guaranteedAnalysis"
              control={control}
              render={({ field }) => (
                <Textarea
                  minRows={2}
                  maxRows={4}
                  label="Analysis"
                  type="text"
                  size="sm"
                  {...field}
                  isInvalid={Boolean(errors.guaranteedAnalysis)}
                  errorMessage={errors.guaranteedAnalysis?.message}
                />
              )}
            />

            <Controller
              name="tagIds"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  selectedKeys={field.value}
                  items={tags}
                  label="Tags"
                  onChange={(selectedItems) => {
                    field.onChange(selectedItems.target.value.split(","));
                  }}
                  variant="flat"
                  isMultiline
                  selectionMode="multiple"
                  isInvalid={Boolean(errors.tagIds)}
                  errorMessage={errors.tagIds?.message}
                  renderValue={(items: SelectedItems<Tag>) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip
                            key={item.key}
                            variant="flat"
                            color="primary"
                            startContent={<TagIcon size={16} />}
                          >
                            {item?.data?.name}
                          </Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(tag) => (
                    <SelectItem
                      key={tag.id}
                      textValue={tag.name}
                      startContent={<TagIcon size={16} />}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="text-small">{tag.name}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />

            <Controller
              name="weightIds"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  selectedKeys={field.value}
                  items={weights}
                  label="Weights"
                  onChange={(selectedItems) => {
                    field.onChange(selectedItems.target.value.split(","));
                  }}
                  variant="flat"
                  isMultiline
                  selectionMode="multiple"
                  isInvalid={Boolean(errors.weightIds)}
                  errorMessage={errors.weightIds?.message}
                  renderValue={(items: SelectedItems<Weight>) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip
                            key={item.key}
                            variant="flat"
                            color="primary"
                            endContent={<WeightIcon size={16} />}
                          >
                            <p>
                              {item?.data?.value} {item?.data?.unit}
                            </p>
                          </Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(weight) => (
                    <SelectItem
                      key={weight.id}
                      textValue={weight.value}
                      startContent={<WeightIcon size={16} />}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="text-small">
                            {weight.value} {weight.unit}
                          </span>
                          <span className="text-xs font-medium">
                            {weight.price} PKR
                          </span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />

            <Controller
              name="dealIds"
              control={control}
              render={({ field }) => (
                <Select
                  value={field.value}
                  selectedKeys={field.value}
                  items={deals}
                  label="Deals"
                  onChange={(selectedItems) => {
                    field.onChange(selectedItems.target.value.split(","));
                  }}
                  variant="flat"
                  isMultiline
                  selectionMode="multiple"
                  isInvalid={Boolean(errors.dealIds)}
                  errorMessage={errors.dealIds?.message}
                  renderValue={(items: SelectedItems<Deal>) => {
                    return (
                      <div className="flex flex-wrap gap-2">
                        {items.map((item) => (
                          <Chip
                            key={item.key}
                            variant="flat"
                            color="primary"
                            endContent={<FlameIcon size={16} />}
                          >
                            {item?.data?.name}
                          </Chip>
                        ))}
                      </div>
                    );
                  }}
                >
                  {(deal) => (
                    <SelectItem
                      key={deal.id}
                      textValue={deal.name}
                      startContent={<FlameIcon size={16} />}
                    >
                      <div className="flex gap-2 items-center">
                        <div className="flex flex-col">
                          <span className="text-small">{deal.name}</span>
                        </div>
                      </div>
                    </SelectItem>
                  )}
                </Select>
              )}
            />

            <Controller
              name="type"
              control={control}
              render={({ field }) => (
                <RadioGroup
                  label="Food Type"
                  size="sm"
                  onChange={(e) => field.onChange(parseInt(e.target.value, 10))}
                  value={field.value?.toString()}
                  isInvalid={Boolean(errors.type)}
                  errorMessage={errors.type?.message}
                  className="flex flex-col gap-2"
                >
                  <CustomRadio value={foodTypes.dog}>
                    <div className="flex items-center gap-2">
                      <DogIcon />
                      Dog
                    </div>
                  </CustomRadio>
                  <CustomRadio value={foodTypes.cat}>
                    <div className="flex items-center gap-2">
                      <CatIcon />
                      Cat
                    </div>
                  </CustomRadio>
                  <CustomRadio value={foodTypes.medicated}>
                    <div className="flex items-center gap-2">
                      <BriefcaseMedicalIcon />
                      Medicated
                    </div>
                  </CustomRadio>
                </RadioGroup>
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

export default ProductForm;
