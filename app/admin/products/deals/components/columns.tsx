import {
  Button,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { Deal } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Deal, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  deal: Deal;
  columnKey: keyof Deal | "actions";
  onOpenModal: (deal: Deal) => void;
  onOpenDeleteModal: (deal: Deal) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "name",
    label: "Deal Name",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  deal,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    deal[columnKey as keyof Omit<Deal, "createdAt" | "updatedAt">];
  switch (columnKey) {
    case "name":
      return <div>{cellValue}</div>;

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
                <DropdownItem onClick={() => onOpenModal(deal)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => router.push(`${adminPaths.deals}/${deal.id}`)}
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(deal);
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
