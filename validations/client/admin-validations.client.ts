import { Tags } from "lucide-react";
import { z } from "zod";

export const aboutSchema = z.object({
  aboutDescription: z.string().min(1, { message: "About must be filled" }),
  visionDescription: z.string().min(1, { message: "Vision must be filled" }),
  goal: z.string().min(1, { message: "Goal must be filled" }),
  aboutImg: z.string().min(1, { message: "Image must be provided" }),
  descriptionImg: z.string().min(1, { message: "Image must be provided" }),
  aboutHeroImg: z.string().min(1, { message: "Image must be provided" }),
  contactImg: z.string().min(1, { message: "Image must be provided" }),
  contactDescription: z.string().min(1, { message: "Contact must be filled" }),
});

export const testimonialSchema = z.object({
  name: z.string().min(1, { message: "Name must be filled" }),
  description: z.string().min(1, { message: "Description must be filled" }),
  rating: z.coerce
    .number()
    .positive()
    .max(5, { message: "Rating should be less then 6" }),
  image: z.string().min(1, { message: "Image must be provided" }),
});

export const numberSchema = z.object({
  number: z.string().min(1, { message: "Number must be filled" }),
  isWhatsapp: z.boolean(),
});

export const emailSchema = z.object({
  email: z.string().email().min(1, { message: "Email must be filled" }),
});

export const addressSchema = z.object({
  address: z.string().min(1, { message: "Address must be filled" }),
  addressLink: z.string().min(1, { message: "Adress Link must be filled" }),
});

export const dealSchema = z.object({
  name: z.string().min(1, { message: "Name must be filled" }),
});

export const tagSchema = z.object({
  name: z.string().min(1, { message: "Tag must be filled" }),
});

export const weightSchema = z.object({
  value: z.string().min(1, { message: "Weight must be filled" }),
  unit: z.string().min(1, { message: "Unit must be filled" }),
  price: z.string().min(1, { message: "Price must be filled" }),
});

export const productSchema = z.object({
  title: z.string().min(1, { message: "Title must be filled" }),
  description: z.string().min(1, { message: "Description must be filled" }),
  type: z.coerce
    .number()
    .int()
    .min(1, { message: "Type must be Selected" })
    .max(3, { message: "Type must be Selected" }),
  ingredients: z.string().min(1, { message: "Ingredients must be filled" }),
  calorieContent: z.string().min(1, { message: "Calories must be filled" }),
  guaranteedAnalysis: z.string().min(1, { message: "Analysis must be filled" }),
  benefits: z.string().min(1, { message: "Benefits must be filled" }),
  images: z
    .array(
      z.object({ url: z.string().min(1, { message: "Please enter image" }) })
    )
    .min(1, { message: "At least one image is required" }),

  weightIds: z.string().array().min(1, { message: "Please enter weights" }),
  tagIds: z.string().array().min(1, { message: "Please enter tags" }),
  dealIds: z.string().array().min(1, { message: "Please enter deals" }),
});

export const bannerSchema = z.object({
  title: z.string().min(1, { message: "Name must be filled" }),
  image: z.string().min(1, { message: "Image must be provided" }),
  productId: z.string().optional(),
});
