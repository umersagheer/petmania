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
