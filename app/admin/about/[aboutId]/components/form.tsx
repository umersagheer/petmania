"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Textarea,
} from "@nextui-org/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Heading } from "@/components/admin/ui/heading";
import BackArrowIcon from "@/components/icons/back";
import ImageUpload from "@/components/admin/ui/image-upload";

const formSchema = z.object({
  aboutDescription: z.string().min(1, { message: "About must be filled" }),
  visionDescription: z.string().min(1, { message: "Vision must be filled" }),
  goal: z.string().min(1, { message: "Goal must be filled" }),
  aboutImg: z.string().min(1, { message: "Image must be provided" }),
  contactDescription: z.string().min(1, { message: "Contact must be filled" }),
});

const About = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      aboutDescription: "",
      visionDescription: "",
      goal: "",
      aboutImg: "",
      contactDescription: "",
    },
  });

  const onFormSubmit = async (data: z.infer<typeof formSchema>) => {
    console.log(data);
  };

  return (
    <div className="my-12">
      <div className="flex items-center justify-between">
        <Heading title="About" description="Manage About" />
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
          <CardBody className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="md:col-span-2 lg:col-span-3">
              <Controller
                name="aboutImg"
                control={control}
                render={({ field }) => (
                  <ImageUpload
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    disabled={false}
                    value={field.value ? [field.value] : []}
                    alt={"about img"}
                    errorMessage={errors.aboutDescription?.message}
                  />
                )}
              />
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
          <CardBody className="gap-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
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
          isLoading={isLoading}
        >
          Create
        </Button>
      </form>
    </div>
  );
};

export default About;
