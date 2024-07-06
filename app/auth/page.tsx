"use client";

import { Card, CardBody, CardHeader, Tabs, Tab } from "@nextui-org/react";
import { useState } from "react";
import RegisterForm from "@/components/auth/register-form";
import LoginForm from "@/components/auth/login-form";
import Image from "next/image";
import { brand } from "@/config/constants";

const AuthPage = () => {
  const [selected, setSelected] = useState<React.Key>("login");

  return (
    <div className="flex h-screen">
      <div className="flex-grow flex justify-center items-center">
        <Card className="max-w-full w-[340px] h-fit">
          <CardHeader className="font-bold text-primary gap-1 justify-center">
            <Image
              src={brand.logo}
              width={32}
              height={32}
              alt={brand.alt}
              className="size-8 object-cover"
            />
            {brand.name}
          </CardHeader>
          <CardBody className="overflow-hidden">
            <Tabs
              // disabledKeys={["login"]}
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected as string}
              onSelectionChange={(key: React.Key) => setSelected(key)}
            >
              <Tab key="login" title="Login">
                <LoginForm />
              </Tab>
              <Tab key="sign-up" title="Sign up">
                <RegisterForm />
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#7828c8_100%)]"></div>
    </div>
  );
};

export default AuthPage;
