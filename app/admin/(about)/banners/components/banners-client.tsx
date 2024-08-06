"use client";

import { Heading } from "@/components/admin/ui/heading";
import DataTable from "@/components/admin/ui/table";
import PlusIcon from "@/components/icons/plus";
import { adminPaths, brand } from "@/config/constants";
import { Button } from "@nextui-org/react";
import { Banner } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { columns, RenderCell } from "./columns";
import AlertModal from "@/components/admin/ui/alert-modal";
import ViewModal from "@/components/admin/ui/view-modal";
import axios from "axios";
import { toast } from "sonner";
import ModalContent from "./modal-content";

type BannersClientProps = {
  banners:
    | (Banner & {
        product: {
          id: string;
          title: string;
        } | null;
      })[]
    | null;
};

const BannersClient = ({ banners }: BannersClientProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [data, setData] = useState<Banner | null>(null);

  const [loading, setLoading] = useState(false);

  const handleOpenModal = (banner: any) => {
    setIsModalOpen(true);
    setData(banner);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleOpenDeleteModal = (banner: any) => {
    setIsDeleteModalOpen(true);
    setData(banner);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setData(null);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/banners/${id}`);
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
        <Heading title="Banners" description={`Manage ${brand.name} Banners`} />
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon width={16} height={16} />}
          onClick={() => {
            router.push(`${adminPaths.banners}/add`);
          }}
        >
          Add
        </Button>
      </div>

      <div className="my-2 md:mx-5">
        {banners && (
          <DataTable<
            Banner & {
              product: {
                id: string;
                title: string;
              } | null;
            }
          >
            data={banners}
            columns={columns}
            renderCell={(item, columnKey) =>
              RenderCell({
                banner: item,
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
        <ViewModal title={"Banner"} onClose={handleCloseModal}>
          <ModalContent data={data} />
        </ViewModal>
      )}
    </div>
  );
};

export default BannersClient;
