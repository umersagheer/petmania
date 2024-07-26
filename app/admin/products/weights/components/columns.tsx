import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { Weight } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Weight, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  weight: Weight;
  columnKey: keyof Weight | "actions";
  onOpenModal: (weight: Weight) => void;
  onOpenDeleteModal: (weight: Weight) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "value",
    label: "Weight Value",
  },
  {
    key: "unit",
    label: "Unit",
  },
  {
    key: "price",
    label: "Price in PKR",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  weight,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    weight[columnKey as keyof Omit<Weight, "createdAt" | "updatedAt">];
  switch (columnKey) {
    case "value":
      return <div>{cellValue}</div>;

    case "unit":
      return <div>{cellValue}</div>;

    case "price":
      return <div className="font-semibold">{cellValue} PKR</div>;

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
                <DropdownItem onClick={() => onOpenModal(weight)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    router.push(`${adminPaths.weights}/${weight.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(weight);
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
