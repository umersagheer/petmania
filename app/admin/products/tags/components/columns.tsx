import {
  Button,
  Chip,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";

import { Tag } from "@prisma/client";
import { VerticalDotsIcon } from "@/components/icons/verticle-dots";
import { adminPaths } from "@/config/constants";

export type ColumnsType = {
  key: keyof Omit<Tag, "id"> | "actions";
  label: string;
};

type RenderCellProps = {
  tag: Tag;
  columnKey: keyof Tag | "actions";
  onOpenModal: (tag: Tag) => void;
  onOpenDeleteModal: (tag: Tag) => void;
  router: any;
};

export const columns: ColumnsType[] = [
  {
    key: "name",
    label: "Tag Name",
  },
  {
    key: "actions",
    label: "Actions",
  },
];

export const RenderCell = ({
  tag,
  columnKey,
  onOpenModal,
  onOpenDeleteModal,
  router,
}: RenderCellProps) => {
  const cellValue =
    tag[columnKey as keyof Omit<Tag, "createdAt" | "updatedAt">];
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
                <DropdownItem onClick={() => onOpenModal(tag)}>
                  <span>View</span>
                </DropdownItem>
                <DropdownItem
                  onClick={() => router.push(`${adminPaths.tags}/${tag.id}`)}
                >
                  <span>Edit</span>
                </DropdownItem>
                <DropdownItem
                  color="danger"
                  onClick={() => {
                    onOpenDeleteModal(tag);
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
