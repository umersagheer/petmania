import cloudinary from "@/config/cloudinary";

export const deleteImage = async (publicId: string): Promise<void> => {
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: "image",
      invalidate: true,
    });
    console.log("Image_deletion_result", result);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Image deletion failed");
  }
};

export const deleteImages = async (publicIds: string[]): Promise<void> => {
  try {
    const result = await cloudinary.api.delete_resources(
      publicIds as unknown as string[],
      {
        resource_type: "image",
        invalidate: true,
      }
    );
    console.log("Image_deletion_result", result);
  } catch (error) {
    console.error("Error deleting image:", error);
    throw new Error("Image deletion failed");
  }
};
