import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import { signIn, useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { EyeSlashFilledIcon } from "@/components/icons/eye-slash";
import { EyeFilledIcon } from "@/components/icons/eye";

const formSchema = z.object({
  email: z.string().email().min(1, { message: "Email must be filled" }),
  password: z.string().min(3, { message: "Password must be filled" }),
});

const LoginForm = () => {
  const session = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isVisible, setIsVisible] = React.useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  useEffect(() => {
    if (session?.status === "authenticated") {
      router.push("/admin/dashboard");
    }
  }, [session?.status, router]);

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSignin = async (data: z.infer<typeof formSchema>) => {
    setIsLoading(true);

    signIn("credentials", {
      ...data,
      redirect: false,
    })
      .then((callback) => {
        if (callback?.error) {
          toast.error("Invalid Credentials");
        }
        if (callback?.ok && !callback?.error) {
          toast.info("Logged in");
          router.push("/admin/dashboard");
          reset();
        }
      })
      .finally(() => setIsLoading(false));
  };

  return (
    <form
      onSubmit={handleSubmit(onSignin)}
      className="flex flex-col gap-4 h-[300px]"
    >
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
            isRequired
            label="Password"
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
            type={isVisible ? "text" : "password"}
            size="sm"
            {...field}
            isInvalid={Boolean(errors.password)}
            errorMessage={errors.password?.message}
          />
        )}
      />
      <Button fullWidth color="primary" type="submit" isLoading={isLoading}>
        Log in
      </Button>
    </form>
  );
};

export default LoginForm;
