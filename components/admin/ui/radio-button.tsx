import { Radio, cn } from "@nextui-org/react";
import { ReactNode } from "react";

type CustomRadioProps = {
  children: ReactNode;
} & Omit<React.ComponentPropsWithoutRef<typeof Radio>, "className">;

export const CustomRadio = ({ children, ...otherProps }: CustomRadioProps) => {
  return (
    <Radio
      {...otherProps}
      className={cn(
        "min-w-full m-0 bg-content1 hover:bg-content3",
        "cursor-pointer rounded-lg gap-4 p-3 border-2 border-transparent",
        "data-[selected=true]:border-primary data-[selected=true]:bg-content2 data-[selected=true]:text-primary"
      )}
    >
      {children}
    </Radio>
  );
};
