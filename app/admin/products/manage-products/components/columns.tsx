import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { Deal, Image, Product, Tag, Weight } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";
import { BriefcaseMedicalIcon, CatIcon, DogIcon, TagIcon } from "lucide-react";
import { foodTypes } from "@/config/food-types";

export type ColumnsType = {
  key: keyof Omit<Product, "id"> | "actions";
  label: string;
};
type RenderCellProps = {
  product: Product & {
    images: Image[];
    tags: Tag[];
    deals: Deal[];
    weights: Weight[];
  };
  columnKey: string;
  onOpenModal: (product: Product) => void;
  onOpenDeleteModal: (product: Product) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "title",
    label: "Product Title",
  },

  {
    key: "type",
    label: "Type",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  product,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    product[columnKey as keyof Omit<Product, "createdAt" | "updatedAt">];

  switch (columnKey) {
    case "url":
      const url = product.images?.[0]?.url || "N/A";
      return <Avatar src={url as string} radius="md" isBordered />;
    case "title":
      return <div className="max-w-32 line-clamp-2">{cellValue}</div>;

    case "type":
      if (cellValue === parseInt(foodTypes.dog)) {
        return (
          <Chip
            color="warning"
            variant="flat"
            startContent={<DogIcon size={16} />}
          >
            Dog
          </Chip>
        );
      } else if (cellValue === parseInt(foodTypes.cat)) {
        return (
          <Chip
            color="secondary"
            variant="flat"
            startContent={<CatIcon size={16} />}
          >
            Cat
          </Chip>
        );
      } else if (cellValue === parseInt(foodTypes.medicated))
        return (
          <Chip
            color="success"
            variant="flat"
            startContent={<BriefcaseMedicalIcon size={16} />}
          >
            Medicated
          </Chip>
        );

    case "actions":
      return (
        <div>
          <div className="relative flex items-center">
            <Dropdown>
              <DropdownTrigger>
                <Button isIconOnly size="sm" variant="light">
                  <VerticalDotsIcon />
                </Button>
              </DropdownTrigger>
              <DropdownMenu variant="flat">
                <DropdownItem onClick={() => onOpenModal(product)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    router.push(`${adminPaths.manageProducts}/${product.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(product);
                  }}
                >
                  <span>Delete</span>
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        </div>
      );
  }
};
