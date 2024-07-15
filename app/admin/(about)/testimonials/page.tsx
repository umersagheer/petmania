import React, { Suspense } from "react";
import TestimonialsClient from "./components/testimonials-client";
import { prisma } from "@/libs/prisma";
import Await from "@/components/admin/ui/await";
import Loading from "../../loading";

const TestimonialsPage = async () => {
  const testimonials = prisma.testimonial.findMany({});

  return (
    <div className="">
      <Suspense fallback={<Loading />}>
        <Await promise={testimonials}>
          {(testimonials) => (
            <>
              {testimonials && (
                <TestimonialsClient testimonials={testimonials} />
              )}
            </>
          )}
        </Await>
      </Suspense>
    </div>
  );
};

export default TestimonialsPage;
