"use client";

import { Button } from "@nextui-org/react";
import { Deal, Product } from "@prisma/client";
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

type DealsClientProps = {
  deals:
    | {
        id: string;
        name: string;
        createdAt: Date;
        updatedAt: Date;
        Product: {
          id: string;
          title: string;
        }[];
      }[]
    | null;
};

const DealsClient = ({ deals }: DealsClientProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [data, setData] = useState<Deal | null>(null);

  const [loading, setLoading] = useState(false);

  const handleOpenModal = (deal: any) => {
    setIsModalOpen(true);
    setData(deal);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleOpenDeleteModal = (deal: any) => {
    setIsDeleteModalOpen(true);
    setData(deal);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setData(null);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/deals/${id}`);
      router.refresh();
      toast.success("Deal deleted successfully");
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
      <div className="flex items-center justify-between">
        <Heading title="Deals" description={`Manage ${brand.name} Deals`} />
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon width={16} height={16} />}
          onClick={() => {
            router.push(`${adminPaths.deals}/add`);
          }}
        >
          Add
        </Button>
      </div>

      <div className="my-2 md:mx-5">
        {deals && (
          <DataTable<
            Deal & {
              Product:
                | {
                    id: string;
                    title: string;
                  }[]
                | null;
            }
          >
            searchKey="name"
            data={deals}
            columns={columns}
            renderCell={(item, columnKey) =>
              RenderCell({
                deal: item,
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
          title={"Delete Deal"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={loading}
          id={data?.id}
        />
      )}

      {isModalOpen && (
        <ViewModal title={"Deal"} onClose={handleCloseModal}>
          <ModalContent data={data} />
        </ViewModal>
      )}
    </div>
  );
};

export default DealsClient;
