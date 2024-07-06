import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { EyeSlashFilledIcon } from "@/components/icons/eye-slash";
import { EyeFilledIcon } from "@/components/icons/eye";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name must be filled" }),
  email: z.string().email().min(1, { message: "Email must be filled" }),
  password: z.string().min(3, { message: "Password must be filled" }),
});

const RegisterForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/admin");
    }
  }, [session?.status, router]);

  const {
    control,
    formState: { errors },
    handleSubmit,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
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
      className="flex flex-col gap-4 h-[300px]"
    >
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            isRequired
            label="Name"
            type="text"
            size="sm"
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
            isRequired
            label="Email"
            type="text"
            size="sm"
            {...field}
            isInvalid={Boolean(errors.email)}
            errorMessage={errors.email?.message}
          />
        )}
      />
      <Controller
        name="password"
        control={control}
        render={({ field }) => (
          <Input
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            isRequired
            label="Password"
            type={isVisible ? "text" : "password"}
            size="sm"
            {...field}
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
        )}
      />
      {/* <p className="text-center text-small">
                    Already have an account?{" "}
                    <Link size="sm" onPress={() => setSelected("login")}>
                      Login
                    </Link>
                  </p> */}
      <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
        Sign up
      </Button>
    </form>
  );
};

export default RegisterForm;
