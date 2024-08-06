import React from "react";
import TestimonialForm from "./components/testimonial-form";
import { prisma } from "@/libs/prisma";

type Props = {
  params: {
    testimonialId: string;
  };
};

const TestimonialPage = async ({ params }: Props) => {
  const testimonials = await prisma.testimonial.findUnique({
    where: {
      id: params.testimonialId,
    },
  });
  return <TestimonialForm initialData={testimonials} />;
};

export default TestimonialPage;
