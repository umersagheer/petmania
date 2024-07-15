"use client";

import { useEffect, useState } from "react";
import { ImagePlusIcon, Trash } from "lucide-react";
import { CldUploadWidget } from "next-cloudinary";
import { toast } from "sonner";
import axios from "axios";
import { extractPublicId } from "@/libs/utils";
import { Button, Image } from "@nextui-org/react";
interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
  alt: string;
}
const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  onChange,
  onRemove,
  value,
  alt,
}) => {
  const [isMounted, setIsMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onUpload = (result: any) => {
    onChange(result.info.secure_url);
  };

  if (!isMounted) return null;

  return (
    <div className="my-1">
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {value.map((url) => {
          return (
            <div
              key={url}
              className="relative h-[200px] w-[200px] overflow-hidden rounded-md"
            >
              <div className="absolute right-2 top-2 z-20">
                <Button
                  isLoading={isLoading}
                  color="danger"
                  isIconOnly
                  type="button"
                  onClick={async () => {
                    try {
                      setIsLoading(true);
                      const publicId = extractPublicId(url);
                      if (!publicId) {
                        toast.error("Public ID not found");
                        return;
                      }
                      const data = {
                        public_id: publicId,
                      };
                      const { data: res } = await axios.post(
                        `/api/image`,
                        data
                      );
                      onRemove(url);

                      setIsLoading(false);
                      toast.success("Image deleted");
                    } catch (error) {
                      console.log(error);
                      setIsLoading(false);
                      toast.error("Failed to delete image");
                    }
                  }}
                >
                  <Trash className="size-4" />
                </Button>
              </div>
              <Image
                src={url}
                alt={alt}
                className="object-cover"
                sizes="(max-width: 768px) 100vw,(max-width: 1200px) 50vw,33vw"
              />
            </div>
          );
        })}
      </div>

      <CldUploadWidget
        onSuccess={onUpload}
        uploadPreset="petMania-uploads"
        options={{
          sources: ["local", "url", "unsplash"],
        }}
      >
        {({ open }: any) => {
          const onClick = () => {
            open();
          };
          return (
            <>
              {value.length < 1 && (
                <>
                  <Button type="button" disabled={disabled} onClick={onClick}>
                    <ImagePlusIcon className="mr-2 size-4" />
                    Upload an image
                  </Button>
                  <p className="text-xs prose max-w-[300px] my-1 font-semibold">
                    Size less then 1mb
                  </p>
                </>
              )}
            </>
          );
        }}
      </CldUploadWidget>
    </div>
  );
};

export default ImageUpload;
