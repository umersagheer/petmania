import {
  Avatar,
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Skeleton,
} from "@nextui-org/react";

import { Number } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Number, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  number: Number;
  columnKey: keyof Number | "actions";
  onOpenModal: (number: Number) => void;
  onOpenDeleteModal: (number: Number) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "number",
    label: "Number",
  },
  {
    key: "isWhatsapp",
    label: "Has whatsapp",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  number,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    number[columnKey as keyof Omit<Number, "createdAt" | "updatedAt">];
  switch (columnKey) {
    case "number":
      return <div>{cellValue}</div>;
    case "isWhatsapp":
      return (
        <Chip
          color={number && cellValue === true ? "success" : "default"}
          variant="flat"
        >
          {cellValue === true ? "Yes" : "No"}
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
                <DropdownItem onClick={() => onOpenModal(number)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() =>
                    router.push(`${adminPaths.numbers}/${number.id}`)
                  }
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(number);
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
