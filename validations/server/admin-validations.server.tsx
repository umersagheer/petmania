import * as yup from "yup";

export const aboutSchema = yup.object().shape({
  aboutDescription: yup.string().required("About must be filled"),
  visionDescription: yup.string().required("Vision must be filled"),
  goal: yup.string().required("Goal must be filled"),
  aboutImg: yup.string().required("Image must be provided"),
  descriptionImg: yup.string().required("Image must be provided"),
  aboutHeroImg: yup.string().required("Image must be provided"),
  contactImg: yup.string().required("Image must be provided"),
  contactDescription: yup.string().required("Contact must be filled"),
});

export const testimonialSchema = yup.object().shape({
  name: yup.string().required("Name must be filled"),
  description: yup.string().required("Description must be filled"),
  rating: yup
    .number()
    .positive()
    .max(5, "Rating should be less than 6")
    .required(),
  image: yup.string().required("Image must be provided"),
});

export const numberSchema = yup.object().shape({
  number: yup.string().required("Number must be filled"),
  isWhatsapp: yup.boolean(),
});

export const emailSchema = yup.object().shape({
  email: yup.string().required("Email must be filled"),
});

export const addressSchema = yup.object().shape({
  address: yup.string().required("Address must be filled"),
  addressLink: yup.string().required("Adress Link must be filled"),
});

export const dealSchema = yup.object().shape({
  name: yup.string().required("Name must be filled"),
});

export const tagSchema = yup.object().shape({
  name: yup.string().required("Tag must be filled"),
});

export const weightSchema = yup.object().shape({
  value: yup.string().required("Weight must be filled"),
  unit: yup.string().required("Unit must be filled"),
  price: yup.string().required("Price must be filled"),
});

export const productSchema = yup.object().shape({
  title: yup.string().required("Title must be filled"),
  description: yup.string().required("Description must be filled"),
  type: yup
    .number()
    .integer()
    .min(1, "Type is required")
    .max(3, "Type is required")
    .required(),
  ingredients: yup.string().required("Ingredients must be filled"),
  calorieContent: yup.string().required("Calories must be filled"),
  guaranteedAnalysis: yup.string().required("Analysis must be filled"),
  benefits: yup.string().required("Benefits must be filled"),
  images: yup
    .array()
    .of(yup.object({ url: yup.string().required("Please enter image") }))
    .required("Please enter image"),
  weightIds: yup.array().of(yup.string().required("Please enter weights")),
  tagIds: yup.array().of(yup.string().required("Please enter tags")),
  dealIds: yup.array().of(yup.string().required("Please enter deals")),
});

export const bannerSchema = yup.object().shape({
  title: yup.string().required("Name must be filled"),
  image: yup.string().required("Image must be provided"),
  productId: yup.string().optional(),
});
