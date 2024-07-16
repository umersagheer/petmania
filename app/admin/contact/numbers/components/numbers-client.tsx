"use client";

import { Button } from "@nextui-org/react";
import { Number } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import axios from "axios";
import { toast } from "sonner";

import { Heading } from "@/components/admin/ui/heading";
import DataTable from "@/components/admin/ui/table";
import PlusIcon from "@/components/icons/plus";
import { adminPaths, brand } from "@/config/constants";
import AlertModal from "@/components/admin/ui/alert-modal";
import ViewModal from "@/components/admin/ui/view-modal";
import ModalContent from "./modal-content";
import { columns, RenderCell } from "./columns";

type NumbersClientProps = {
  numbers: Number[] | null;
};

const NumbersClient = ({ numbers }: NumbersClientProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [data, setData] = useState<Number | null>(null);

  const [loading, setLoading] = useState(false);

  const handleOpenModal = (number: Number) => {
    setIsModalOpen(true);
    setData(number);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleOpenDeleteModal = (number: Number) => {
    setIsDeleteModalOpen(true);
    setData(number);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setData(null);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/numbers/${id}`);
      router.refresh();
      toast.success("Number deleted successfully");
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
        <Heading title="Numbers" description={`Manage ${brand.name} Numbers`} />
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon width={16} height={16} />}
          onClick={() => {
            router.push(`${adminPaths.numbers}/add`);
          }}
        >
          Add
        </Button>
      </div>

      <div className="my-2 md:mx-5">
        {numbers && (
          <DataTable<Number>
            searchKey="number"
            data={numbers}
            columns={columns}
            renderCell={(item, columnKey) =>
              RenderCell({
                number: item,
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
          title={"Delete Number"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={loading}
          id={data?.id}
        />
      )}

      {isModalOpen && (
        <ViewModal title={"Number"} onClose={handleCloseModal}>
          <ModalContent data={data} />
        </ViewModal>
      )}
    </div>
  );
};

export default NumbersClient;
