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
