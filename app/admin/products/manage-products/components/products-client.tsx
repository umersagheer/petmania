"use client";

import { Button } from "@nextui-org/react";
import { Deal, Image, Product, Tag, Weight } from "@prisma/client";
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

type ProductsClientProps = {
  products: (Product & {
    images: Image[];
    tags: Tag[];
    deals: Deal[];
    weights: Weight[];
  })[];
};

const ProductsClient = ({ products }: ProductsClientProps) => {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const [data, setData] = useState<
    | (Product & {
        images: Image[];
        tags: Tag[];
        deals: Deal[];
        weights: Weight[];
      })
    | null
  >(null);

  const [loading, setLoading] = useState(false);

  const handleOpenModal = (product: any) => {
    setIsModalOpen(true);
    setData(product);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setData(null);
  };

  const handleOpenDeleteModal = (product: any) => {
    setIsDeleteModalOpen(true);
    setData(product);
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setData(null);
  };

  const onDelete = async (id: string) => {
    try {
      setLoading(true);
      await axios.delete(`/api/manage-products/${id}`);
      router.refresh();
      toast.success("Product deleted successfully");
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
          title="Products"
          description={`Manage ${brand.name} Products`}
        />
        <Button
          color="primary"
          variant="flat"
          startContent={<PlusIcon width={16} height={16} />}
          onClick={() => {
            router.push(`${adminPaths.manageProducts}/add`);
          }}
        >
          Add
        </Button>
      </div>

      <div className="my-2 md:mx-5">
        {products && (
          <DataTable<
            Product & {
              images: Image[];
              tags: Tag[];
              deals: Deal[];
              weights: Weight[];
            }
          >
            searchKey="title"
            data={products}
            columns={columns}
            renderCell={(item, columnKey) =>
              RenderCell({
                product: item,
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
          title={"Delete Product"}
          onClose={handleCloseDeleteModal}
          onDelete={onDelete}
          loading={loading}
          id={data?.id}
        />
      )}

      {isModalOpen && (
        <ViewModal title={"Product"} onClose={handleCloseModal} isProduct>
          <ModalContent data={data} />
        </ViewModal>
      )}
    </div>
  );
};

export default ProductsClient;
