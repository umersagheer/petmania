import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input, Textarea } from "@nextui-org/react";
import axios from "axios";
import { PawPrintIcon } from "lucide-react";
import { signIn } from "next-auth/react";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name must be filled" }),
  email: z.string().email().min(1, { message: "Email must be filled" }),
  message: z.string().min(1, { message: "Message must be filled" }),
});

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSignUp = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    try {
      await axios.post("/api/register", data);
      toast.success("Registered successfully");
      signIn("credentials", { ...data, redirect: false });
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSignUp)}
      className="flex flex-col gap-4 h-fit"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label="Name"
            type="text"
            size="md"
            {...field}
            isInvalid={Boolean(errors.name)}
            errorMessage={errors.name?.message}
          />
        )}
      />

      <Controller
        name="email"
        control={control}
        render={({ field }) => (
          <Input
            label="Email"
            type="text"
            size="md"
            {...field}
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        )}
      />

      <Controller
        name="message"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Message"
            type="text"
            size="md"
            {...field}
            isInvalid={Boolean(errors.message)}
            errorMessage={errors.message?.message}
          />
        )}
      />

      <Button
        fullWidth
        color="primary"
        type="submit"
        isLoading={isLoading}
        size="md"
      >
        Send
      </Button>
    </form>
  );
};

export default ContactForm;
