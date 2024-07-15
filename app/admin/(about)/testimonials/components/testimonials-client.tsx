"use client";

import { Heading } from "@/components/admin/ui/heading";
import DataTable from "@/components/admin/ui/table";
import PlusIcon from "@/components/icons/plus";
import { adminPaths, brand } from "@/config/constants";
import { Button, Image } from "@nextui-org/react";
import { Testimonial } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { columns, RenderCell } from "./columns";
import AlertModal from "@/components/admin/ui/alert-modal";
import ViewModal from "@/components/admin/ui/view-modal";
import ModalContent from "./modal-content";
import axios from "axios";
import { toast } from "sonner";

type TestimonialsClientProps = {
  testimonials: Testimonial[] | null;
};

const TestimonialsClient = ({ testimonials }: TestimonialsClientProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [data, setData] = useState<Testimonial | null>(null);

  const [loading, setLoading] = useState(false);

  const handleOpenModal = (billboard: Testimonial) => {
    setIsModalOpen(true);
    setData(billboard);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleOpenDeleteModal = (billboard: Testimonial) => {
    setIsDeleteModalOpen(true);
    setData(billboard);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setData(null);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/testimonials/${id}`);
      router.refresh();
      toast.success("Billboard deleted successfully");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        toast.warning(error.response.data);
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="flex justify-between items-center">
        <Heading
          title="Testimonials"
          description={`Manage ${brand.name} Testimonials`}
        />
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon width={16} height={16} />}
          onClick={() => {
            router.push(`${adminPaths.testimonials}/add`);
          }}
        >
          Add
        </Button>
      </div>

      <div className="my-2 md:mx-5">
        {testimonials && (
          <DataTable<Testimonial>
            searchKey="name"
            data={testimonials}
            columns={columns}
            renderCell={(item, columnKey) =>
              RenderCell({
                testimonial: item,
                columnKey,
                onOpenModal: handleOpenModal,
                onOpenDeleteModal: handleOpenDeleteModal,
                router: router,
              })
            }
          />
        )}
      </div>

      {isDeleteModalOpen && (
        <AlertModal
          title={"Delete Billboard"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={loading}
          id={data?.id}
        />
      )}

      {isModalOpen && (
        <ViewModal title={"Testimonial"} onClose={handleCloseModal}>
          <ModalContent data={data} />
        </ViewModal>
      )}
    </div>
  );
};

export default TestimonialsClient;
